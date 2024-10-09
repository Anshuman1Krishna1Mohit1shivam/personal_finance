import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Entries from './components/Entries';
import CreateEntry from './components/CreateEntry';
import Navbar from './components/Navbar';
import EditEntry from './components/EditEntry';
import Dashboard from './components/Dashboard'; // Import the Dashboard component
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Dashboard />} /> {/* Set Dashboard as the home route */}
                    <Route path="/entries" element={<Entries />} />
                    <Route path="/create" element={<CreateEntry />} />
                    <Route path="/edit/:id" element={<EditEntry />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
