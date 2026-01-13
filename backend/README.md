# ATM Interface Backend - Setup Guide

## Prerequisites

- Java 17 or higher (recommended)
- Maven 3.6+ or Gradle 7+
- (Optional) PostgreSQL/MySQL if using persistent DB

## Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone <repo-url>
   cd oibsip_taskno3/backend
   ```

2. **Configure environment variables:**

   - Copy `.env.example` to `.env` if present, or edit `src/main/resources/application.properties` as needed.

3. **Install dependencies & build:**
   - For Maven:
     ```bash
     mvn clean install
     ```
   - For Gradle:
     ```bash
     gradle build
     ```

## Running the Application

- **With Maven:**
  ```bash
  mvn spring-boot:run
  ```
- **With Gradle:**
  ```bash
  gradle bootRun
  ```
- **Or run the generated JAR:**
  ```bash
  java -jar target/*.jar
  ```

The backend will start on `http://localhost:8080` by default.

## Features

- JWT-based authentication
- User registration & login
- Account management (balance, deposit, withdraw, transfer)
- Transaction history
- Global exception handling
- Secure password hashing (BCrypt)
- CORS enabled for frontend integration

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/oasisinfobyte/atm/
│   │   │   ├── controller/
│   │   │   ├── exception/
│   │   │   ├── model/
│   │   │   ├── repository/
│   │   │   ├── security/
│   │   │   └── service/
│   │   └── resources/
│   │       └── application.properties
├── .env.example (if present)
├── pom.xml / build.gradle
└── README.md
```

## API Endpoints (Sample)

- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login and get JWT
- `GET /api/account/balance` — Get account balance
- `POST /api/account/deposit` — Deposit funds
- `POST /api/account/withdraw` — Withdraw funds
- `POST /api/account/transfer` — Transfer funds
- `GET /api/account/transactions` — Transaction history

## Deployment

### Docker Deployment (Render, Railway, etc.)

1. Ensure you have a `Dockerfile` in this directory (see sample below).
2. On Render, select Docker as the runtime and set the root directory to `backend`.
3. Build command: `mvn clean package -DskipTests` (or `./mvnw clean package -DskipTests`)
4. The Dockerfile will automatically copy the built JAR and run it.
5. Add your environment variables in the Render dashboard.

#### Sample Dockerfile

```dockerfile
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

## Troubleshooting

- Check logs for errors (`target/logs/` or console)
- Ensure DB is running and credentials are correct
- CORS issues: verify allowed origins in config
- JWT/auth errors: check token validity and secret

## License

MIT License — see main project README

---

**Developed as part of Oasis Infobyte Internship Task #3**
