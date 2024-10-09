from flask_restful import Resource
from flask import request
from datetime import datetime
import json

# Sample data for financial entries
financial_entries = [
    {"id": 1, "user_id": 1, "date": "2024-09-01 10:00:00", "amount": 1500.00, "category": "Income",
     "description": "Salary for September", "type": "income"},
    {"id": 2, "user_id": 2, "date": "2024-09-05 10:00:00", "amount": 50.00, "category": "Groceries",
     "description": "Weekly grocery shopping", "type": "expense"}
]


class FinancialEntriesGETResource(Resource):
    def get(self):
        return financial_entries


class FinancialEntryGETResource(Resource):
    def get(self, entry_id):
        # Ensure entry_id is an integer
        try:
            entry_id = int(entry_id)
        except ValueError:
            return {"message": "Invalid ID format. ID must be an integer."}, 400

        for entry in financial_entries:
            if entry["id"] == entry_id:
                return entry
        return {"message": "Entry not found"}, 404


class FinancialEntryPOSTResource(Resource):
    def post(self):
        data = request.get_json()
        required_fields = ["user_id", "date", "amount", "category", "type"]

        # Validate required fields
        if not all(field in data for field in required_fields):
            return {"message": "Missing required fields"}, 400

        # Validate date format
        try:
            datetime.strptime(data["date"], "%Y-%m-%d %H:%M:%S")  # Check for correct format
        except ValueError:
            return {"message": "Invalid date format, use 'YYYY-MM-DD HH:MM:SS'"}, 400

        # Convert amount to float
        try:
            amount = float(data["amount"])  # Ensure amount is a float
        except ValueError:
            return {"message": "Invalid amount format, must be a number"}, 400

        new_id = max(entry["id"] for entry in financial_entries) + 1
        new_entry = {
            "id": new_id,
            "user_id": data["user_id"],
            "date": data["date"],
            "amount": amount,  # Use the converted float
            "category": data["category"],
            "description": data.get("description", ""),
            "type": data["type"]
        }
        financial_entries.append(new_entry)
        return new_entry, 201



class FinancialEntryPUTResource(Resource):
    def put(self, entry_id):
        data = json.loads(request.data)
        for entry in financial_entries:
            if entry["id"] == entry_id:
                entry.update(data)
                return entry
        return {"message": "Entry not found"}, 404


class FinancialEntryDELETEResource(Resource):
    def delete(self, entry_id):
        global financial_entries
        financial_entries = [entry for entry in financial_entries if entry["id"] != entry_id]
        return "", 204


class DashboardResource(Resource):
    def get(self):
        total_income = sum(float(entry["amount"]) for entry in financial_entries if entry["type"] == "income")
        total_expenses = sum(float(entry["amount"]) for entry in financial_entries if entry["type"] == "expense")

        # Get the recent transactions (for example, the last 5)
        recent_transactions = financial_entries[-5:]

        return {
            "total_income": total_income,
            "total_expenses": total_expenses,
            "recent_transactions": recent_transactions
        }
