from flask_restful import Resource
from flask import request
import json
 
account=[{
    "userId":1,
    "username":"Mohit2002",
    "firstname":"Mohit",
    "lastname":"Kumar Dubey",
    "Total_Expense":3021,
    "description":"Family Dinner on 04/08/2024",
    "Category":"Food"
},{
    "userId":2,
    "username":"Om030802",
    "firstname":"Om",
    "lastname":"",
    "Total_Expense":10712,
    "description":"PG Rent paid",
    "Category":"Rent"
}]
 
 
class accountGetResources(Resource):
    def get(self):
        return account
 
class accountIdGetResources(Resource):
    def get(self, id):
        for acc in account:
            if acc["userId"] == id:
                return acc
        return None
 
 
class addUserPostResources(Resource):
    def post(self):
        acc = json.loads(request.data)
        new_id = max(acc["userId"] for acc in account) + 1
        acc["userId"] = new_id
        account.append(acc)
        return acc
 
 
class addMoneyPUTResource(Resource):
    def put(self, id):
        acc = json.loads(request.data)
        for _acc in account:
            if _acc["userId"] == id:
                _acc.update(acc)
                return _acc
 
 
class userDelResources(Resource):
    def delete(self, id):
        global account
        account = [acc for acc in account if acc["userId"] != id]
        return "", 204