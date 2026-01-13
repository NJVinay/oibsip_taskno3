# ATM Interface - Basic Banking System

This is a full-stack ATM Interface project for the Oasis Infobyte Java Development Internship program. It features a modern React frontend and a secure Java Spring Boot backend simulating basic banking operations.

## 📋 Project Overview

This project provides a web-based ATM interface for users to perform banking transactions securely. It includes:

- A React frontend (user interface)
- A Java Spring Boot backend (REST API, authentication, business logic)

## ✨ Features

- User registration & login (JWT authentication)
- Check balance, deposit, withdraw, transfer
- Transaction history & last transaction
- Secure PIN verification for sensitive actions
- Responsive, modern UI
- Global error handling

## 🛠️ Technologies Used

- **Frontend:** React, Redux, Bootstrap, Axios
- **Backend:** Java 17+, Spring Boot, Spring Security, JWT, BCrypt
- **Build Tools:** Maven or Gradle
- **Dev Tools:** VS Code, IntelliJ IDEA, Postman

## 📁 Project Structure

```
oibsip_taskno3/
├── bankAccount.java    # Main application file with ATM interface logic
└── README.md          # Project documentation
```

## 🚀 How to Run

See the detailed setup in each subproject:

- [Frontend/README.md](frontend/README.md)
- [Backend/README.md](backend/README.md)

## 💻 Usage Example

See screenshots and API usage in the respective frontend and backend READMEs.

## 🎯 Key Functionalities

### Balance Check

Displays the current balance in the account.

### Deposit

Allows users to add money to their account. The system updates the balance and records the transaction.

### Withdraw

Enables users to withdraw money from their account. The balance is updated accordingly.

### Previous Transaction

Shows details of the last transaction performed (deposit or withdrawal amount).

### Transfer

Facilitates money transfer to another account by providing recipient details and transfer amount.

## 👨‍💻 Default Configuration

See backend README for default configuration and environment variables.

## 🔄 Future Enhancements

- Add persistent database (PostgreSQL/MySQL)
- Multi-user support
- Admin dashboard
- Email notifications
- Docker deployment

## 📝 About

This project was developed as part of the **Oasis Infobyte Internship Program** to demonstrate full-stack development, secure authentication, RESTful API design, and modern frontend engineering.

## 📄 License

MIT License — see LICENSE file.

---

**Developed by:** Internship Task #3  
**Organization:** Oasis Infobyte
