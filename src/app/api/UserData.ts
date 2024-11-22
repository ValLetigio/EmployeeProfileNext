import { getServerSession, Session } from 'next-auth';  

import { authOption } from '../api/auth/[...nextauth]/route'; 

import { User, Roles } from '../schemas/UserSchema';  

const getUserData = async( ) => {
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

export default getUserData;