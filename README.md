# 📧 Email Writer Application

An AI-powered **Email Writer Application** that helps users generate high-quality emails quickly by providing a topic and selecting a preferred tone.  
The application follows a **full-stack architecture** with a **Vite + React frontend** and a **Spring Boot backend**, communicating through REST APIs.

---

## 🚀 Features

- ✍️ Generate professional emails instantly
- 🎭 Multiple tone selection (Formal, Friendly, Professional, etc.)
- ⚡ Fast frontend using Vite
- 🔄 RESTful API integration
- 🧩 Clean and modular code structure
- 🌐 Cross-platform web application

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Axios
- HTML5, CSS3 (or Tailwind CSS)

### Backend
- Java
- Spring Boot
- Spring Web
- Maven


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Dilipp04/EmailWriter.git
cd EmailWriter


cd frontend
npm install
npm run dev

http://localhost:5173

cd backend
mvn clean install
mvn spring-boot:run

http://localhost:8080


POST /api/email/generate

{
  "emailContent": "Request for sick leave",
  "tone": "Formal"
}

{
  "generatedEmail": "Dear Sir/Madam, I am writing to request sick leave..."
}



