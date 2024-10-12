# Cash Clarity App

## Overview
The Cash Clarity App is a web application designed to help users manage their financial entries, track expenses and income, and visualize their financial health. This project consists of a backend API, a frontend user interface, and a database for data storage.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Backend](#backend)
- [Frontend](#frontend)
- [Database](#database)
- [API Documentation](#api-documentation)
- [Setup Instructions](#setup-instructions)
- [Testing](#testing)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)

## Technologies Used
- **Backend**: Flask, Flask-CORS, Flask-JWT-Extended, PyMongo
- **Frontend**: React.js 
- **Database**: MongoDB 
- **Testing**: Pytest for backend testing, Jest for frontend testing
- **Deployment**: Docker for containerization, GitLab CI/CD for continuous integration and deployment

## Backend
The backend of the application is built using Flask. It provides RESTful API endpoints for user authentication and financial entry management.

### API Endpoints
- `POST /register` - Register a new user
- `POST /login` - Log in an existing user
- `GET /entries` - Retrieve all financial entries for the logged-in user
- `POST /entries` - Add a new financial entry
- `PUT /entries/<id>` - Update an existing financial entry
- `DELETE /entries/<id>` - Delete a financial entry
- `GET /dashboard` - Retrieve total income and expenses for the user

### Requirements
- Python 3.x
- Flask
- PyMongo

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/Anshuman1Krishna1Mohit1shivam/personal_finance
   cd backend
