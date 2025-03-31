# Rahisi Loan Management System

A loan management system built with React, Vite, TypeScript, Python (Django), and Tailwind CSS. This system supports different loan categories and allows users (borrowers and investors) to interact, apply for loans, and manage profiles.

## Features

- **User Authentication**
  - User login and signup functionality.
  - Profile management (name, email, password).
  - Loan application status updates (approved or denied).
  
- **Loan Categories**
  - **Business Loans**:
    - Startups (pitch to investors, not borrowing money).
    - Business Growth.
  - **Personal Loans**:
    - Education.
    - Emergency.
  - **Asset Financing**:
    - Car logbook loans.
    - Nunua/Jenga (buy and build).
    - Land financing.

- **Investor Section**
  - Investors can view pitches for startups and invest in various sectors like Health, Tech, Agriculture, Education, and Fintech.
  - Minimum investment of Ksh 100,000 required to become an investor.

- **Loan Application Forms**
  - Custom forms for each loan category.
  - Loan calculator for better decision-making.

- **About Us Page**
  - Information about the platform.

## Technologies Used

- **Frontend**: 
  - React.js
  - Vite (for fast development and bundling)
  - TypeScript
  - Tailwind CSS (for styling)

- **Backend**:
  - Python (Django REST Framework)
  - SQLite (for local development)
  
- **Authentication**:
  - JWT (JSON Web Tokens)

## Setup Instructions

### Prerequisites

1. **Node.js** (v16.x or higher)
2. **Python** (v3.8 or higher)
3. **Django** (v3.x or higher)

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd frontend
