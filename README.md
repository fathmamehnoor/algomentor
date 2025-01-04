# DSA Socratic Learning Assistant

A web-based platform designed to teach Data Structures and Algorithms (DSA) concepts using the Socratic teaching method. This project uses React for the frontend, Django for the backend, and integrates the Gemini API for AI-driven interaction. Currently, it focuses on teaching sorting algorithms, with potential for expansion.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Setting Up Gemini API Key](#setting-up-gemini-api-key)
- [Running the Project](#running-the-project)

## Features

- AI-powered Socratic teaching assistant for DSA topics
- Personalized guidance and error detection using the Gemini API
- Interactive and dynamic question-answer flow

## Technologies Used

- Django (Backend)
- React (Frontend)
- Gemini API (AI Interaction)
- JavaScript
- Python
- HTML/CSS
- SQLite (Database)
- Axios (HTTP requests)

## Installation


### Backend (Django) Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/fathmamehnoor/algomentor.git
   cd algomentor.git
2. Create and activate a virtual environment:
   ```bash
   python -m venv env
   source env/bin/activate  # For Windows: `env\Scripts\activate`
3.Install the required Python packages:
  ```bash
    pip install -r requirements.txt
```

4. Run the Django server:
    ```bash
    cd backend/algomentor
    python manage.py migrate
    python manage.py runserver
    ```
    
### Frontend (REact) Setup
    ```bash
    cd frontend/algomentorai
    npm install
    npm start
    ```
   http://localhost:3000

### Setting Up Gemini API Key

  Obtain your API key from the Gemini platform.

  In your Django project, create a .env file in the root directory and add your Gemini API key:

```bash
   GEMINI_API_KEY=your-gemini-api-key-here
```
### Running the Project

   Ensure both the Django and React servers are running. Open two terminal windows:

  Terminal 1 (for Django backend):

  ```bash

  python manage.py runserver
 ```
 Terminal 2 (for React frontend):

```bash

  cd frontend
  npm start
```
Open http://localhost:3000 in your browser to use the application.


