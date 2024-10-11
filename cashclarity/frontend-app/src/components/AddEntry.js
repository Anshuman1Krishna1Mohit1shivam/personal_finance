import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const AddEntry = () => {
  const [entry, setEntry] = useState({
    user_id: '', // Will be set from local storage
    date: '',
    amount: '',
    category: '',
    description: '',
    type: 'expense',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username'); // Assuming username is stored in local storage
    const currentDate = new Date().toISOString().slice(0, 10); // Format current date to YYYY-MM-DD
    setEntry((prevEntry) => ({
      ...prevEntry,
      user_id: username,
      date: currentDate, // Set default date to current date
    }));
  }, []);

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:5000/entries', entry, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/'); // Redirect after successful submission
    } catch (error) {
      setError('Failed to add entry');
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Add Financial Entry</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={entry.date}
                onChange={handleChange}
                required
                className="mb-3"
              />
            </Form.Group>
            <Form.Group controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={entry.amount}
                onChange={handleChange}
                placeholder="Amount"
                required
                className="mb-3"
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={entry.category}
                onChange={handleChange}
                placeholder="Category"
                required
                className="mb-3"
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
                className="mb-3"
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
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Add Entry
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddEntry;
