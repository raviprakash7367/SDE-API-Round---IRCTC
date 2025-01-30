# SDE-API-Round---IRCTC

This is a Railway System project built using Node.js, Express, and MySQL. It provides APIs for user authentication, train management, and booking management.

## Installation
To get started with the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/raviprakash7367/SDE-API-Round---IRCTC.git
    
    ```

2. Navigate to the project directory:
    ```bash
    cd SDE-API-Round---IRCTC
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add your environment variables:
    ```env
    DB_HOST=your_db_host
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    JWT_SECRET=your_jwt_secret
    API-Key=yourapikeyforadminrole
    PORT=provide_port_to_use
    
    ```

4. Run the server:
    ```sh
    npm start
    ```

## Usage

The server will start on the port specified in the `.env` file (default is 3000). You can access the APIs using a tool like Postman.

## API Endpoints

### Authentication

- **Register User**
    - `POST /api/auth/register`
    - Request Body: `{ "username": "string", "password": "string", "role": "string" }`
    - Response: `{ "message": "User registered successfully", "userId": "number" }`

- **Login User**
    - `POST /api/auth/login`
    - Request Body: `{ "username": "string", "password": "string" }`
    - Response: `{ "token": "string" }`

### Train Management

- **Add Train** (Admin only)
    - `POST /api/trains`
    - Request Body: `{ "name": "string", "source": "string", "destination": "string", "total_seats": "number" }`
    - Response: `{ "message": "Train added successfully", "trainId": "number" }`

- **Get Trains**
    - `GET /api/trains`
    - Query Params: `?source=<source>&destination=<destination>`
    - Response: `[{ "id": "number", "name": "string", "source": "string", "destination": "string", "total_seats": "number", "available_seats": "number" }]`

### Booking Management

- **Book Seat**
    - `POST /api/book`
    - Request Body: `{ "trainId": "number", "seats": "number" }`
    - Response: `{ "message": "Seat booked successfully", "bookingId": "number" }`

- **Get Booking Details**
    - `GET /api/bookings`
    - Response: `[{ "id": "number", "user_id": "number", "train_id": "number", "seats_booked": "number", "booking_time": "timestamp" }]`

## Database Schema

The database schema is defined in the `mysql-workbench_schema_design/schema.txt` file. It includes the following tables:

- `users`
- `trains`
- `bookings`

