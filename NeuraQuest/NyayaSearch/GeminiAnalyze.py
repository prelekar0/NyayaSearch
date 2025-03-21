import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

def summarize_case_with_gemini(case_url, title):
    print("case_url ------------------- ",case_url)
    prompt = f"""
    <b>Case Summary Request</b>

    <u>URL:</u> <a href="{case_url}" target="_blank">{case_url}</a>

    <u>Title:</u> <i>{title}</i>

    <b>Instructions:</b>

    1.  <i>Carefully verify the provided URL and title for accuracy.</i>
    2.  Provide a comprehensive summary of the case details.
    3.  Structure the summary into 7-8 paragraphs, with each paragraph containing 5-6 lines.
    4.  Use HTML tags for formatting:
        * <b>Bold</b> for key terms or headings.
        * <i>Italics</i> for emphasis or legal terms.
        * <u>Underline</u> for important points.
    5.  Focus on the core legal arguments, court decisions, and relevant facts.
    6.  Avoid introductory phrases like "I have accessed the URL...".
    7.  Make sure to mention the complied penal code section if present.
    8.  Do not add anything like ```html or ``` in response.
    """
    response = model.generate_content(prompt)
    print(response.text)
    return response.text



# Test Cases  
# if __name__ == "__main__":
#     case_url = "https://indiankanoon.org/doc/51908652/"
#     summary = summarize_case_with_gemini(case_url)
#     print(summary)


