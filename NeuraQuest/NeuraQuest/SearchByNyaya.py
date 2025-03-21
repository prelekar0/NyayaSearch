import requests
import json
from datetime import datetime
from bs4 import BeautifulSoup
import re
import google.generativeai as genai

# API Configuration
BASE_URL = "https://api.indiankanoon.org/search/"
API_TOKEN = "a230df1e8fd77e68b716d3b62bf4baa5e10404b1"  # Replace with your valid API token
GEMINI_API_KEY = "AIzaSyDl8-iMfQHoruX8Ji7EQ7_9hzoml7ETwc8" 

def extract_search_params(query):
    params = {}

    # 1. Extract dates and ensure correct format (DD-MM-YYYY)
    dates = re.findall(r"\b(\d{2}/\d{2}/\d{4})\b", query)
    if len(dates) == 1:
        params["fromdate"] = dates[0].replace("/", "-")  # Convert date format to DD-MM-YYYY
    elif len(dates) == 2:
        params["fromdate"] = dates[0].replace("/", "-")
        params["todate"] = dates[1].replace("/", "-")

    # 2. Detect court types (based on keywords)
    court_keywords = ["supreme court", "delhi", "bombay", "kolkata", "chennai", "allahabad",
                      "andhra", "chattisgarh", "gauhati", "jammu", "kerala", "lucknow", 
                      "orissa", "uttaranchal", "gujarat", "himachal pradesh", "jharkhand", 
                      "karnataka", "madhyapradesh", "patna", "punjab", "rajasthan", "sikkim"]
    
    for court in court_keywords:
        if court.lower() in query.lower():
            params["doctypes"] = court.lower().replace(" ", "")  # Remove spaces for API compatibility

    # 3. Check for keywords to identify parameters
    if "case on" in query.lower() or "about" in query.lower():
        params["formInput"] = query

    if "judge" in query.lower() or "authored by" in query.lower():
        author_match = re.search(r"(Judge|Authored by)\s*([\w\s]+)", query, re.IGNORECASE)
        if author_match:
            params["author"] = author_match.group(2).strip()

    if "bench" in query.lower():
        bench_match = re.search(r"Bench\s*([\w\s]+)", query, re.IGNORECASE)
        if bench_match:
            params["bench"] = bench_match.group(1).strip()

    if "citation" in query.lower():
        cite_match = re.search(r"Citation\s*([\w\s]+)", query, re.IGNORECASE)
        if cite_match:
            params["cite"] = cite_match.group(1).strip()

    # 4. Pagination - if explicitly mentioned
    if "page" in query.lower():
        pagenum_match = re.search(r"page\s*(\d+)", query, re.IGNORECASE)
        if pagenum_match:
            params["pagenum"] = pagenum_match.group(1)

    # 5. If no specific parameters were found, use the full query as a general search term
    if not params:
        params["formInput"] = query

    return params

def search_kanoon(params):
    headers = {
        "Authorization": f"Token {API_TOKEN}",
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
    }


    form_data = "&".join([f"{k}={v}" for k, v in params.items()])

    try:
        response = requests.post(BASE_URL, headers=headers, data=form_data)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"❌ Error: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"⚠ Request failed: {e}")
        return None

def clean_text(html_text):
    soup = BeautifulSoup(html_text, "html.parser")
    text = soup.get_text(separator=" ", strip=True)

    cleaned_text = ' '.join(text.split())

    return cleaned_text

def convert_to_text(results):
    if not results or "docs" not in results:
        print("⚠ No results found.")
        return
    textret = ""
    print("\n✅ Search Results:")
    for idx, doc in enumerate(results["docs"]):
        textret += f"\n🔹 Result {idx + 1}:"
        textret += f"Title: {clean_text(doc.get('title', 'N/A'))}"
        textret += f"Date: {doc.get('date', 'N/A')}"
        textret += f"Court: {doc.get('court', 'N/A')}"
        textret += f"Document ID: {doc.get('tid', 'N/A')}"
        textret += f"Headline: {clean_text(doc.get('headline', 'N/A'))}"
        textret += f"Link: https://indiankanoon.org/doc/{doc.get('tid')}"
        textret += "=" * 60
    
    return textret

def process_with_gemini(text, GEMINI_API_KEY):
    """
    Analyzes the given text using the Gemini API and returns a structured JSON response.

    Args:
        text: The input text to be processed.
        api_key: Your Gemini API key.

    Returns:
        A dictionary containing the structured JSON response, or an error dictionary.
    """
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-2.0-flash")

    prompt = f"""
    Analyze the following legal text and provide a structured response in JSON format,
    similar to the example below. The response should include:

    - A "summary" field containing a concise summary of the text.
    - A "fullText" field containing the original text with key points highlighted using <highlight> tags,
      and citations enclosed within <citation> tags USE THESE TAGS IN THE RESPONSE TAGS ARE MOST IMPORTANT LIKE THIS <highlight>...</highlight> and <citation>...</citation>
    - A "citations" field containing a list of dictionaries, where each dictionary represents a citation
      and includes "id", "citation", "summary", and "relevantText" fields.
    - DO NOT FORGET TO USE THE TAGS IN THE RESPONSE LIKE THIS <highlight>...</highlight> and <citation>...</citation>
    - A "case_details" and "fulltext" field containing the details of the case, scan the URL Web Page and provide the proper details of the case in minimum 200 words

    Example JSON structure:
    {{
        "summary": "...",
        "fullText": "...",
        "case_details": "...",
        "citations": [
            {{
                "id": 1,
                "citation": "...",
                "summary": "...",
                "relevantText": "..."
            }},
            // ... more citations
        ]
    }}

    Here is the legal text:
    {text}
    """

    response = model.generate_content(prompt)

    # ✅ Extract and sanitize JSON response
    try:
        json_start = response.text.find("{")  # Find start of JSON
        json_end = response.text.rfind("}") + 1  # Find end of JSON
        json_string = response.text[json_start:json_end]  # Extract JSON part
        structured_data = json.loads(json_string)  # Parse JSON
        return structured_data
    except json.JSONDecodeError:
        return {"error": "Gemini response could not be parsed as JSON. Raw response: " + response.text} # Added raw response to error.
    except ValueError as e: # Catch value errors, for example if no json is found.
        return {"error": f"Error during processing: {e}. Raw response: " + response.text}




def api_search(query):
    data = extract_search_params(query)
    results = search_kanoon(data)
    print(type(results))
    if results:
        data = convert_to_text(results)
        text_content = data
        structured_response = json.dumps(process_with_gemini(text_content,GEMINI_API_KEY))
        return data,structured_response
    else:
        print("❌ No results returned.")












        