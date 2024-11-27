import NextAuth from 'next-auth';
 
import { authOption } from '../../AuthOptions';
 
 
declare module 'next-auth' {
    interface Session {
        user: {
            _id?: string;
            roles?: {
                User: string[];
                Memo: string[];
                Employee: string[];
                Offense: string[];
            };
            createdAt?: string | Date;
            isApproved?: boolean;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            sensitiveInfo?: never;
        };
    }

    interface JWT {
        firebaseUserId?: string;
        roles?: {
            User: string[];
            Memo: string[];
            Employee: string[];
            Offense: string[];
        };
        createdAt?: string | Date;
        isApproved?: boolean;
        refreshToken?: string;
        image?: string;
    }
}
 

const handler = NextAuth(authOption);  

export { handler as GET, handler as POST };