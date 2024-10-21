from mongoDb import mongoDb
from objects import *
import pytest
import utils
from AppConfig import AppConfig

db = mongoDb()

def createUserObject(userId, email='test@gmail.com', roles=[]):
    return {
        '_id': userId,
        '_version': 0,
        'roles': roles,
        'createdAt': datetime.datetime.now(),
        'isApproved': True,
        'email': email,
        'displayName': 'testDisplayName',
    }

userObject = createUserObject(None, 'superAdmin@gmail.com',
                              Roles().getAllRoleNames())

userObject2 = createUserObject(None, 'user@gmail.com', ['user'])

offenseObject = {
    '_id': None,
    'number': 0,
    'description': 'description',
    'remedialActions': ['Verbal Warning', 'Written Warning', 'Suspension', 'Termination'],
    '_version': 0
}

employeeObject = {
    '_id': None,
    'name': 'name',
    'email': 'email',
    'address': 'address',
    'phoneNumber': 'phone',
    'photoOfPerson': 'photoOfPerson',
    'resumePhotosList': ['resumePhotosList'],
    'biodataPhotosList': ['biodataPhotosList'],
    'dateJoined': datetime.datetime.now(),
    'company': 'Pustanan',
    'isRegular': True,
    'isProductionEmployee': True,
    'dailyWage': None,
    '_version': 0
}

memoObject = {
    '_id': None,
    'mediaList': ['mediaList'],
    'Employee': employeeObject,
    'memoPhotosList': ['memoPhotosList'],
    'subject': 'subject',
    'MemoCode': offenseObject,
    'submitted': False,
    'description': 'description',
    'date': datetime.datetime.now(),
    'reason': 'reason',
    '_version': 0
}

def test_user_login():
    try:
        db.delete({},'User')
        user = UserActions(userObject)
        userCreated = user.createFirstUserAction('id1')

        firstUser = db.read({'_id':userCreated['_id']},'User',findOne=True)

        assert firstUser['email'] == userCreated['email']
    finally:
        db.delete({},'User')
        pass

def test_add_role_and_remove_role():
    try:
        user = UserActions(userObject)
        userCreated = user.createFirstUserAction('id2')

        users = user.readCollection('User')

        assert len(users) == 1

        addRole = user.addRoleAction(users[0], 'Memo', 'canCreateMemo')

        assert addRole[0]['roles'][1] == 'canCreateMemo'
        userWithRole = db.read({'_id':users[0]['_id']},'User',findOne=True)
        assert 'canCreateMemo' in userWithRole['roles']

        user = UserActions(userObject2)
        userCreated = user.createUserAction('id3')

        users = user.readCollection('User')

        assert len(users) == 2

        removeRole = user.removeRoleAction(users[1],'Memo', 'canCreateMemo')

        assert len(removeRole[0]['roles']) == 0
        user = db.read({'_id':users[1]['_id']},'User',findOne=True)
        assert 'user' not in user['roles']
    finally:
        db.delete({},'User')
        pass

def test_create_offense_employee_memo():
    try:
        user = UserActions(userObject)
        userCreated = user.createUserAction('id4')

        offense = user.createOffenseAction(offenseObject)

        offenses = user.readCollection('Offense')

        assert offense['number'] == offenses[0]['number']

        getOffense = db.read({'_id':offenses[0]['_id']},'Offense',findOne=True)

        assert getOffense['remedialActions'][0] == offense['remedialActions'][0]

        # create employee
        employee = user.createEmployeeAction(employeeObject)

        employees = user.readCollection('Employee')

        getEmployee = db.read({'_id':employees[0]['_id']},'Employee',findOne=True)

        assert getEmployee['name'] == employee['name']

        # create memo
        memo = user.createMemoAction(memoObject)

        memos = user.readCollection('Memo')

        getMemo = db.read({'_id':memos[0]['_id']},'Memo',findOne=True)

        assert getMemo['subject'] == memo['subject']

        # create another memo
        memo2 = user.createMemoAction(memoObject)

        memos = user.readCollection('Memo')

        # create another memo then submit it
        memo3 = user.createMemoAction(memoObject)

        reason = 'Reason for submission'

        submitMemo = user.submitMemoAction(memo3, reason)

        getMemo = db.read({'_id':submitMemo[0]['_id']},'Memo',findOne=True)

        assert getMemo['submitted'] == True

        memos = user.readCollection('Memo')

        memo4 = user.createMemoAction(memoObject)

        reason = 'Reason for submission'

        submitMemo = user.submitMemoAction(memo4, reason)

        getMemo = db.read({'_id':submitMemo[0]['_id']},'Memo',findOne=True)

        assert getMemo['submitted'] == True

        memos = user.readCollection('Memo')

        assert len(memos) == 4

    finally:
        db.delete({},'User')
        db.delete({},'Offense')
        db.delete({},'Employee')
        db.delete({},'Memo')
        pass

def test_update_offense():
    try:
        user = UserActions(userObject)
        userCreated = user.createUserAction('id5')

        offense = user.createOffenseAction(offenseObject)

        getOffense = db.read({'_id':offense['_id']},'Offense',findOne=True)

        assert getOffense['number'] == offense['number']

        updateOffense = user.updateOffenseAction(offense, {'number':'number2'})

        getOffense = db.read({'_id':updateOffense[0]['_id']},'Offense',findOne=True)

        assert getOffense['number'] == 'number2'
    finally:
        db.delete({},'User')
        db.delete({},'Offense')
        pass

def test_delete_offense():
    try:
        user = UserActions(userObject)
        userCreated = user.createUserAction('id6')

        offense = user.createOffenseAction(offenseObject)

        getOffense = db.read({'_id':offense['_id']},'Offense',findOne=True)

        assert getOffense['number'] == offense['number']

        deleteOffense = user.deleteOffenseAction(getOffense)

        offenses = user.readCollection('Offense')

        assert len(offenses) == 0
    finally:
        db.delete({},'User')
        db.delete({},'Offense')
        pass

def test_update_employee():
    try:
        user = UserActions(userObject)
        userCreated = user.createUserAction('id7')

        employee = user.createEmployeeAction(employeeObject)

        getEmployee = db.read({'_id':employee['_id']},'Employee',findOne=True)

        assert getEmployee['name'] == employee['name']

        updateEmployee = user.updateEmployeeAction(employee, {'name':'name2'})

        getEmployee = db.read({'_id':updateEmployee[0]['_id']},'Employee',findOne=True)

        assert getEmployee['name'] == 'name2'
    finally:
        db.delete({},'User')
        db.delete({},'Employee')
        pass

def test_submit_and_delete_memo():
    try:
        user = UserActions(userObject)
        userCreated = user.createUserAction('id8')

        memo = user.createMemoAction(memoObject)

        getMemo = db.read({'_id':memo['_id']},'Memo',findOne=True)

        assert getMemo['subject'] == memo['subject']

        reason = 'Reason for submission'

        submitMemo = user.submitMemoAction(memo, reason)

        getMemo = db.read({'_id':submitMemo[0]['_id']},'Memo',findOne=True)

        assert getMemo['submitted'] == True

        with pytest.raises(ValueError, match='Memo has already been submitted'):
            deleteMemo = user.deleteMemoAction(getMemo)

        memo2 = user.createMemoAction(memoObject)

        getMemo2 = db.read({'_id':memo2['_id']},'Memo',findOne=True)

        assert getMemo2['subject'] == memo2['subject']

        deleteMemo = user.deleteMemoAction(getMemo2)

        memos = user.readCollection('Memo')

        assert len(memos) == 1

    finally:
        db.delete({},'User')
        db.delete({},'Memo')
        pass

if __name__ == '__main__':
    if AppConfig().getIsProductionEnvironment():
        raise ValueError('Not to be run in cloud production environment')
    test_user_login()
    test_add_role_and_remove_role()
    test_create_offense_employee_memo()
    test_update_offense()
    test_delete_offense()
    test_update_employee()
    test_submit_and_delete_memo()
    pass
