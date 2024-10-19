from mongoDb import mongoDb
from objects import UserActions
import datetime


class firebaseAuthenticator:

    def __init__(self, userObject):
        self.firebaseUserObject = userObject
        self.db = mongoDb()

    def createNewUser(self, firebaseUserObject):
        userObject = {
            '_id': None,
            '_version': 0,
            'roles': [],
            'userSettings': {},
            'access': {},
            'createdAt': datetime.datetime.now(),
            'isApproved': True,
            'email': firebaseUserObject['email'],
            'displayName': firebaseUserObject['displayName'],
        }
        # count users
        userCount = len(self.db.read({}, 'Users'))

        # if no user exists
        if userCount == 0:
            user = UserActions(userObject).createFirstUserAction(firebaseUserObject['uid'])
            print('Created first user : ' + firebaseUserObject['email'])
            return user
        # if there are users
        else:
            user = UserActions(userObject).createUserAction(firebaseUserObject['uid'])
            print('Created user : ' + firebaseUserObject['email'])
            return user

    def login(self):
        userList = self.db.read({'_id': self.firebaseUserObject['uid']},
                                'Users')
        try:
            user = userList[0]
            return user
        except:
            user = self.createNewUser(self.firebaseUserObject)
            return user
