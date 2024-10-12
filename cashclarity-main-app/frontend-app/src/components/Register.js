import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const Register = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Credentials being sent:', credentials);

    axios.post('http://localhost:5000/register', credentials)
      .then(() => {
        navigate('/login');
      })
      .catch(error => {
        console.error('Error response:', error.response);
        setError('Registration failed');
      });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ height: 'calc(100vh - 56px)', marginTop: '2px' }}>
      <div className="register-form" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Register</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter your username"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Register
          </Button>
        </Form>
        <div className="text-center mt-3">
          <p className="mb-0">Already registered?</p>
          <Button variant="link" onClick={() => navigate('/login')}>Login</Button>
        </div>
      </div>
    </Container>
  );
};

export default Register;
