import { getServerSession, Session } from 'next-auth';  

import { authOption } from './AuthOptions';

import ServerRequests from './ServerRequests';

import { User, Roles } from '../schemas/UserSchema';

export async function getUserData(): Promise<User> {
    const session: Session | null = await getServerSession(authOption); 

    const sessionUserData = session?.user as Session["user"] & { 
      roles?: Roles;
      _id?: string;
      _version?: number;
      createdAt?: object;
      isApproved?: boolean;
    };

    const { name: displayName, email, image, roles, _id, _version, createdAt, isApproved } = sessionUserData; 
  
    const userData: User = {
      image: image || '',
      _id: _id || '',
      _version: _version || 0,
      roles: roles || {} as Roles,
      createdAt: createdAt ? createdAt.toString() : '',
      isApproved: isApproved || false,
      email: email || '',
      displayName: displayName || ''
    }

    return userData
}

export async function getTestUserData(): Promise<User> {
  const serverRequests = new ServerRequests();

  const { data } = await serverRequests.getUserForTesting();
  return data;
}

// export default getUserData;