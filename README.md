# ATM Interface - Basic Banking System

This is Task #3 from the Oasis Infobyte Java Development Internship program - creating a functional ATM Interface simulation.

## 📋 Project Overview

A console-based ATM interface application that simulates basic banking operations. The application provides an interactive menu-driven system for users to perform various banking transactions.

## ✨ Features

- **Check Balance** - View current account balance
- **Deposit Money** - Add funds to the account
- **Withdraw Money** - Remove funds from the account
- **Previous Transaction** - View details of the last transaction
- **Transfer Money** - Transfer funds to another account
- **User-Friendly Interface** - Interactive menu with clear options

## 🛠️ Technologies Used

- **Language:** Java
- **IDE:** Any Java-compatible IDE (Eclipse, IntelliJ IDEA, VS Code, etc.)
- **JDK Version:** Java 8 or higher

## 📁 Project Structure

```
oibsip_taskno3/
├── bankAccount.java    # Main application file with ATM interface logic
└── README.md          # Project documentation
```

## 🚀 How to Run

1. **Compile the program:**

   ```bash
   javac bankAccount.java
   ```

2. **Run the application:**

   ```bash
   java bankAccount
   ```

3. **Follow the on-screen menu:**
   - Enter the corresponding letter (A-F) to perform an operation
   - Follow the prompts to complete transactions

## 💻 Usage Example

```
Welcome VINAY
Your ID is 123456

A. Check Balance
B. Deposit
C. Withdraw
D. Previous Transaction
E. Transfer
F. Exit

====================================
Enter an option
====================================
```

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

- **Default Customer Name:** VINAY
- **Default Customer ID:** 123456
- **Initial Balance:** 0

## 🔄 Future Enhancements

- Add PIN authentication
- Implement transaction history
- Add minimum balance requirements
- Include interest calculation
- Support multiple accounts
- Add data persistence (database/file storage)

## 📝 About

This project was developed as part of the **Oasis Infobyte Internship Program** to demonstrate fundamental Java programming concepts including:

- Object-Oriented Programming
- User Input Handling
- Control Flow (switch-case, loops)
- Method Implementation
- Console I/O Operations

## 📄 License

This project is part of an internship task and is intended for educational purposes.

---

**Developed by:** Internship Task #3  
**Organization:** Oasis Infobyte
