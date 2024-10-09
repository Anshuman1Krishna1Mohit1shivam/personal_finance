import unittest
import json
from flask import Flask
from flask_restful import Api
from app import app


class FinancialEntriesAPITestCase(unittest.TestCase):
    def setUp(self):
        #  Flask application Set up for testing
        self.app = app
        self.client = self.app.test_client()
        self.app.testing = True

        # Sample data for testing
        self.new_entry = {
            "user_id": 1,
            "date": "2024-09-01 10:00:00",
            "amount": 1500.0,
            "category": "Income",
            "description": "Salary for September",
            "type": "income"
        }

    def test_get_all_entries(self):
        response = self.client.get('/entries')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(json.loads(response.data), list)

    def test_create_entry(self):
        response = self.client.post('/entries', json=self.new_entry)
        self.assertEqual(response.status_code, 201)
        self.assertIn("id", json.loads(response.data))

    def test_get_entry(self):
        # First, create an entry
        create_response = self.client.post('/entries', json=self.new_entry)
        entry_id = json.loads(create_response.data)["id"]

        # Now, get that entry
        response = self.client.get(f'/entries/{entry_id}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data)["id"], entry_id)

    def test_get_nonexistent_entry(self):
        response = self.client.get('/entries/999')  # Assuming 999 does not exist
        self.assertEqual(response.status_code, 404)
        self.assertIn("Entry not found", json.loads(response.data)["message"])

    def test_update_entry(self):
        # Create an entry
        create_response = self.client.post('/entries', json=self.new_entry)
        entry_id = json.loads(create_response.data)["id"]

        # Update that entry
        updated_entry = {
            "user_id": 1,
            "date": "2024-09-01 10:00:00",
            "amount": 1000,
            "category": "Income",
            "description": "Updated salary",
            "type": "income"
        }
        response = self.client.put(f'/entries/{entry_id}', json=updated_entry)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data)["amount"], 1600.0)

    def test_delete_entry(self):
        # Create an entry
        create_response = self.client.post('/entries', json=self.new_entry)
        entry_id = json.loads(create_response.data)["id"]

        # Delete that entry
        response = self.client.delete(f'/entries/{entry_id}')
        self.assertEqual(response.status_code, 204)

        # Check that the entry is deleted
        response = self.client.get(f'/entries/{entry_id}')
        self.assertEqual(response.status_code, 404)

if __name__ == '__main__':
    unittest.main()
