MyChanjo - Child Vaccination Tracker

MyChanjo is a comprehensive web application designed to help parents and guardians in Kenya track their children's vaccination schedules. It simplifies the complex immunization timeline into an intuitive, user-friendly dashboard, ensuring no vaccine is ever missed.

The application is built with a soft, calming aesthetic using Baby Blue, Lilac, and White, creating a pleasant user experience for parents.

LIVE DEMO

Frontend (Vercel): my-chanjo-app.vercel.app

Backend (Render): https://mychanjo-app-backend.onrender.com

✨ Key Features

🔐 Secure Authentication: Seamless sign-in and sign-up functionality using Clerk.

📅 Interactive Vaccine Calendar: A visual calendar that allows users to view the current vaccination state of their child by clicking on specific dates.

🇰🇪 Kenyan Vaccine Schedule: Pre-loaded with the standard immunization schedule used in Kenya. Each vaccine card includes:

Vaccine Name

Recommended Age

Description/Purpose

✅ Status Tracking: Interactive buttons on vaccine cards to toggle status:

🟡 Pending

🟢 Completed

🔴 Overdue

📚 Resource Hub: A dedicated page containing FAQs and educational information about child health and immunizations.

👶 Baby Profile Management: Easy onboarding to add child details via the Dashboard.

🛠️ Tech Stack

Frontend

React.js: Core framework for building the user interface.

Axios: For handling HTTP requests to the backend API.

Clerk: For secure user authentication and session management.

Tailwind CSS/Styling: Themed with a palette of Baby Blue, Lilac, and White.

Key Components:

LandingPage: Introduction to the website and icons JISAJILI AND INGIA .

Dashboard: The main hub for the user.

BabyInfo & BabyProfile: Forms and displays for child data.

VaccineCalendar: The interactive date-based view.

VaccineList: The detailed list of scheduled immunizations.

Backend

Node.js & Express.js: Server-side logic and API routing.

MongoDB & Mongoose: NoSQL database for storing with :

Baby Schema: Child details and parent linkage.

Vaccine Schema: Static vaccine data and status updates.

Deployment

Frontend: Vercel

Backend: Render




🚀 Getting Started Locally

Follow these steps to run the project on your local machine.

Prerequisites

Node.js installed

MongoDB Atlas URI (or local MongoDB)

Clerk API Keys

1. Clone the Repository

git clone (https://github.com/WanjiruMaina15/MyChanjo-APP..git)
cd MY CHANJO APP


2. Backend Setup

Navigate to the server directory (assuming you have a server folder):

cd FRONTEND
npm install


Create a .env file in the server directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key


Start the server:

npm start


3. Frontend Setup

Open a new terminal and navigate to the client directory:

cd FRONTEND
npm install


Create a .env file in the client directory:

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:5000


Start the React app:

npm run dev


📡 API Overview

The backend exposes the following key endpoints:

POST /api/babies: Register a new child profile.

GET /api/babies/:id: Fetch child details.

GET /api/vaccines: Get the standard Kenyan vaccine list.

PUT /api/vaccines/:id: Update the status (Pending/Completed/Overdue).

🤝 Contributing

Contributions are welcome! If you have suggestions for new features or improvements (e.g., adding SMS reminders), please fork the repo and submit a pull request.

📄 License

This project is licensed under the MIT License.

Created with love  for healthy futures.
