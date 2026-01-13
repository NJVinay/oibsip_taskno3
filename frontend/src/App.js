import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Deposit from './components/Transactions/Deposit';
import Withdraw from './components/Transactions/Withdraw';
import Transfer from './components/Transactions/Transfer';
import TransactionHistory from './components/Transactions/TransactionHistory';
import ManageAccounts from './components/Accounts/ManageAccounts';
import CreateAccount from './components/Accounts/CreateAccount';
import PrivateRoute from './components/PrivateRoute';
import ErrorBoundary from './components/ErrorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <PrivateRoute>
                                        <Dashboard />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/deposit"
                                element={
                                    <PrivateRoute>
                                        <Deposit />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/withdraw"
                                element={
                                    <PrivateRoute>
                                        <Withdraw />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/transfer"
                                element={
                                    <PrivateRoute>
                                        <Transfer />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/transactions"
                                element={
                                    <PrivateRoute>
                                        <TransactionHistory />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/accounts"
                                element={
                                    <PrivateRoute>
                                        <ManageAccounts />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/create-account"
                                element={
                                    <PrivateRoute>
                                        <CreateAccount />
                                    </PrivateRoute>
                                }
                            />
                            <Route path="/" element={<Navigate to="/dashboard" />} />
                        </Routes>
                    </div>
                </Router>
            </Provider>
        </ErrorBoundary>
    );
}

export default App;
