import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, fetchUser, clearError } from '../../store/slices/authSlice';
import { Form, Button, Alert } from 'react-bootstrap';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    pin: '',
  });
  const [validationError, setValidationError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setValidationError('Password must be at least 8 characters');
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      setValidationError('Password must contain uppercase, lowercase, and digit');
      return;
    }

    if (!/^\d{4,6}$/.test(formData.pin)) {
      setValidationError('PIN must be 4-6 digits');
      return;
    }

    const result = await dispatch(register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      pin: formData.pin,
    }));

    if (result.type === 'auth/register/fulfilled') {
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
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏦</div>
            <h2 className="mb-2">Create Account</h2>
            <p className="text-muted">Join us today</p>
          </div>
          {error && <Alert variant="danger" className="modern-alert">{error}</Alert>}
          {validationError && <Alert variant="danger" className="modern-alert">{validationError}</Alert>}
          <Form onSubmit={handleSubmit} className="modern-form" style={{ padding: 0, boxShadow: 'none' }}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter full name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter password"
              />
              <Form.Text className="text-muted">
                At least 8 characters with uppercase, lowercase, and digit
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm password"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>PIN (4-6 digits)</Form.Label>
              <Form.Control
                type="password"
                name="pin"
                value={formData.pin}
                onChange={handleChange}
                required
                placeholder="Enter PIN"
                maxLength="6"
              />
            </Form.Group>
            <Button type="submit" className="w-100 modern-btn modern-btn-primary" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </Form>
          <div className="text-center mt-4">
            <p className="text-muted mb-0">
              Already have an account? <Link to="/login" style={{ color: '#667eea', fontWeight: 600, textDecoration: 'none' }}>Login</Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;
