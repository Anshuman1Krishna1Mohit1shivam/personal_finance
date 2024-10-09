# # models.py
# from flask_sqlalchemy import SQLAlchemy
# from datetime import datetime
#
# db = SQLAlchemy()
#
# class FinancialEntry(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, nullable=False)
#     date = db.Column(db.DateTime, nullable=False)
#     amount = db.Column(db.Float, nullable=False)
#     category = db.Column(db.String(50), nullable=False)
#     description = db.Column(db.String(200), nullable=True)
#     type = db.Column(db.String(10), nullable=False)
#
#     def to_dict(self):
#         return {
#             "id": self.id,
#             "user_id": self.user_id,
#             "date": self.date.strftime("%Y-%m-%d %H:%M:%S"),
#             "amount": self.amount,
#             "category": self.category,
#             "description": self.description,
#             "type": self.type
#         }
