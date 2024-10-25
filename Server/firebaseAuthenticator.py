from mongoDb import mongoDb
from objects import UserActions
import datetime


class firebaseAuthenticator:

    def __init__(self, userObject):
        self.firebaseUserObject = userObject['profile']
        self.db = mongoDb()

        print('Firebase User Object : ' + str(self.firebaseUserObject))

    def createNewUser(self, firebaseUserObject):
        userObject = {
            '_id': None,
            '_version': 0,
            'roles': [],
            'createdAt': datetime.datetime.now(),
            'isApproved': True,
            'email': firebaseUserObject['email'],
            'displayName': firebaseUserObject['name'],
        }
        # count users
        userCount = len(self.db.read({}, 'User'))

        # if no user exists
        if userCount == 0:
            user = UserActions(userObject).createFirstUserAction(firebaseUserObject['sub'])
            print('Created first user : ' + firebaseUserObject['email'])
            return user
        # if there are users
        else:
            user = UserActions(userObject).createUserAction(firebaseUserObject['sub'])
            print('Created user : ' + firebaseUserObject['email'])
            return user

    def login(self):
        userList = self.db.read({'_id': self.firebaseUserObject['sub']},
                                'User')
        try:
            user = userList[0]
            return user
        except:
            user = self.createNewUser(self.firebaseUserObject)
            return user
