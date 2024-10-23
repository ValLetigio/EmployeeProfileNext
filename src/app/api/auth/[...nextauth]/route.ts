import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import ServerRequests from '../../ServerRequests';

import dotenv from 'dotenv'; 
dotenv.config(); 

const SECRET = process.env.SECRET !;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID !;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET !;

const serverRequests = new ServerRequests(false);

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
        async signIn({profile}){
            if (!profile?.email) {
                throw new Error('No Profile Found');
            }
            console.log(`${profile?.name} Logged in`, profile)
            const res = await serverRequests.firebaseLogin({profile});
            console.log('res', res);
            return true;
        },
        async jwt({ token, account, profile }) {
            if(profile){
                const res = await serverRequests.firebaseLogin({profile});
    
                if (res.data) {
                    token.firebaseUserId = res.data._id;
                    token.roles = res.data.roles;
                    token.createdAt = res.data.createdAt;
                    token.isApproved = res.data.isApproved;
                    token.refreshToken = account?.refresh_token;
                }

            }

            return token;
        },

        async session({ session, token }) {
            if (!session.user) {
                session.user = {};
            }

            if (token.sub) {
                session.user._id = token.sub; 
            }

            if (token.roles) {
                session.user.roles = token.roles;
            }

            if (token.createdAt) {
                session.user.createdAt = token.createdAt;
            }

            if (token.isApproved) {
                session.user.isApproved = token.isApproved;
            }

            return session;
        }
    },
    secret: SECRET,
}

const handler = NextAuth(authOption);
export {handler as GET, handler as POST};