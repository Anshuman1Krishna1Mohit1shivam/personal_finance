import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ListGroup, Button, Card, Alert } from 'react-bootstrap';

const EntryList = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Unauthorized access');
      return;
    }

    axios.get('http://localhost:5000/entries', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => setEntries(response.data))
      .catch(() => setError('Failed to fetch entries'));
  }, []);

  const deleteEntry = (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Unauthorized access');
      return;
    }

    axios.delete(`http://localhost:5000/entries/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        setEntries(entries.filter(entry => entry.id !== id));
      })
      .catch(() => setError('Failed to delete entry'));
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Financial Entries</h1>
      <Link to="/create" className="btn btn-primary mb-3">
        Add Entry
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
                    <p className="mb-0 text-muted">Date: {new Date(entry.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Link to={`/edit/${entry.id}`} className="btn btn-warning me-2">
                      Edit
                    </Link>
                    <Button variant="danger" onClick={() => deleteEntry(entry.id)}>
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

export default EntryList;
