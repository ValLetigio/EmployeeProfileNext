import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import dotenv from 'dotenv'; 
dotenv.config(); 

const SECRET = process.env.SECRET !;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID !;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET !; 

const authOption:  NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({account, profile}){
            if (!profile?.email) {
                throw new Error('No Profile Found');
            }
            console.log(`${profile?.name} Logged in`, profile)
            console.log(`Account Info:`, account)
            return true;
        }
    },
    secret: SECRET,
}

const handler = NextAuth(authOption);
export {handler as GET, handler as POST};