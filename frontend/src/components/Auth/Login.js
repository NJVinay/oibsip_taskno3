import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, fetchUser, clearError } from '../../store/slices/authSlice';
import { Form, Button, Alert } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (result.type === 'auth/login/fulfilled') {
      await dispatch(fetchUser());
      navigate('/dashboard');
    }
  };

  React.useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <Card.Body className="p-4 p-md-5">
          <div className="text-center mb-4">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💳</div>
            <h2 className="mb-2">Welcome Back</h2>
            <p className="text-muted">Login to access your account</p>
          </div>
          {error && <Alert variant="danger" className="modern-alert">{error}</Alert>}
          <Form onSubmit={handleSubmit} className="modern-form" style={{ padding: 0, boxShadow: 'none' }}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
              />
            </Form.Group>
            <Button type="submit" className="w-100 modern-btn modern-btn-primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
          <div className="text-center mt-4">
            <p className="text-muted mb-0">
              Don't have an account? <Link to="/register" style={{ color: '#667eea', fontWeight: 600, textDecoration: 'none' }}>Register</Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
