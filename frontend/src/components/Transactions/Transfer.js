import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { transfer, fetchAccounts, clearError, clearSuccess } from '../../store/slices/accountSlice';

const Transfer = () => {
    const [toAccountNumber, setToAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedAccount, error, success } = useSelector((state) => state.account);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedAccount) {
            alert('Please select an account first');
            navigate('/dashboard');
            return;
        }

        const result = await dispatch(transfer({
            fromAccountNumber: selectedAccount.accountNumber,
            toAccountNumber: toAccountNumber,
            amount: parseFloat(amount),
            pin: pin,
            description: description || 'Transfer',
        }));

        if (result.type === 'account/transfer/fulfilled') {
            setToAccountNumber('');
            setAmount('');
            setPin('');
            setDescription('');
            dispatch(fetchAccounts());
            setTimeout(() => {
                dispatch(clearSuccess());
                navigate('/dashboard');
            }, 2000);
        }
    };

    React.useEffect(() => {
        return () => {
            dispatch(clearError());
            dispatch(clearSuccess());
        };
    }, [dispatch]);

    return (
        <Container className="page-container">
            <div className="modern-form" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div className="text-center mb-4">
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💸</div>
                    <h2 className="text-gradient">Transfer Money</h2>
                    <p className="text-muted">Send money to another account</p>
                </div>
                {error && <Alert variant="danger" className="modern-alert">{error}</Alert>}
                {success && <Alert variant="success" className="modern-alert">{success}</Alert>}

                {selectedAccount && (
                    <Alert variant="info" className="modern-alert">
                        <strong>From Account:</strong> {selectedAccount.accountNumber}<br />
                        <strong>Current Balance:</strong> ${selectedAccount.balance?.toFixed(2)}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Recipient Account Number</Form.Label>
                        <Form.Control
                            type="text"
                            value={toAccountNumber}
                            onChange={(e) => setToAccountNumber(e.target.value)}
                            required
                            placeholder="Enter recipient account number"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            min="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            placeholder="Enter amount"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>PIN</Form.Label>
                        <Form.Control
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            required
                            placeholder="Enter PIN"
                            maxLength="6"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description (Optional)</Form.Label>
                        <Form.Control
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter description"
                        />
                    </Form.Group>
                    <Button type="submit" className="w-100 modern-btn modern-btn-primary mb-2">
                        Transfer
                    </Button>
                    <Button className="w-100 modern-btn modern-btn-outline" onClick={() => navigate('/dashboard')}>
                        Cancel
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default Transfer;
