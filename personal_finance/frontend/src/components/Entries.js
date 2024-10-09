// src/components/Entries.js
import React, { useEffect, useState } from 'react';
import { getEntries, deleteEntry } from '../services/api';
import { Link } from 'react-router-dom';
import { ListGroup, Button, Card, Alert } from 'react-bootstrap';

const Entries = () => {
    const [entries, setEntries] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const data = await getEntries();
                setEntries(data);
            } catch (err) {
                setError('Failed to load entries');
            }
        };

        fetchEntries();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this entry?")) {
            try {
                await deleteEntry(id);
                setEntries(entries.filter(entry => entry.id !== id));
            } catch (err) {
                setError('Failed to delete entry');
            }
        }
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Financial Entries</h1>
            <Link to="/create" className="btn btn-primary mb-3">
                Create Entry
            </Link>
            {error && <Alert variant="danger">{error}</Alert>}
            <Card>
                <Card.Body>
                    <ListGroup>
                        {entries.length > 0 ? (
                            entries.map(entry => (
                                <ListGroup.Item key={entry.id} className="d-flex justify-content-between align-items-center mb-3 border rounded">
                                    <div>
                                        <h5 className="mb-1">{entry.description}</h5>
                                        <p className="mb-0 text-muted">Amount: ₹{entry.amount.toFixed(2)}</p>
                                        <p className="mb-0 text-muted">Date: {new Date(entry.date).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <Link to={`/edit/${entry.id}`} className="btn btn-warning me-2">
                                            Edit
                                        </Link>
                                        <Button variant="danger" onClick={() => handleDelete(entry.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            ))
                        ) : (
                            <ListGroup.Item className="text-center">
                                No entries found. Create a new entry to get started!
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Entries;
