// src/components/EditEntry.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEntry, updateEntry } from '../services/api';
import { Form, Button } from 'react-bootstrap';

const EditEntry = () => {
    const [entry, setEntry] = useState({
        user_id: '',
        date: '',
        amount: '',
        category: '',
        description: '',
        type: 'income',
    });
    
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchEntry = async () => {
            const data = await getEntry(id);
            setEntry(data);
        };

        fetchEntry();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEntry((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateEntry(id, entry);
            navigate('/');
        } catch (error) {
            console.error('Failed to update entry:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h1>Edit Entry</h1>
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
                    />
                </Form.Group>
                <Form.Group controlId="formDate">
                    <Form.Label>Date (YYYY-MM-DD HH:MM:SS)</Form.Label>
                    <Form.Control
                        type="text"
                        name="date"
                        value={entry.date}
                        onChange={handleChange}
                        placeholder="Date"
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
                        placeholder="Amount"
                        required
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
                    <Form.Control as="select" name="type" value={entry.type} onChange={handleChange}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Update Entry</Button>
            </Form>
        </div>
    );
};

export default EditEntry;
