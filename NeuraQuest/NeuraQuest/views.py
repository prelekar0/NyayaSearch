from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json, time
from .SearchByNyaya import api_search


def index(request):
    return render(request, 'home.html')

def chat(request):
    return render(request, 'chat.html')

@csrf_exempt
def demo(request):
    data = json.loads(request.body)
    user_query = data['query']
    response = api_search(user_query)
    retData = json.loads(response)
    time.sleep(5)
    
    cleaned_retData = convert_dict_format(retData)
    print(cleaned_retData)
    mockResponse = {
        "summary": "The My COursy judgment in <citation>K.S. Puttaswamy v. Union of India (2017) 10 SCC 1</citation> has established privacy as a fundamental right under the Indian Constitution. The Court held that privacy is protected as an intrinsic part of <highlight>Article 21</highlight> which guarantees the right to life and personal liberty.",
        "fullText": """
# Right to Privacy as a Fundamental Right

In the landmark case of <citation>K.S. Puttaswamy v. Union of India (2017) 10 SCC 1</citation>, the Supreme Court unanimously affirmed that the right to privacy is a fundamental right under the Indian Constitution.

## Key Points of the Judgment:

1. Privacy is protected as an intrinsic part of <highlight>Article 21</highlight> that guarantees right to life and personal liberty.

2. Privacy includes at its core the preservation of personal intimacies, the sanctity of family life, marriage, procreation, the home and sexual orientation.

3. While the right to privacy is not absolute, any encroachment must satisfy the three-fold requirement of:
   - Legality (existence of a law)
   - Legitimate aim
   - Proportionality

4. The Court overruled previous judgments in <citation>M.P. Sharma v. Satish Chandra, AIR 1954 SC 300</citation> and <citation>Kharak Singh v. State of Uttar Pradesh, AIR 1963 SC 1295</citation> to the extent that they held that there is no fundamental right to privacy under the Indian Constitution.

## Implications:

The judgment has significant implications for data protection laws in India and serves as a constitutional check on various state actions that may infringe on individuals' privacy, including the Aadhaar scheme, surveillance measures, and data collection practices.

As Justice Chandrachud observed, "Privacy is the constitutional core of human dignity."

## Related Statutes:

- <highlight>Information Technology Act, 2000</highlight>
- <highlight>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</highlight>
- Draft Personal Data Protection Bill
        """,
        "citations": [
            {
                "id": 1,
                "citation": "K.S. Puttaswamy v. Union of India (2017) 10 SCC 1",
                "summary": "Nine-judge bench unanimously held that right to privacy is a fundamental right under the Indian Constitution",
                "relevantText": "Privacy is protected as an intrinsic part of the right to life and personal liberty under Article 21 and as a part of the freedoms guaranteed by Part III of the Constitution"
            },
            {
                "id": 2,
                "citation": "M.P. Sharma v. Satish Chandra, AIR 1954 SC 300",
                "summary": "Early decision that held there is no fundamental right to privacy under the Indian Constitution",
                "relevantText": "This judgment was overruled in K.S. Puttaswamy to the extent it held that the right to privacy is not protected by the Constitution"
            },
            {
                "id": 3,
                "citation": "Kharak Singh v. State of Uttar Pradesh, AIR 1963 SC 1295",
                "summary": "Dealt with surveillance measures and partially recognized aspects of privacy",
                "relevantText": "The majority opinion rejected the right to privacy as a fundamental right, but Justice Subba Rao's minority opinion recognized privacy as part of personal liberty"
            }
        ]
    }
    return JsonResponse(cleaned_retData)


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
