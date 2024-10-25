from mongoDb import mongoDb
from dateutil import parser
import datetime
from utils import *
import re
db = mongoDb()

class Roles:
    def __init__(self):
        self.roles = {
        'User' : {
            'canUpdateUser' :{
                'description':'can update a user'
            }
        },
        'Memo' : {
            'canDeleteMemo' :{
                'description':'can delete a memo'
            },
            'canSubmitMemo' :{
                'description':'can submit a memo'
            },
            'canCreateMemo' :{
                'description':'can create a memo'
            },
        },
        'Employee' : {
            'canCreateEmployee' :{
                'description':'can create an employee'
            },
            'canUpdateEmployee' :{
                'description':'can update an employee'
            },
        },
        'Offense' : {
            'canCreateOffense' :{
                'description':'can create an offense'
            },
            'canDeleteOffense' :{
                'description':'can delete an offense'
            },
            'canUpdateOffense' :{
                'description':'can update an offense'
            },
        }
    }

    def getAllRoles(self):
        return self.roles
    
    def getAllRolesWithPermissions(self):
        user_permissions = {}

        for role, permissions in self.roles.items():
            user_permissions[role] = []
            for permission in permissions:
                user_permissions[role].append(permission)

        return user_permissions
    
    def getAllRolesWithoutPermissions(self):
        user_permissions = {}

        for role, permissions in self.roles.items():
            user_permissions[role] = []

        return user_permissions
class User:
    def __init__(self, data):

        if not isinstance(data['createdAt'], datetime.datetime):
            transformedDate = transformDate(data['createdAt'])
            data['createdAt'] = transformDate(data['createdAt'])

        validateParameterData(
            data, {
                '_id': (str, type(None)),
                'createdAt': datetime.datetime,
                'isApproved': bool,
                'displayName': str,
                'email': str,
                'roles': list,
                '_version': int
            }, self.__class__.__name__)

        self._id = getDictionaryOrObjectValue(data, '_id')
        self.createdAt = getDictionaryOrObjectValue(data, 'createdAt')
        self.isApproved = getDictionaryOrObjectValue(data, 'isApproved')
        self.displayName = getDictionaryOrObjectValue(data, 'displayName')
        self.email = self.validate_email(getDictionaryOrObjectValue(data, 'email'))
        self.roles = getDictionaryOrObjectValue(data, 'roles') if getDictionaryOrObjectValue(data, 'roles') else ['user']
        self._version = getDictionaryOrObjectValue(data, '_version')

    def to_dict(self):
        return {
            '_id': self._id,
            'createdAt': self.createdAt,
            'isApproved': self.isApproved,
            'displayName': self.displayName,
            'email': self.email,
            'roles': self.roles,
            '_version': self._version
        }

    # # create a function to create a user
    # def createUser(self):
    #     existing_user = db.read({'email': self.email}, 'User')
    #     if existing_user and self._id != None:
    #         raise ValueError('User already exists')
    #     else:
    #         self._id = generateRandomString()
    #         if len(db.read({}, 'User')) == 0:
    #             self.roles = Roles().getAllRoleNames()
    #         else:
    #             self.roles = ['user']
    #         return self.to_dict()
    # def userLogin(self):
    #     existing_user = db.read({'email': self.email}, 'User', findOne=True)
    #     if existing_user:
    #         if existing_user['password'] == self.password:
    #             return existing_user
    #         else:
    #             raise ValueError('Incorrect password')
    #     else:
    #         raise ValueError('User does not exist')


    def createFirstUser(self, firebaseUserUid):
        if self._id != None:
            raise ValueError('Cannot create User with an existing _id')

        users = db.read({}, 'User')
        if len(users) > 0:
            raise ValueError(
                'Cannot create first user. First user already exist in the system.'
            )

        self._version = 0

        data = {
            '_id': firebaseUserUid,
            '_version': self._version,
            'roles': Roles().getAllRolesWithPermissions(),
            'createdAt': datetime.datetime.now(datetime.timezone.utc),
            'isApproved': self.isApproved,
            'displayName': self.displayName,
            'email': self.email
        }

        return data

    def createUser(self, firebaseUserUid):
        if self._id != None:
            raise ValueError('Cannot create User with an existing _id')

        user = db.read({'email': self.email}, 'Users')
        if len(user) > 0:
            raise ValueError('User already exists')

        self._version = 0

        data = {
            '_id': firebaseUserUid,
            '_version': self._version,
            'roles': Roles().getAllRolesWithoutPermissions(),
            'createdAt': datetime.datetime.now(datetime.timezone.utc),
            'isApproved': self.isApproved,
            'displayName': self.displayName,
            'email': self.email,
        }

        return data

    # create a function that will add a role to a user
    def addRole(self, user, category, roleToAdd):
        if roleToAdd not in Roles().getAllRoles()[category]:
            raise ValueError(f'Role does not exist in category ')
        
        if roleToAdd in user['roles'][category]:
            raise ValueError(f'Role already exists')

        user['roles'][category].append(roleToAdd)
        print(f"Added role {roleToAdd} to category {category}")

        return user


    # create a function that will remove a role from a user
    def removeRole(self, user, category, roleToRemove):
        if roleToRemove not in user['roles'][category]:
            raise ValueError(f'Role does not exist in category')

        user['roles'][category].remove(roleToRemove)
        print(f"Removed role {roleToRemove} from category {category}")

        return user

    def validate_email(self, email):
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(pattern, email):
            raise ValueError("Invalid email format.")
        return email

class UserActions(User):
    def __init__(self, data):
        super().__init__(data)

    def createFirstUserAction(self, firebaseUserUid):
        user = self.createFirstUser(firebaseUserUid)
        data = db.create(user, 'User')
        return data

    def createUserAction(self, firebaseUserUid):
        user = self.createUser(firebaseUserUid)
        data = db.create(user, 'User')
        return data

    def addRoleAction(self, userToEdit, category, roleToAdd):
        user = db.read({'_id': userToEdit['_id']}, 'User')
        if len(user) == 0:
            raise ValueError('User does not exist')

        data = self.addRole(user[0], category, roleToAdd)
        data = db.update({'_id': data['_id'], '_version': data['_version']}, {'roles': data['roles']}, 'User')
        return data


    def removeRoleAction(self, userToEdit, category, roleToRemove):
        user = db.read({'_id': userToEdit['_id']}, 'User')
        if len(user) == 0:
            raise ValueError('User does not exist')

        data = self.removeRole(user[0], category, roleToRemove)
        data = db.update({'_id': data['_id'], '_version': data['_version']}, {'roles': data['roles']}, 'User')
        return data

    def readCollection(self, collection_name):
        return db.read({}, collection_name)

    def createEmployeeAction(self, user, data):
        employee = Employee(data)
        res = employee.createEmployee(user)
        return db.create(res, 'Employee')

    def updateEmployeeAction(self, user, data, dataToUpdate):
        employee = Employee(data)
        res = employee.updateEmployee(user, dataToUpdate)
        return db.update({'_id': res['_id']}, res, 'Employee')

    def createOffenseAction(self, user, data):
        offense = Offense(data)
        res = offense.createOffense(user)
        return db.create(res, 'Offense')

    def updateOffenseAction(self, user, data, dataToUpdate):
        offense = Offense(data)
        res = offense.updateOffense( user, dataToUpdate)
        return db.update({'_id': res['_id']}, res, 'Offense')

    def deleteOffenseAction(self, user, data):
        offense = Offense(data)
        res = offense.deleteOffense(user)
        return db.delete(res, 'Offense')

    def createMemoAction(self, user, data):
        memo = Memo(data)
        res = memo.createMemo(user)
        return db.create(res, 'Memo')

    def deleteMemoAction(self, user, data):
        memo = Memo(data)
        res = memo.deleteMemo(user)
        return db.delete(res, 'Memo')

    def submitMemoAction(self, user, data, reason):
        memo = Memo(data)
        res = memo.submitMemo(user, reason)
        return db.update({'_id': res['_id']}, res, 'Memo')


class Memo:
    def __init__(self, data):
        if not isinstance(data['Employee'], Employee):
            data['Employee'] = Employee(data['Employee'])

        if not isinstance(data['MemoCode'], Offense):
            data['MemoCode'] = Offense(data['MemoCode'])

        validateParameterData(
            data, {
                'date': datetime.datetime,
                'mediaList': list,
                'Employee': Employee,
                'memoPhotosList': list,
                'subject': str,
                'description': str,
                '_id': (str, type(None)),
                'MemoCode': Offense,
                'submitted': bool,
                'reason': (str, type(None)),
                '_version': int
            } , self.__class__.__name__
        )

        self._id = data['_id']
        self.date = data['date']
        self.mediaList = data['mediaList']
        self.Employee = data['Employee']
        self.memoPhotosList = data['memoPhotosList']
        self.subject = data['subject']
        self.description = data['description']
        self.MemoCode = data['MemoCode']
        self.submitted = data['submitted']
        self.reason = data['reason']
        self._version = data['_version']

    def to_dict(self):
        return {
            '_id': self._id,
            'date': self.date,
            'mediaList': self.mediaList,
            'Employee': self.Employee.to_dict(),
            'memoPhotosList': self.memoPhotosList,
            'subject': self.subject,
            'description': self.description,
            'MemoCode': self.MemoCode.to_dict(),
            'submitted': self.submitted,
            'reason': self.reason,
            '_version': self._version
        }

    def _countPastOffenses(self,employeeId, offenseId):
        employeeMemos = db.read({'Employee._id': employeeId, 'submitted': True}, 'Memo')

        specificOffenseMemos = [memo for memo in employeeMemos if memo['MemoCode']['_id'] == offenseId]

        return len(specificOffenseMemos)

    def createMemo(self, user):
        if 'canCreateMemo' not in user['roles']['Memo']:
            raise ValueError('User does not have permission to create a memo')

        pastOffenses = self._countPastOffenses(self.Employee._id, self.MemoCode._id)

        self.MemoCode.number = pastOffenses

        self._id = generateRandomString()
        self.submitted = False
        return self.to_dict()

    def deleteMemo(self, user):
        if 'canDeleteMemo' not in user['roles']['Memo']:
            raise ValueError('User does not have permission to delete a memo')
        if self.submitted:
            raise ValueError('Memo has already been submitted')

        return self.to_dict()

    def submitMemo(self, user,reason):
        if 'canSubmitMemo' not in user['roles']['Memo']:
            raise ValueError('User does not have permission to submit a memo')
        if self.submitted:
            raise ValueError('Memo has already been submitted')
        if reason == None:
            raise ValueError('Reason must be provided')
        if len(self.memoPhotosList) == 0:
            raise ValueError('Memo must have at least one photo')
        
        pastOffenses = self._countPastOffenses(self.Employee._id, self.MemoCode._id)

        self.MemoCode.number = pastOffenses + 1

        self.reason = reason
        self.submitted = True
        return self.to_dict()
        pass

class Employee:
    def __init__(self, data):
        validateParameterData(
            data, {
                '_id': (str, type(None)),
                'name': str,
                'address': (str, type(None)),
                'phoneNumber': (str, type(None)),
                'photoOfPerson': str,
                'resumePhotosList': list,
                'biodataPhotosList': list,
                'email': (str, type(None)),
                'dateJoined': (datetime.datetime, type(None)),
                'company': str,
                'isRegular': bool,
                'isProductionEmployee': bool,
                'dailyWage': (float, type(None)),
                '_version': int
            }, self.__class__.__name__
        )

        self._id = data['_id']
        self.name = data['name']
        self.address = data['address']
        self.phoneNumber = data['phoneNumber']
        self.photoOfPerson = data['photoOfPerson']
        self.resumePhotosList = data['resumePhotosList']
        self.biodataPhotosList = data['biodataPhotosList']
        self.email = data['email']
        self.dateJoined = data['dateJoined']
        self.company = data['company']
        self.isRegular = data['isRegular']
        self.isProductionEmployee = data['isProductionEmployee']
        self.dailyWage = data['dailyWage']
        self._version = data['_version']

    def to_dict(self):
        return {
            '_id': self._id,
            'name': self.name,
            'address': self.address,
            'phoneNumber': self.phoneNumber,
            'photoOfPerson': self.photoOfPerson,
            'resumePhotosList': self.resumePhotosList,
            'biodataPhotosList': self.biodataPhotosList,
            'email': self.email,
            'dateJoined': self.dateJoined,
            'company': self.company,
            'isRegular': self.isRegular,
            'isProductionEmployee': self.isProductionEmployee,
            'dailyWage': self.dailyWage,
            '_version': self._version
        }

    def createEmployee(self, user):
        if 'canCreateEmployee' not in user['roles']['Employee']:
            raise ValueError('User does not have permission to create an employee')
        self._id = generateRandomString()
        return self.to_dict()

    def updateEmployee(self, user, dataToUpdate):
        if 'canUpdateEmployee' not in user['roles']['Employee']:
            raise ValueError('User does not have permission to update an employee')
        
        newData = updateData(self.to_dict(), dataToUpdate, ['_id'])
        return newData
    pass

class Offense:
    def __init__(self, data):
        validateParameterData(
            data, {
                '_id': (str, type(None)),
                'number': int,
                'description': str,
                'remedialActions': list,
                '_version': int
            } , self.__class__.__name__
        )

        self._id = data['_id']
        self.number = data['number']
        self.description = data['description']
        self.remedialActions = data['remedialActions']
        self._version = data['_version']

    def to_dict(self):
        return {
            '_id': self._id,
            'number': self.number,
            'description': self.description,
            'remedialActions': self.remedialActions,
            '_version': self._version
        }

    def createOffense(self, user):
        if 'canCreateOffense' not in user['roles']['Offense']:
            raise ValueError('User does not have permission to create an offense')
        self._id = generateRandomString()
        return self.to_dict()

    def updateOffense(self, user, dataToUpdate):
        if 'canUpdateOffense' not in user['roles']['Offense']:
            raise ValueError('User does not have permission to update an offense')

        newData = updateData(self.to_dict(), dataToUpdate, ['_id'])
        return newData

    def deleteOffense(self, user):
        if 'canDeleteOffense' not in user['roles']['Offense']:
            raise ValueError('User does not have permission to delete an offense')

        offense = db.read({'_id': self._id}, 'Offense')
        if len(offense) == 0:
            raise ValueError('Offense does not exist')

        return self.to_dict()