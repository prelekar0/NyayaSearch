import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

def get_indian_law_news(api_key, query="Indian law", country="in"):
    """
    Fetches Indian law-related news using the GNews API.

    Args:
        api_key (str): Your GNews API key.
        query (str): The search query.
        country (str): The country code (e.g., "in" for India).

    Returns:
        list: A list of news articles (dictionaries), or None if an error occurs.
    """
    url = f"https://gnews.io/api/v4/search?q={query}&country={country}&token={api_key}"

    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise HTTPError for bad responses (4xx or 5xx)
        data = response.json()
        if data.get('articles'):
            return data['articles']
        else:
            return None

    except requests.exceptions.RequestException as e:
        print(f"Error fetching news: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return None

api_key = os.getenv("NEWS_API_KEY")

def get_trending_cases_json():
    articles = get_indian_law_news(api_key, query="Indian Law News Today")

    if articles:
        # Create a list to store simplified article data
        simplified_articles = []
        
        for article in articles:
            # Extract only the fields we want
            simplified_article = {
                "title": article.get('title', ''),
                "url": article.get('url', ''),
                "description": article.get('description', ''),
            }
            simplified_articles.append(simplified_article)
        
        return json.dumps({"articles": simplified_articles}, indent=2)
    else:
        return None

