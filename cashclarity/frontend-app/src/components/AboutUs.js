import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AboutUs = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">About Us</h1>
      
      <Card className="mb-4">
        <Card.Body>
          <h5>What is Cash Clarity App?</h5>
          <p>
          Cash Clarity App is a user-friendly application designed to help you manage your finances effectively. 
            With our app, you can easily track your income and expenses, gain insights into your spending habits, 
            and make informed financial decisions.
          </p>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <h5>How is this app useful?</h5>
          <p>
            This app provides a comprehensive overview of your financial situation. 
            By recording your transactions, you can:
          </p>
          <ul>
            <li>Monitor your spending habits</li>
            <li>Set budget goals and track your progress</li>
            <li>Analyze your income and expenses</li>
            <li>Make informed financial decisions for a secure future</li>
          </ul>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <h5>How to Use the App</h5>
          <p>
            Using the Personal Finance Tracker is simple:
          </p>
          <ol>
            <li><strong>Create an Account:</strong> Sign up with your email to start tracking your finances.</li>
            <li><strong>Add Entries:</strong> Use the 'Add Entry' feature to record your income and expenses.</li>
            <li><strong>View Your Dashboard:</strong> Get insights into your financial status at a glance.</li>
            <li><strong>Explore the Entry List:</strong> Review all your recorded transactions.</li>
            <li><strong>Edit or Delete Entries:</strong> Easily modify your entries whenever necessary.</li>
          </ol>
        </Card.Body>
      </Card>

      {!isAuthenticated && (
        <div className="text-center">
          <Button variant="primary" onClick={() => navigate('/register')}>
            Get Started
          </Button>
        </div>
      )}
    </Container>
  );
};

export default AboutUs;
