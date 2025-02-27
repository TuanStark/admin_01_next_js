import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null;

                user = {
                    id: "1",
                    username: "Tuan",
                    email: "tuan@gmail.com",
                    isVerify: true,
                    type: "user",
                    role: "user",
                };
                if (!user) {
                    throw new Error("Invalid credentials.")
                }
                return user
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
});


