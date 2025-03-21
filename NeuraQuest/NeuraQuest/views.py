from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json, time
from .SearchByNyaya import api_search
from .SearchAndAnalyze import *
from .GeminiAnalyze import *
def index(request):
    return render(request, 'home.html')

def chat(request):
    return render(request, 'chat.html')

@csrf_exempt
def demo(request):
    data = json.loads(request.body)
    user_query = data['query']
    # Getting Data from Kanoon
    data = getKanoonData(user_query)
    print("---------------------------------------- ",type(data), data)
    data = json.loads(data)

    return JsonResponse({'data':data})

@csrf_exempt
def case_details(request):
    data = json.loads(request.body)
    demo_dict = {}
    url = data['url']
    title = data['title']
    
    details = summarize_case_with_gemini(url)
    
    demo_dict["Title"] = title
    demo_dict["MetaData"] = {
        "Date": "2025-03-21",
        "Case Number": "1234567890"
    }
    demo_dict["URL"] = url
    demo_dict["Summary"] = details.replace("\n","<br>")
    
    dict2 = {
        "data": [json.dumps(demo_dict,indent=4)]
    }

    print(demo_dict)
    return JsonResponse({'data':demo_dict})



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
