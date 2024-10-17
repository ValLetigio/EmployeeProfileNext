import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const SECRET = process.env.SECRET || "SECRET";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "461642110506-kg29ub68i80jtremtbvt899otcagmg33.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "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"; 

// const SECRET = process.env.NEXT_PUBLIC_SECRET !;
// const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID !;
// const GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET !; 

console.log("test1", process)

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
            return true;
        }
    },
    secret: SECRET,
}

const handler = NextAuth(authOption);
export {handler as GET, handler as POST};