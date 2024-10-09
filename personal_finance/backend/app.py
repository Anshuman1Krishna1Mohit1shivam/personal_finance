from flask import Flask, jsonify, redirect
from flask_restful import Api, MethodNotAllowed, NotFound
from flask_cors import CORS
from util.common import domain, port, prefix, build_swagger_config_json
from resources.swaggerConfig import SwaggerConfig
# Import your financial entry resources
from resources.finance_resource import (
    FinancialEntriesGETResource,
    FinancialEntryGETResource,
    FinancialEntryPOSTResource,
    FinancialEntryPUTResource,
    FinancialEntryDELETEResource,
    DashboardResource
)
from flask_swagger_ui import get_swaggerui_blueprint

# ============================================
# Main
# ============================================
application = Flask(__name__)
app = application
app.config['PROPAGATE_EXCEPTIONS'] = True
CORS(app)
api = Api(app, prefix=prefix, catch_all_404s=True)

# ============================================
# Swagger
# ============================================
build_swagger_config_json()
swaggerui_blueprint = get_swaggerui_blueprint(
    prefix,
    f'http://{domain}:{port}{prefix}/swagger-config',
    config={
        'app_name': "Finance API",
        "layout": "BaseLayout",
        "docExpansion": "none"
    },
)
app.register_blueprint(swaggerui_blueprint)

# ============================================
# Error Handler
# ============================================

@app.errorhandler(NotFound)
def handle_method_not_found(e):
    response = jsonify({"message": str(e)})
    response.status_code = 404
    return response

@app.errorhandler(MethodNotAllowed)
def handle_method_not_allowed_error(e):
    response = jsonify({"message": str(e)})
    response.status_code = 405
    return response

@app.route('/')
def redirect_to_prefix():
    if prefix != '':
        return redirect(prefix)

# ============================================
# Add Resource
# ============================================
# GET swagger config
api.add_resource(SwaggerConfig, '/swagger-config')

# Financial entry endpoints
api.add_resource(FinancialEntriesGETResource, '/entries')
api.add_resource(FinancialEntryGETResource, '/entries/<int:entry_id>')
api.add_resource(FinancialEntryPOSTResource, '/entries')
api.add_resource(FinancialEntryPUTResource, '/entries/<int:entry_id>')
api.add_resource(FinancialEntryDELETEResource, '/entries/<int:entry_id>')
api.add_resource(DashboardResource, '/dashboard')



if __name__ == '__main__':
    app.run(debug=True)
