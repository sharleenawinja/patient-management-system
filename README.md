# Patient Management System

A simple web application for managing patient data. The system allows users to register patients, add vitals during each patient visit, and display a list of all patients with their respective information.

## Features

- **Patient Registration**: Add new patients to the system with basic information (name, date of birth, gender).
- **Vitals Management**: Record vitals (e.g height(cm), weight(kg), BMI) during each visit.
- **Patient List Display**: View a list of all patients along with their details and latest vitals.

## Technologies

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MySQL
- **API**: RESTful API for handling patient data

## Installation

Follow the instructions below to set up the project locally.

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies
   ```bash
   npm install
   ```
4. Create a .env file in the root of the server directory with the following sample configuration:
   ```bash
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=testpassword
   DB_DATABASE=patient-db
   DB_PORT=3306
    ```
5. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm run dev
   ```

   
