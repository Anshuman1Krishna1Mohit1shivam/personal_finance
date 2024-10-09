import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { getDashboardData } from '../services/api'; // Adjust the import path as needed
import { FaDollarSign, FaRegChartBar } from 'react-icons/fa';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        total_income: 0,
        total_expenses: 0,
        recent_transactions: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const data = await getDashboardData();
                setDashboardData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="text-center">
                <Spinner animation="border" variant="primary" />
                <h5>Loading Dashboard...</h5>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger">
                <Alert.Heading>Error!</Alert.Heading>
                <p>{error}</p>
            </Alert>
        );
    }

    return (
        <div className="container">
            <h1 className="mb-4 text-center">Dashboard</h1>
            <Row>
                <Col md={6} className="mb-3">
                    <Card className="bg-success text-white">
                        <Card.Body>
                            <Card.Title><FaDollarSign /> Total Income</Card.Title>
                            <Card.Text className="h4">
                            ₹{dashboardData.total_income.toFixed(2)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-3">
                    <Card className="bg-danger text-white">
                        <Card.Body>
                            <Card.Title><FaRegChartBar /> Total Expenses</Card.Title>
                            <Card.Text className="h4">
                            ₹{dashboardData.total_expenses.toFixed(2)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Recent Transactions</Card.Title>
                            {dashboardData.recent_transactions.length > 0 ? (
                                <ul className="list-unstyled">
                                    {dashboardData.recent_transactions.map(transaction => (
                                        <li key={transaction.id} className="mb-2">
                                            <span className="font-weight-bold">{transaction.description}</span> - 
                                            <span className="text-success"> ₹{transaction.amount.toFixed(2)}</span> on 
                                            <span className="text-muted"> {new Date(transaction.date).toLocaleDateString()}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No recent transactions available.</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
