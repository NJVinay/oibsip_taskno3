import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Table, Button, Alert } from 'react-bootstrap';
import { fetchTransactions } from '../../store/slices/accountSlice';

const TransactionHistory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedAccount, transactions, loading, error } = useSelector((state) => state.account);

    useEffect(() => {
        if (!selectedAccount) {
            navigate('/dashboard');
            return;
        }
        dispatch(fetchTransactions(selectedAccount.accountNumber));
    }, [selectedAccount, dispatch, navigate]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <Container className="page-container">
            <Card className="modern-card">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                        <div>
                            <h2 className="text-gradient mb-2">📊 Transaction History</h2>
                            <p className="text-muted mb-0">View all your account transactions</p>
                        </div>
                        <Button className="modern-btn modern-btn-outline" onClick={() => navigate('/dashboard')}>
                            ← Back to Dashboard
                        </Button>
                    </div>

                    {selectedAccount && (
                        <Alert variant="info" className="modern-alert">
                            <strong>Account:</strong> {selectedAccount.accountNumber}
                        </Alert>
                    )}

                    {loading && (
                        <div className="text-center my-5">
                            <div className="modern-spinner"></div>
                        </div>
                    )}
                    {error && <Alert variant="danger" className="modern-alert">{error}</Alert>}

                    {!loading && transactions && transactions.length === 0 && (
                        <Alert variant="warning" className="modern-alert">
                            📄 No transactions found for this account
                        </Alert>
                    )}

                    {!loading && transactions && transactions.length > 0 && (
                        <div className="table-responsive">
                            <Table className="modern-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Transaction ID</th>
                                        <th>Type</th>
                                        <th>Amount</th>
                                        <th>Balance After</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((transaction) => (
                                        <tr key={transaction.id}>
                                            <td>{formatDate(transaction.createdAt)}</td>
                                            <td><code style={{ fontSize: '0.85rem' }}>{transaction.transactionId}</code></td>
                                            <td>
                                                <span className={`modern-badge badge-${transaction.type.toLowerCase().replace('_', '-')}`}>
                                                    {transaction.type.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className={transaction.type.includes('OUT') || transaction.type === 'WITHDRAWAL' ? 'text-danger fw-bold' : 'text-success fw-bold'}>
                                                {transaction.type.includes('OUT') || transaction.type === 'WITHDRAWAL' ? '-' : '+'}
                                                ${transaction.amount.toFixed(2)}
                                            </td>
                                            <td className="fw-bold">${transaction.balanceAfter.toFixed(2)}</td>
                                            <td>{transaction.description}</td>
                                            <td>
                                                <span className="badge bg-success">{transaction.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default TransactionHistory;
