import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, Table, Badge, Alert, Modal, Form, Navbar, Nav } from 'react-bootstrap';
import { fetchAccounts, deleteAccount, selectAccount, addBalance } from '../../store/slices/accountSlice';
import { logout } from '../../store/slices/authSlice';

const ManageAccounts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { accounts, loading } = useSelector((state) => state.account);
    const [error, setError] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddBalanceModal, setShowAddBalanceModal] = useState(false);
    const [accountToDelete, setAccountToDelete] = useState(null);
    const [accountToAddBalance, setAccountToAddBalance] = useState(null);
    const [balanceAmount, setBalanceAmount] = useState('');

    useEffect(() => {
        dispatch(fetchAccounts());
    }, [dispatch]);

    const handleDelete = (account) => {
        setAccountToDelete(account);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await dispatch(deleteAccount(accountToDelete.accountNumber)).unwrap();
            setShowDeleteModal(false);
            setAccountToDelete(null);
            dispatch(fetchAccounts());
            alert('Account deleted successfully!');
        } catch (err) {
            setError(err || 'Failed to delete account');
        }
    };

    const handleAddBalance = (account) => {
        setAccountToAddBalance(account);
        setBalanceAmount('');
        setShowAddBalanceModal(true);
    };

    const confirmAddBalance = async () => {
        try {
            const amount = parseFloat(balanceAmount);
            if (isNaN(amount) || amount <= 0) {
                setError('Please enter a valid amount');
                return;
            }

            await dispatch(addBalance({
                accountNumber: accountToAddBalance.accountNumber,
                amount: amount
            })).unwrap();

            setShowAddBalanceModal(false);
            setAccountToAddBalance(null);
            setBalanceAmount('');
            dispatch(fetchAccounts());
            alert('Balance added successfully!');
        } catch (err) {
            setError(err || 'Failed to add balance');
        }
    };

    const handleSelectAccount = (account) => {
        dispatch(selectAccount(account));
        navigate('/dashboard');
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <>
            <Navbar className="modern-navbar" variant="dark">
                <Container>
                    <Navbar.Brand className="d-flex align-items-center">
                        <span style={{ fontSize: '1.5rem', marginRight: '8px' }}>💳</span>
                        ATM Interface
                    </Navbar.Brand>
                    <Nav className="ms-auto align-items-center gap-2">
                        <Button className="modern-btn modern-btn-outline" size="sm" onClick={() => navigate('/dashboard')}>
                            Dashboard
                        </Button>
                        <Button className="modern-btn modern-btn-outline" size="sm" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Nav>
                </Container>
            </Navbar>

            <Container className="page-container">
                <Card className="modern-card">
                    <Card.Header style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: '16px 16px 0 0' }}>
                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                            <div>
                                <h4 className="mb-1 fw-bold">⚙️ Manage Accounts</h4>
                                <small style={{ opacity: 0.9 }}>View, create, and manage your accounts</small>
                            </div>
                            <Button variant="light" className="modern-btn" onClick={() => navigate('/create-account')}>
                                + Create New Account
                            </Button>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        {error && <Alert variant="danger" className="modern-alert" dismissible onClose={() => setError('')}>{error}</Alert>}

                        {loading && (
                            <div className="text-center my-5">
                                <div className="modern-spinner"></div>
                            </div>
                        )}

                        {!loading && accounts.length === 0 && (
                            <Alert variant="info" className="modern-alert">
                                📊 You don't have any accounts yet. Create one to get started!
                            </Alert>
                        )}

                        {!loading && accounts.length > 0 && (
                            <div className="table-responsive">
                                <Table className="modern-table">
                                    <thead>
                                        <tr>
                                            <th>Account Number</th>
                                            <th>Type</th>
                                            <th>Balance</th>
                                            <th>Created</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {accounts.map((account) => (
                                            <tr key={account.id}>
                                                <td>
                                                    <strong>{account.accountNumber}</strong>
                                                </td>
                                                <td>
                                                    <Badge bg="info">{account.accountType}</Badge>
                                                </td>
                                                <td>
                                                    <strong className="text-success">
                                                        ${account.balance?.toFixed(2) || '0.00'}
                                                    </strong>
                                                </td>
                                                <td>
                                                    {new Date(account.createdAt).toLocaleDateString()}
                                                </td>
                                                <td>
                                                    <div className="d-flex gap-2 flex-wrap">
                                                        <Button
                                                            className="modern-btn modern-btn-success"
                                                            size="sm"
                                                            onClick={() => handleSelectAccount(account)}
                                                        >
                                                            ✔ Select
                                                        </Button>
                                                        <Button
                                                            className="modern-btn modern-btn-primary"
                                                            size="sm"
                                                            onClick={() => handleAddBalance(account)}
                                                        >
                                                            + Add Balance
                                                        </Button>
                                                        <Button
                                                            className="modern-btn"
                                                            size="sm"
                                                            onClick={() => handleDelete(account)}
                                                            disabled={accounts.length === 1}
                                                            style={{
                                                                background: accounts.length === 1 ? '#ccc' : 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                                                                color: 'white'
                                                            }}
                                                        >
                                                            🗑️ Delete
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        )}
                    </Card.Body>
                </Card>

                {/* Delete Confirmation Modal */}
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                    <Modal.Header closeButton style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white', border: 'none' }}>
                        <Modal.Title>⚠️ Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-4">
                        <p className="mb-2">Are you sure you want to delete account:</p>
                        <p className="fw-bold fs-5 text-danger mb-2">{accountToDelete?.accountNumber}</p>
                        <Alert variant="warning" className="modern-alert">
                            ⚠️ This action cannot be undone.
                        </Alert>
                    </Modal.Body>
                    <Modal.Footer style={{ border: 'none' }}>
                        <Button className="modern-btn modern-btn-outline" onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </Button>
                        <Button className="modern-btn" onClick={confirmDelete} style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white' }}>
                            Delete Account
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Add Balance Modal */}
                <Modal show={showAddBalanceModal} onHide={() => setShowAddBalanceModal(false)} centered>
                    <Modal.Header closeButton style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none' }}>
                        <Modal.Title>💰 Add Balance</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-4">
                        <p className="mb-3">Add balance to account: <strong className="text-primary">{accountToAddBalance?.accountNumber}</strong></p>
                        <Form.Group>
                            <Form.Label className="fw-bold">Amount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter amount"
                                value={balanceAmount}
                                onChange={(e) => setBalanceAmount(e.target.value)}
                                min="0"
                                step="0.01"
                                style={{ borderRadius: '10px', padding: '12px' }}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer style={{ border: 'none' }}>
                        <Button className="modern-btn modern-btn-outline" onClick={() => setShowAddBalanceModal(false)}>
                            Cancel
                        </Button>
                        <Button className="modern-btn modern-btn-primary" onClick={confirmAddBalance}>
                            Add Balance
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
};

export default ManageAccounts;
