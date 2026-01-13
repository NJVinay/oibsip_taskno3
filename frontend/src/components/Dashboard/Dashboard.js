import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Navbar, Nav } from 'react-bootstrap';
import { fetchAccounts, fetchBalance } from '../../store/slices/accountSlice';
import { logout, fetchUser } from '../../store/slices/authSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { accounts, selectedAccount, loading } = useSelector((state) => state.account);

    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchAccounts());
    }, [dispatch]);

    useEffect(() => {
        if (selectedAccount) {
            const interval = setInterval(() => {
                dispatch(fetchBalance(selectedAccount.accountNumber));
            }, 30000); // Refresh balance every 30 seconds

            return () => clearInterval(interval);
        }
    }, [selectedAccount, dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const handleRefreshBalance = () => {
        if (selectedAccount) {
            dispatch(fetchBalance(selectedAccount.accountNumber));
        }
    };

    return (
        <>
            <Navbar className="modern-navbar" variant="dark">
                <Container>
                    <Navbar.Brand className="d-flex align-items-center">
                        <span style={{ fontSize: '1.5rem', marginRight: '8px' }}>💳</span>
                        ATM Interface
                    </Navbar.Brand>
                    <Nav className="ms-auto align-items-center">
                        <Navbar.Text className="me-3" style={{ color: '#fff' }}>
                            <span style={{ opacity: 0.8 }}>Welcome,</span> <strong>{user?.name}</strong>
                        </Navbar.Text>
                        <Button className="modern-btn modern-btn-outline" size="sm" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Nav>
                </Container>
            </Navbar>

            <Container className="page-container">
                <Row className="mb-4">
                    <Col>
                        <h2 className="text-gradient mb-2">Dashboard</h2>
                        <p className="text-muted">
                            <i className="bi bi-person-badge"></i> Customer ID: <strong>{user?.customerId}</strong>
                        </p>
                    </Col>
                </Row>

                {loading && (
                    <div className="text-center my-5">
                        <div className="modern-spinner"></div>
                    </div>
                )}

                {selectedAccount && (
                    <Row className="mb-4">
                        <Col lg={6} className="mx-auto">
                            <Card className="balance-card text-center">
                                <Card.Body className="position-relative">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="mb-0" style={{ fontWeight: 600 }}>Account Balance</h5>
                                        <Button
                                            variant="light"
                                            size="sm"
                                            onClick={handleRefreshBalance}
                                            style={{ borderRadius: '10px', fontWeight: 600 }}
                                        >
                                            🔄 Refresh
                                        </Button>
                                    </div>
                                    <div className="balance-amount">
                                        ${selectedAccount.balance?.toFixed(2) || '0.00'}
                                    </div>
                                    <div className="balance-info">
                                        <div className="mb-1">
                                            <strong>Account:</strong> {selectedAccount.accountNumber}
                                        </div>
                                        <div>
                                            <strong>Type:</strong> {selectedAccount.accountType}
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}

                <Row className="g-4 mb-4">
                    <Col md={4}>
                        <Card className="action-card action-card-deposit" onClick={() => navigate('/deposit')}>
                            <Card.Body className="text-center">
                                <div className="icon">💰</div>
                                <h5 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Deposit</h5>
                                <p className="text-muted mb-3">Add funds to your account</p>
                                <Button className="modern-btn modern-btn-success">
                                    Deposit Money
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="action-card action-card-withdraw" onClick={() => navigate('/withdraw')}>
                            <Card.Body className="text-center">
                                <div className="icon">💵</div>
                                <h5 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Withdraw</h5>
                                <p className="text-muted mb-3">Withdraw funds from your account</p>
                                <Button className="modern-btn modern-btn-warning">
                                    Withdraw Money
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="action-card action-card-transfer" onClick={() => navigate('/transfer')}>
                            <Card.Body className="text-center">
                                <div className="icon">💸</div>
                                <h5 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Transfer</h5>
                                <p className="text-muted mb-3">Transfer to another account</p>
                                <Button className="modern-btn modern-btn-primary">
                                    Transfer Money
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="g-4">
                    <Col md={6}>
                        <Card className="action-card action-card-history" onClick={() => navigate('/transactions')}>
                            <Card.Body className="text-center">
                                <div className="icon">📊</div>
                                <h5 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Transaction History</h5>
                                <p className="text-muted mb-3">View all your transactions</p>
                                <Button className="modern-btn modern-btn-primary">
                                    View History
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="action-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
                            <Card.Body className="text-center">
                                <div className="icon" style={{ color: 'white' }}>⚙️</div>
                                <h5 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Account Management</h5>
                                <p style={{ opacity: 0.9, marginBottom: '1rem' }}>Manage your accounts</p>
                                <div className="d-flex justify-content-center gap-2 flex-wrap">
                                    <Button variant="light" className="modern-btn" onClick={(e) => { e.stopPropagation(); navigate('/accounts'); }}>
                                        Manage Accounts
                                    </Button>
                                    <Button variant="outline-light" className="modern-btn" onClick={(e) => { e.stopPropagation(); navigate('/create-account'); }}>
                                        Create New Account
                                    </Button>
                                </div>
                                <div className="mt-2">
                                    <small className="text-muted">
                                        You have {accounts.length} account{accounts.length !== 1 ? 's' : ''}
                                    </small>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Dashboard;
