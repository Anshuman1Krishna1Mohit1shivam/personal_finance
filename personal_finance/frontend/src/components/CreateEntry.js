import React, { useState } from 'react';
import { createEntry } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const CreateEntry = () => {
    const [entry, setEntry] = useState({
        user_id: '',
        date: '',
        amount: '',
        category: '',
        description: '',
        type: 'income',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEntry(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Format date to "YYYY-MM-DD HH:MM:SS"
            const formattedDate = entry.date.replace('T', ' ') + ':00';
            const dataToSubmit = { ...entry, date: formattedDate };
            await createEntry(dataToSubmit);
            navigate('/entries');
        } catch (error) {
            setError('Failed to create entry');
        }
    };

    const setCurrentDateTime = () => {
        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 16); // Format to YYYY-MM-DDTHH:MM
        setEntry(prevState => ({ ...prevState, date: formattedDate }));
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Create Entry</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUserId">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="user_id" 
                                value={entry.user_id} 
                                onChange={handleChange} 
                                placeholder="User ID" 
                                required 
                                className="mb-3"
                            />
                        </Form.Group>
                        <Form.Group controlId="formDate">
                            <Form.Label>Date and Time</Form.Label>
                            <div className="d-flex">
                                <Form.Control 
                                    type="datetime-local" 
                                    name="date" 
                                    value={entry.date} 
                                    onChange={handleChange} 
                                    required 
                                    className="mr-2"
                                />
                                <Button variant="secondary" onClick={setCurrentDateTime}>
                                    Now
                                </Button>
                            </div>
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
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Create Entry
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CreateEntry;
