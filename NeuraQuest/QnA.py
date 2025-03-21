import sqlite3
import google.generativeai as genai


DB_PATH = "db.sqlite3"  

CASUAL_QUERIES = [
    "who are you", "how are you", "what is your name",
    "tell me about yourself", "are you human", "how rare you","hi","hello","hey"
]

LEGAL_KEYWORDS = ["case", "law", "section", "judgement", "legal", "court", "advocate", "petition"]


def search_entire_db(query):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    results = []

    try:
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()

        for table in tables:
            table_name = table[0]

            cursor.execute(f"PRAGMA table_info({table_name});")
            columns = [col[1] for col in cursor.fetchall()]

            for column in columns:
                try:
                    cursor.execute(f"""
                        SELECT * FROM {table_name} 
                        WHERE {column} LIKE ? 
                    """, (f"%{query}%",))

                    rows = cursor.fetchall()

                    if rows:
                        results.append({
                            "table": table_name,
                            "column": column,
                            "data": rows
                        })

                except Exception as e:
                    print(f"⚠ Error searching {table_name}.{column}: {e}")

    except Exception as e:
        print(f"⚠ DB Error: {e}")

    finally:
        conn.close()

    return results
GEMINI_API_KEY = "AIzaSyDl8-iMfQHoruX8Ji7EQ7_9hzoml7ETwc8"  


def query_gemini(prompt):
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(prompt)
    return response.text


def is_legal_query(query):
    query = query.lower()
    return any(keyword in query for keyword in LEGAL_KEYWORDS)


def legal_ai(query):
    query = query.strip().lower()

    if any(casual in query for casual in CASUAL_QUERIES):
        return query_gemini(f"You are a legal AI. Respond casually to: {query}. NOTE DO NOT USE ANY SPECIAL CHARACTERS AND DO NOT FORMAT ANYTHING GIVE JUST PLAIN TEXT.")

    else:
        # Legal Query

    return "🚫 I am a legal AI. This is outside my domain."


if __name__ == "__main__":
        data =legal_ai("How Are You?")
        print(data)
