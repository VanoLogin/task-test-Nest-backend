# Test Task Backend

## Project Description

This project is a backend service for handling weather data. It allows users to save and retrieve weather information. The application is built with **NestJS**, **TypeORM** for PostgreSQL integration, and is containerized using **Docker** for ease of deployment.

---

## Technologies Used

- **Node.js**
- **NestJS**
- **TypeORM**
- **PostgreSQL**
- **Docker/Docker Compose**

---

## Features

- **POST /weather** — Save weather data to the database.
- **GET /weather/:lat/:lon/:part** — Retrieve weather data from the database by coordinates and part (e.g., hourly).
- **Interceptor** for formatting successful responses.
- **Guard** for validating incoming parameters (lat, lon, part).

---

## Request Example:

**Build and launch containers:**

docker-compose up --build

## API Endpoints

### **1. POST /weather**

**Description:** Save weather data to the database.

#### Request Example:

```http
POST http://localhost:3000/weather
Content-Type: application/json
Body:
{
    "lat": 40.7128,
    "lon": -74.006,
    "part?": some_data
}
Response Example:

{
    "statusCode": 201,
    "message": "Request was successful",
    "data": {
        "id": "uuid",
        "lat": 40.7128,
        "lon": -74.006,
        "part": {
            "some_weather_data": "..."
        }
    }
}
```

### **2. Get /weather**

**Description:** Save weather data to the database.

#### Request Example:

```http
GET http://localhost:3000/weather?lat=40.7128&lon=-74.006&part=hourly
Content-Type: application/json

Response Example:

{
    "statusCode": 200,
    "message": "Request was successful",
    "data": {
        "sunrise": 1684926645,
        "sunset": 1684977332,
        "temp": 292.55,
        "feels_like": 292.87,
        "pressure": 1014,
        "humidity": 89,
        "uvi": 0.16,
        "wind_speed": 3.13
    }
}

```
