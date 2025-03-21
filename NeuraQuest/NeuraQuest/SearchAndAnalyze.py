import requests
import json
from datetime import datetime
from bs4 import BeautifulSoup
import re
BASE_URL = "https://api.indiankanoon.org/search/"
API_TOKEN = "a230df1e8fd77e68b716d3b62bf4baa5e10404b1"

def parse_user_input(user_input):
    """Parse chatbot-like user input into parameters."""
    params = {}
    
    # Split input by comma and map keywords to parameters
    parts = user_input.split(",")

    for part in parts:
        key, value = part.split(":", 1)
        key = key.strip().lower()
        value = value.strip()

        if key == "keyword":
            params["formInput"] = value
        elif key == "court":
            params["doctypes"] = value
        elif key == "fromdate":
            params["fromdate"] = value
        elif key == "todate":
            params["todate"] = value
        elif key == "title":
            params["title"] = value
        elif key == "author":
            params["author"] = value
        elif key == "bench":
            params["bench"] = value
        elif key == "cite":
            params["cite"] = value
        elif key == "maxcites":
            params["maxcites"] = value
        elif key == "pagenum":
            params["pagenum"] = value
        elif key == "maxpages":
            params["maxpages"] = value
        else:
            print(f"❌ Unknown parameter: {key}")

    return params

def search_kanoon(params):
    """Make POST request to Indian Kanoon API."""
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
    """Remove HTML tags, normalize text, and handle fragmented legal references."""
    soup = BeautifulSoup(html_text, "html.parser")

    for script_or_style in soup(["script", "style"]):
        script_or_style.extract()

    text = soup.get_text(separator=" ", strip=True)
    cleaned_text = ' '.join(text.split())

    cleaned_text = re.sub(r'([a-zA-Z])(\d+)', r'\1 \2', cleaned_text)

    cleaned_text = re.sub(r'\b\d{1,2}\s*\.\s*', '', cleaned_text)

    return cleaned_text



def display_results(results):
    if not results or "docs" not in results:
        print("⚠ No results found.")
        return
    
    output = []

    for idx, doc in enumerate(results["docs"]):
        title = clean_text(doc.get('title', 'N/A'))
        date = doc.get('date', 'N/A')
        case_number = doc.get('tid', 'N/A')
        url = f"https://indiankanoon.org/doc/{case_number}"
        summary = clean_text(doc.get('headline', 'N/A'))

        # Store the result in the requested format
        case_data = {
            "Title": title,
            "MetaData": {
                "Date": date,
                "Case Number": case_number
            },
            "URL": url,
            "Summary": summary
        }

        output.append(case_data)

    return json.dumps(output, indent=4)

# AT LEVEL 0 CALL THIS FUNCTION
def getKanoonData(query):
    search_params = parse_user_input(query)
    if search_params:        
        results = search_kanoon(search_params)
        print(results)
        if results:
            finalData = display_results(results)
            return finalData
        else:
            print(False)
    else:
        print(False) 

#  Test Use Case 
# if __name__ == "__main__":
#     query = "keyword:Sunil Datta court:bomby"
#     getKanoonData(query)
   
