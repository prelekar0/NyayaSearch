from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .SearchAndAnalyze import *
from .GeminiAnalyze import *
from User.models import SearchHistory, User
import google.generativeai as genai
from .GetNews import get_trending_cases_json
from dotenv import load_dotenv
import os

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

CASUAL_QUERIES = [
    "who are you", "how are you", "what is your name",
    "tell me about yourself", "are you human", "how rare you","hi","hello","hey"
]
KEYWORDS = [
    "keyword","fromdate","todate","court","judge","advocate","petitioner","respondent","status","subject"
]


def query_gemini(prompt):
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(prompt)
    return response.text

@csrf_exempt
def demo(request):
    data = json.loads(request.body)
    user_query = data['query']
    user_query = user_query.strip().lower()

    try:
        user = User.objects.get(username="tusharneje")
        available_data = SearchHistory.objects.filter(user=user).order_by('-id').first()
        is_matching = take_opinion(user_query, available_data.result)
    except:
        is_matching = "False"

    if bool(is_matching) and not user_query.startswith("keyword:") and not any(casual in user_query for casual in CASUAL_QUERIES) :
        data = answer_query(user_query, available_data.result)
        print("data ------------------- ",data)
        demo_dict = {
            "Title": f"{data}"
            }
        return JsonResponse({'data':demo_dict})
    else:
        if any(casual in user_query for casual in CASUAL_QUERIES):
            data = query_gemini(f"You are a legal AI. Respond casually to: {user_query}. NOTE DO NOT USE ANY SPECIAL CHARACTERS AND DO NOT FORMAT ANYTHING GIVE JUST PLAIN TEXT.")
            demo_dict = {
            "Summary": f"{data} How Can I Assist You?"
            }
            return JsonResponse({'data':demo_dict})
    
    # Legal Queries
        elif any(legal in user_query for legal in KEYWORDS):
            user = User.objects.get(username="tusharneje")
            available_data = SearchHistory.objects.filter(user=user, query__iregex=rf'.*{user_query.replace("keyword:","")}.*').first()
            if available_data:
                data = json.loads(available_data.result.replace("'", "\""))
                return JsonResponse({'data':data})
            else:
                data = getKanoonData(user_query)
                data = json.loads(data)
                user = User.objects.get(username="tusharneje")
                SearchHistory.objects.create(user=user, query=f"{user_query.replace('keyword:','')}", result=data)
                return JsonResponse({'data':data})
            
        else:
            demo_dict = {
            "Summary": f"I am a legal AI. I am not allowed to answer non-legal questions. Please ask a legal question."
            }
            return JsonResponse({'data':demo_dict})

    
    
    
    

@csrf_exempt
def case_details(request):
    data = json.loads(request.body)
    demo_dict = {}
    url = data['url']
    title = data['title']
    
    details = summarize_case_with_gemini(url, title)
    
    demo_dict["Title"] = title
    demo_dict["MetaData"] = {
    }
    demo_dict["URL"] = url
    demo_dict["Summary"] = details.replace("\n","<br>")
    print("demo_dict ------------------- ",demo_dict)

    user = User.objects.get(username="tusharneje")
    SearchHistory.objects.create(user=user, query=f"{url.replace('url:','')}", result=demo_dict)
    return JsonResponse({'data':demo_dict})

def get_search_history(request):
    user = User.objects.get(username="tusharneje")
    search_history = SearchHistory.objects.filter(user=user).order_by('-id')[:20]
    search_history = [{"query": history.query} for history in search_history]
    return JsonResponse({'data': search_history})

def get_trending_cases(request):
    data = get_trending_cases_json()
    data = json.loads(data)
    return JsonResponse({'data': data['articles']})

def convert_dict_format(input_dict):
    """
    Converts a dictionary with <citation> and <highlight> tags to a cleaner format.

    Args:
        input_dict: The input dictionary with <citation> and <highlight> tags.

    Returns:
        A new dictionary with the tags removed and formatted.
    """

    def clean_text(text):
        """Removes <citation> and <highlight> tags from text."""
        text = text.replace("<citation>", "").replace("</citation>", "")
        text = text.replace("<highlight>", "").replace("</highlight>", "")
        return text

    def clean_citations(citations):
        """Cleans the citations in the dictionary."""
        cleaned_citations = []
        for citation in citations:
            cleaned_citation = {
                "id": citation["id"],
                "citation": clean_text(citation["citation"]),
                "summary": clean_text(citation["summary"]),
                "relevantText": clean_text(citation["relevantText"]),
            }
            cleaned_citations.append(cleaned_citation)
        return cleaned_citations

    cleaned_dict = {
        "summary": clean_text(input_dict["summary"]),
        "fullText": clean_text(input_dict["fullText"]),
        "citations": clean_citations(input_dict["citations"]),
    }

    return cleaned_dict



