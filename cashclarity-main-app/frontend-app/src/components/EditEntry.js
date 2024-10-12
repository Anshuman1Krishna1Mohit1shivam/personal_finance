import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const EditEntry = () => {
  const { id } = useParams(); // Get the entry ID from the URL
  const [entry, setEntry] = useState({
    user_id: '',
    date: '',
    amount: '',
    category: '',
    description: '',
    type: 'income' // Default type can be set to income or expense
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch entry details when the component loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Unauthorized access');
      return;
    }

    axios.get(`http://localhost:5000/entries/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setEntry(response.data); // Set the entry data
      })
      .catch(() => {
        setError('Failed to fetch entry details');
      });
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  // Handle form submission for updating the entry
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Unauthorized access');
      return;
    }

    axios.put(`http://localhost:5000/entries/${id}`, entry, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        navigate('/entries'); // Redirect to the entry list after successful update
      })
      .catch(() => {
        setError('Failed to update entry');
      });
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Edit Entry</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUserId">
              <Form.Label>User ID</Form.Label>
              <Form.Control 
                type="text" 
                name="user_id" 
                value={entry.user_id} 
                readOnly 
              />
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={entry.date.split('T')[0]}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={entry.amount}
                onChange={handleChange}
                required
                placeholder="Amount"
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={entry.category}
                onChange={handleChange}
                required
                placeholder="Category"
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={entry.description}
                onChange={handleChange}
                placeholder="Description"
              />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={entry.type}
                onChange={handleChange}
                className="mb-3"
                required
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Update Entry
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditEntry;
