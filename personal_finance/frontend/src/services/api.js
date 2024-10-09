// src/services/api.js
const API_URL = process.env.REACT_APP_API_URL;

// Fetch all entries
export const getEntries = async () => {
    const response = await fetch(`${API_URL}/entries`);
    if (!response.ok) {
        throw new Error('Failed to fetch entries');
    }
    return await response.json();
};

// Fetch a single entry by ID
export const getEntry = async (id) => {
    const response = await fetch(`${API_URL}/entries/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch entry with id: ${id}`);
    }
    return await response.json();
};

// Create a new entry
export const createEntry = async (entry) => {
    const response = await fetch(`${API_URL}/entries`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
    });
    if (!response.ok) {
        throw new Error('Failed to create entry');
    }
    return await response.json();
};

// Update an existing entry
export const updateEntry = async (id, entry) => {
    const response = await fetch(`${API_URL}/entries/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
    });
    if (!response.ok) {
        throw new Error(`Failed to update entry with id: ${id}`);
    }
    return await response.json();
};

// Delete an entry
export const deleteEntry = async (id) => {
    const response = await fetch(`${API_URL}/entries/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete entry');
    }
};

// Fetch dashboard data
export const getDashboardData = async () => {
    const response = await fetch(`${API_URL}/dashboard`);
    if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
    }
    return await response.json();
};
