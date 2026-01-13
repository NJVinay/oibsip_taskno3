# ATM Interface Frontend - Setup Guide

#

**See also:** [Backend/README.md](../backend/README.md)

## Prerequisites

- Node.js 16 or higher
- npm or yarn

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

## Environment Configuration

1. **Copy the example environment file:**

   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file:**
   ```properties
   REACT_APP_API_URL=http://localhost:8080/api
   ```

## Development

**Start the development server:**

```bash
npm start
```

The application will start on `http://localhost:3000`

## Build for Production

**Create optimized production build:**

```bash
npm run build
```

The build files will be in the `build/` directory.

## Features

### User Authentication

- User registration with validation
- Secure login
- JWT token management
- Auto-logout on token expiration

### Account Management

- View account balance
- Multiple account support
- Real-time balance updates

### Transactions

- **Deposit** - Add funds to account
- **Withdraw** - Remove funds (requires PIN)
- **Transfer** - Send money to another account (requires PIN)
- **Transaction History** - View all transactions
- **Last Transaction** - Quick view of recent transaction

### Security Features

- Protected routes (authentication required)
- Automatic token refresh
- Rate limit handling
- PIN verification for sensitive operations

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── Dashboard/
│   │   │   └── Dashboard.js
│   │   ├── Transactions/
│   │   │   ├── Deposit.js
│   │   │   ├── Withdraw.js
│   │   │   ├── Transfer.js
│   │   │   ├── TransactionHistory.js
│   │   │   └── LastTransaction.js
│   │   └── PrivateRoute.js
│   ├── services/
│   │   └── api.js
│   ├── store/
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   └── accountSlice.js
│   │   └── index.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .env.example
├── .gitignore
└── package.json
```

## Deployment

### Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variables in Netlify dashboard

### Vercel

1. Import project from GitHub
2. Framework preset: Create React App
3. Add environment variables
4. Deploy

### AWS S3 + CloudFront

1. Build the project: `npm run build`
2. Upload `build/` contents to S3 bucket
3. Configure CloudFront distribution
4. Set environment variables before build

## Troubleshooting

### API Connection Issues

- Verify backend is running
- Check `REACT_APP_API_URL` in `.env`
- Check CORS settings in backend

### Authentication Issues

- Clear browser local storage
- Check JWT token expiration
- Verify backend authentication endpoints

### Build Issues

- Delete `node_modules/` and reinstall
- Clear npm cache: `npm cache clean --force`
- Check Node.js version compatibility
