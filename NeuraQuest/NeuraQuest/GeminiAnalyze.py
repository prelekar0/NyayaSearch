import google.generativeai as genai

# Replace with your Gemini API key
GEMINI_API_KEY = "AIzaSyDl8-iMfQHoruX8Ji7EQ7_9hzoml7ETwc8"  

# Initialize Gemini model
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

def summarize_case_with_gemini(case_url, question=None):
    """
    Passes the case URL and prompt directly to Gemini for fetching and summarizing.
    """
    prompt = f"""
    Fetch the case details from the following URL and summarize everything  in the given key points:
    URL: {case_url}
    
    Provide the following details:
    Title (use <b> tag for bold)
    MetaData (Date, Case Number bold the 'MetaData')
    URL (use <a> tag on click redirect in new page in blue text)
    Summary Title (use <b> tag for bold dont say Summary Title bold the title bold)
    Summary in Brife in 7-8 Paragraphs each paragraph should be in 5-6 Lines.
    Compliend Penal Code Section Applied to Selected Case

    NOTE : DO NOT USE ANY FORMATTER LIKE ** OR ANYTHING ELSE. JUST RETURN THE TEXT. USE ANY HTML TAGS IF NEEDED.
    Question: {question if question else 'Summarize the case details.'}
    """

    # Gemini processes the entire task itself
    response = model.generate_content(prompt)

    return response.text



# Test Cases  
# if __name__ == "__main__":
#     case_url = "https://indiankanoon.org/doc/51908652/"
#     summary = summarize_case_with_gemini(case_url)
#     print(summary)


