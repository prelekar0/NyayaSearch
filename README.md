# NyāyaSearch: Discover Indian Law with AI Precision

## 📌 General Information
- **Project Name:** NyāyaSearch: Discover Indian Law with AI Precision
- **Version:** 1.0.0 (Beta)
- **Tech Stack:** Frontend (React, TypeScript), Backend (Python Django), LLMs (Google Gemini)
- **Status:** In Development / Beta Completed
- **Authors:** Tushar Neje, Swaraj Pawar, Prathmesh Relekar, Manasi Mahabdi

## 📌 Features
- ✨ Enhanced search for lawyers and law institutes using keywords, dates, court names, etc.
- 📰 Recent law news feed
- 🎯 Different subscriptions for various usage purposes

## 🖥️ Preview Screenshot
![NyāyaSearch Screenshot](/Screenshots/ss.png)


## 🛠️ Installation

Follow these steps to set up the project on your local machine:

### 🔧 Backend Setup
1. **Clone the backend repository:**
   ```bash
   git clone https://github.com/tusharneje-07/NyayaSearch.git
   ```
2. **Navigate to the backend directory:**
   ```bash
   cd NyayaSearch/NyayaSearch
   ```
3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
4. **Set up environment variables:**
   Create a `.env` file in the root of your backend and add the following:
   ```plaintext
   GEMINI_API_KEY=your_gemini_api_key_here
   NEWS_API_KEY=your_news_api_key_here
   ```
5. **Start the backend server:**
   ```bash
   python manage.py runserver
   ```
6. **`(Optional)` If Any Database Related Issue then Use Database Migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

### 🎨 Frontend Setup
1. **Navigate to the frontend directory:**
   ```bash
   cd NyayaSearch/NyayaSearch/Frontend/
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the frontend server:**
   ```bash
   npm run dev
   ```

## 🚀 Usage
Once both backend and frontend are running:
- Open `http://localhost:5137/` in your browser to access the frontend.
- Ensure you add the frontend URL in `settings.py` of the backend.

**Modify `settings.py` to allow CORS:**
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5137", 
    "http://127.0.0.1:5137",
    "http://localhost:5138",
    "http://127.0.0.1:5138",
    # Add more origins if needed
]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5137",
    "http://127.0.0.1:5137",
    "http://localhost:5138",
    "http://127.0.0.1:5138",
    # Add more origins if needed
]
```

## 💻 Demo Video
```
Demo Video(https://drive.google.com/file/d/140E2-Ymbh_fOQ3v7OhMJKTlYrFudNOkH/view?usp=drivesdk)
```

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📩 Contact
For any questions or feedback, feel free to reach out:
- **Tushar Neje:** [nejetushar07@gmail.com](mailto:nejetushar07@gmail.com)
- **Swaraj Pawar:** [swarajpawar465@gmail.com](mailto:swarajpawar465@gmail.com)
- **Prathamesh Relekar:** [prelekar0@gmail.com](mailto:prelekar0@gmail.com)
- **Manasi Mahabdi:** [mansimahabdi@gmail.com](mailto:mansimahabdi@gmail.com)
- **GitHub Repository:** [NyāyaSearch](https://github.com/tusharneje-07/NyayaSearch)

---

