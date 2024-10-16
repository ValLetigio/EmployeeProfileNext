import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "461642110506-kg29ub68i80jtremtbvt899otcagmg33.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "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";

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
            console.log("Logged in", profile)
            return true;
        }
    }
}

const handler = NextAuth(authOption);
export {handler as GET, handler as POST};