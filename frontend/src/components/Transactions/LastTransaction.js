import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, Alert, Table } from 'react-bootstrap';
import { fetchLastTransaction } from '../../store/slices/accountSlice';

const LastTransaction = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedAccount, lastTransaction, error } = useSelector((state) => state.account);

    useEffect(() => {
        if (!selectedAccount) {
            navigate('/dashboard');
            return;
        }
        dispatch(fetchLastTransaction(selectedAccount.accountNumber));
    }, [selectedAccount, dispatch, navigate]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    const getTransactionColor = (type) => {
        switch (type) {
            case 'DEPOSIT':
            case 'TRANSFER_IN':
                return 'success';
            case 'WITHDRAWAL':
            case 'TRANSFER_OUT':
                return 'danger';
            default:
                return 'secondary';
        }
    };

    return (
        <Container className="mt-5">
            <Card style={{ maxWidth: '700px', margin: '0 auto' }}>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2>Last Transaction</h2>
                        <Button variant="secondary" onClick={() => navigate('/dashboard')}>
                            Back to Dashboard
                        </Button>
                    </div>

                    {selectedAccount && (
                        <Alert variant="info">
                            Account: {selectedAccount.accountNumber}
                        </Alert>
                    )}

                    {error && <Alert variant="danger">{error}</Alert>}

                    {lastTransaction ? (
                        <Table bordered>
                            <tbody>
                                <tr>
                                    <th>Transaction ID</th>
                                    <td>{lastTransaction.transactionId}</td>
                                </tr>
                                <tr>
                                    <th>Date & Time</th>
                                    <td>{formatDate(lastTransaction.createdAt)}</td>
                                </tr>
                                <tr>
                                    <th>Type</th>
                                    <td>
                                        <span className={`badge bg-${getTransactionColor(lastTransaction.type)}`}>
                                            {lastTransaction.type.replace('_', ' ')}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Amount</th>
                                    <td className={lastTransaction.type.includes('OUT') || lastTransaction.type === 'WITHDRAWAL' ? 'text-danger' : 'text-success'}>
                                        <strong>
                                            {lastTransaction.type.includes('OUT') || lastTransaction.type === 'WITHDRAWAL' ? '-' : '+'}
                                            ${lastTransaction.amount.toFixed(2)}
                                        </strong>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Balance Before</th>
                                    <td>${lastTransaction.balanceBefore.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <th>Balance After</th>
                                    <td>${lastTransaction.balanceAfter.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>{lastTransaction.description}</td>
                                </tr>
                                {lastTransaction.recipientAccountNumber && (
                                    <tr>
                                        <th>Recipient Account</th>
                                        <td>{lastTransaction.recipientAccountNumber}</td>
                                    </tr>
                                )}
                                {lastTransaction.recipientName && (
                                    <tr>
                                        <th>Recipient Name</th>
                                        <td>{lastTransaction.recipientName}</td>
                                    </tr>
                                )}
                                <tr>
                                    <th>Status</th>
                                    <td>
                                        <span className="badge bg-success">{lastTransaction.status}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    ) : (
                        !error && <Alert variant="warning">No transactions available</Alert>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LastTransaction;
