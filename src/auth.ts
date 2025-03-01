import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { InvalidEmailPasswordError, InactiveAccountError } from "./utils/action";
import { sendRequest } from "./utils/api";
import type { NextAuthOptions } from "next-auth"
import type { User } from "next-auth";
import { IUser } from "./types/next-auth";
import { ILogin } from "./types/backend";
import { IBackendRes } from "./types/backend";

declare module "next-auth" {
    interface User {
        id: string;
        email: string | null;
        name: string | null;
        access_token: string;
        refresh_token: string;
        access_expire: number;
    }
}

export const authOptions: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
    providers: [
        Credentials({
            credentials: {
                email: { type: "email" },
                password: { type: "password" }
            },
            async authorize(credentials): Promise<User | null> {
                console.log(">> check credentials: ", credentials);
                try {
                    const res = await fetch("http://localhost:8080/api/v1/auth/login", {
                        method: 'POST',
                        body: JSON.stringify({
                            username: credentials?.email,
                            password: credentials?.password
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    });

                    const data = await res.json();
                    console.log(">> check data: ", data);

                    if (data?.data?.user) {
                        return {
                            id: data.data.user._id,
                            email: data.data.user.email,
                            name: data.data.user.name,
                            access_token: data.data.access_token,
                            refresh_token: data.data.refresh_token,
                            access_expire: data.data.access_expire
                        };
                    }

                    throw new Error(data?.message || "Login failed");
                } catch (error) {
                    throw error;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            console.log(">> check user: ", user);
            if (user) {
                token.user = {
                    _id: user.id,
                    username: user.email || '',
                    email: user.email || '',
                    isVerify: true,
                    type: 'email',
                    role: 'user',
                };
                token.access_token = user.access_token;
                token.refresh_token = user.refresh_token;
                token.access_expire = user.access_expire;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.user) {
                session.user = token.user;
                session.access_token = token.access_token;
                session.refresh_token = token.refresh_token;
                session.access_expire = token.access_expire;
            }
            console.log(">> check session: ", session);
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    }
};

export const { auth, signIn, signOut } = NextAuth(authOptions);


