from flask import Flask, request, jsonify
from flask_cors import CORS
from objects import *
from mongoDb import mongoDb
from dateutil import parser
from AppConfig import AppConfig
import logging
from firebaseAuthenticator import firebaseAuthenticator

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
db = mongoDb()

# Configure logging
logging.basicConfig(level=logging.INFO)

@app.route('/getIsDevEnvironment', methods=['GET'])
def get_is_dev_environment():

    devEnvironment = AppConfig().getIsDevEnvironment()
    return jsonify({"isDevEnvironment": devEnvironment}), 200


@app.route('/getEnvironment', methods=['GET'])
def get_environment():
    environment = AppConfig().getEnvironment()
    return jsonify({
        "message": "Data read successfully",
        "data": environment
    }), 200

@app.route('/deleteAllDataInCollection', methods=['POST'])
def delete_all_data_in_collection():
    if request.is_json:

        if not AppConfig().getIsDevEnvironment():
            return jsonify({"error": "This endpoint is only available in Dev Environment"}), 400

        data = request.get_json()

        print(data)
        collection = data['collection']

        try:
            res = db.delete({}, collection)
            return jsonify({'message': 'Data deleted successfully!', 'data': res}), 200
        except Exception as e:
            logging.exception("Error deleting data: %s", e)
            return e.args[0], 400

@app.route('/firebaseLogin', methods=['POST'])
def firebase_login():
    if request.is_json:
        data = request.get_json()
        userObject = data['userObject']
        try:
            user = firebaseAuthenticator(userObject).login()
        except Exception as e:
            logging.exception("Error logging in: %s", e)
            return e.args[0], 400

        return jsonify({
            "message": "User logged in successfully",
            "data": user
        }), 200


# @app.route('/createUser', methods=['POST'])
# def create_user():
#     if request.is_json:
#         data = request.get_json()

#         try:
#             res = UserActions({
#                 '_id': None,
#                 'password': data['password'],
#                 'email': data['email'],
#                 'phone': data['phone'],
#                 'roles': [],
#                 '_version': 0}
#             ).createUserAction()

#             return jsonify({'message': 'User created successfully!', 'data': res}), 200
#         except Exception as e:
#             logging.exception("Error processing User: %s", e)
#             return e.args[0], 400

#     else:
#         return jsonify({"error": "Request must be JSON"}), 400
    
# @app.route('/userLogin', methods=['POST'])
# def user_login():
#     if request.is_json:
#         data = request.get_json()

#         if 'email' not in data or 'password' not in data:
#             return jsonify({"error": "Email and password are required"}), 400

#         try:
#             res = UserActions({
#                 'email': data['email'],
#                 'password': data['password']}
#             ).userLoginAction()

#             if res:
#                 return jsonify({'message': 'User logged in successfully!', 'data': res}), 200
#             else:
#                 return jsonify({"error": "Invalid email or password"}), 401

#         except Exception as e:
#             logging.exception("Error processing User: %s", e)
#             return jsonify({"error": str(e)}), 400

#     else:
#         return jsonify({"error": "Request must be JSON"}), 400
    
@app.route('/createEmployee', methods=['POST'])
def create_employee():
    if request.is_json:
        employeeData = request.get_json()
        userData = employeeData['userData']
        data = employeeData['employee']

        try:
            res = UserActions(
                userData
            ).createEmployeeAction({
                '_id': None,
                'name': data['name'],
                'address': data['address'],
                'phoneNumber': data['phoneNumber'],
                'photoOfPerson': data['photoOfPerson'],
                'resumePhotosList': data['resumePhotosList'],
                'biodataPhotosList': data,
                'email': data['email'],
                'dateJoined': data,
                'company': data['company'],
                'isRegular': data['isRegular'],
                'isProductionEmployee': data['isProductionEmployee'],
                'dailyWage': data['dailyWage'],
                '_version': 0
            })

            return jsonify({'message': 'Employee created successfully!', 'data': res}), 200
        except Exception as e:
            logging.exception("Error processing Employee: %s", e)
            return e.args[0], 400

    else:
        return jsonify({"error": "Request must be JSON"}), 400
    
@app.route('/updateEmployee', methods=['POST'])
def update_employee():
    if request.is_json:
        data = request.get_json()
        userData = data['userData']
        
        employeeData = data['employeeData']
        dataToUpdate = data['dataToUpdate']
        try:
            res = UserActions(
                userData
            ).updateEmployeeAction(employeeData, dataToUpdate)

            return jsonify({'message': 'Employee updated successfully!', 'data': res}), 200
        except Exception as e:
            logging.exception("Error processing Employee: %s", e)
            return e.args[0], 400

    else:
        return jsonify({"error": "Request must be JSON"}), 400

@app.route('/createOffense', methods=['POST'])
def create_offense():
    if request.is_json:
        data = request.get_json()
        userData = data['userData']

        try:
            res = UserActions(
                userData
            ).createOffenseAction({
                '_id': None,
                'offense': data['offense'],
                'description': data['description'],
                'penalty': data['penalty'],
                '_version': 0
            })

            return jsonify({'message': 'Offense created successfully!', 'data': res}), 200
        except Exception as e:
            logging.exception("Error processing Offense: %s", e)
            return e.args[0], 400

    else:
        return jsonify({"error": "Request must be JSON"}), 400

@app.route('/updateOffense', methods=['POST'])
def update_offense():
    if request.is_json:
        data = request.get_json()
        userData = data['userData']

        offenseData = data['offenseData']
        dataToUpdate = data['dataToUpdate']
        try:
            res = UserActions(
                userData
            ).updateOffenseAction(offenseData, dataToUpdate)

            return jsonify({'message': 'Offense updated successfully!', 'data': res}), 200
        except Exception as e:
            logging.exception("Error processing Offense: %s", e)
            return e.args[0], 400

    else:
        return jsonify({"error": "Request must be JSON"}), 400

@app.route('/deleteOffense', methods=['POST'])
def delete_offense():
    if request.is_json:
        data = request.get_json()
        userData = data['userData']

        offenseData = data['offenseData']
        try:
            res = UserActions(
                userData
            ).deleteOffenseAction(offenseData)

            return jsonify({'message': 'Offense deleted successfully!', 'data': res}), 200
        except Exception as e:
            logging.exception("Error processing Offense: %s", e)
            return e.args[0], 400

    else:
        return jsonify({"error": "Request must be JSON"}), 400

@app.route('/createMemo', methods=['POST'])
def create_memo():
    if request.is_json:
        data = request.get_json()
        userData = data['userData']

        try:
            res = UserActions(
                userData
            ).createMemoAction({
                'date': data['date'],
                'mediaList': data['mediaList'],
                'Employee': data['Employee'],
                'memoPhotosList': data['memoPhotosList'],
                'subject': data['subject'],
                'description': data['description'],
                '_id': None,
                'MemoCode': data['MemoCode'],
                'submitted': data['submitted'],
                'reason': data['reason'],
                '_version': 0
            })

            return jsonify({'message': 'Memo created successfully!', 'data': res}), 200
        except Exception as e:
            logging.exception("Error processing Memo: %s", e)
            return e.args[0], 400

    else:
        return jsonify({"error": "Request must be JSON"}), 400

@app.route('/submitMemo', methods=['POST'])
def submit_memo():
    if request.is_json:
        data = request.get_json()
        userData = data['userData']

        memoData = data['memoData']
        reason = data['reason']
        try:
            res = UserActions(
                userData
            ).submitMemoAction(memoData, reason)

            return jsonify({'message': 'Memo submitted successfully!', 'data': res}), 200
        except Exception as e:
            logging.exception("Error processing Memo: %s", e)
            return e.args[0], 400

    else:
        return jsonify({"error": "Request must be JSON"}), 400
    
@app.route('/deleteMemo', methods=['POST'])
def delete_memo():
    if request.is_json:
        data = request.get_json()
        userData = data['userData']

        memoData = data['memoData']
        try:
            res = UserActions(
                userData
            ).deleteMemoAction(memoData)

            return jsonify({'message': 'Memo deleted successfully!', 'data': res}), 200
        except Exception as e:
            logging.exception("Error processing Memo: %s", e)
            return e.args[0], 400

    else:
        return jsonify({"error": "Request must be JSON"}), 400
    
    
@app.route('/getUserForTesting', methods=['GET'])
def getUserForTesting():
    if AppConfig().getisLocalEnvironment(): 
        try:
            print(Roles().getAllRolesWithPermissions())

            user = UserActions({
                '_id': None,
                'roles': [],
                'createdAt': datetime.datetime.now(datetime.timezone.utc),
                'isApproved': True,
                'displayName': 'TesTUseRnAme',
                'email':'test@email.com', 
                '_version': 0
            })
            
            userData = user.createFirstUserAction('testUserId')

            return jsonify({'message': 'Collection deleted successfully!', 'data': userData}), 200
        
        except Exception as e:
            logging.exception("Error processing Memo: %s", e)
            return e.args[0], 400

    else:
        return jsonify({"error": "Env is not in Local"}), 400
    

if __name__ == '__main__':
    if (AppConfig().getIsDevEnvironment()):
        print(
            f"\033[92m_______________________{AppConfig().getEnvironment().upper()}_______________________\033[0m"
        )
    if AppConfig().getIsProductionEnvironment():
        print(
            f"\033[91m_______________________{AppConfig().getEnvironment().upper()}_______________________\033[0m"
        )

    if AppConfig().getisLocalEnvironment():
        # dev
        app.run(debug=False, host='0.0.0.0', port=5000)
    else:
        # production
        app.run(host='0.0.0.0', port=8080)