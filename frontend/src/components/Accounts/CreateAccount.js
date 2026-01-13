import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { createAccount } from '../../store/slices/accountSlice';

const CreateAccount = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        accountType: 'SAVINGS',
        withStarterBalance: false,
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await dispatch(createAccount(formData)).unwrap();
            alert('Account created successfully!');
            navigate('/accounts');
        } catch (err) {
            setError(err || 'Failed to create account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="page-container">
            <div className="modern-form" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div className="text-center mb-4">
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏦</div>
                    <h2 className="text-gradient">Create New Account</h2>
                    <p className="text-muted">Set up a new account for your banking needs</p>
                </div>

                {error && <Alert variant="danger" className="modern-alert">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Account Type</Form.Label>
                        <Form.Select
                            name="accountType"
                            value={formData.accountType}
                            onChange={handleChange}
                        >
                            <option value="SAVINGS">Savings Account</option>
                            <option value="CHECKING">Checking Account</option>
                            <option value="BUSINESS">Business Account</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            name="withStarterBalance"
                            label="Add random starter balance (100-5000)"
                            checked={formData.withStarterBalance}
                            onChange={handleChange}
                        />
                        <Form.Text className="text-muted">
                            Check this to start with a random balance for testing purposes
                        </Form.Text>
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button type="submit" className="modern-btn modern-btn-primary" disabled={loading}>
                            {loading ? 'Creating...' : '✓ Create Account'}
                        </Button>
                        <Button className="modern-btn modern-btn-outline" onClick={() => navigate('/accounts')}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default CreateAccount;
