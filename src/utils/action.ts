'use client'
import { signIn } from "next-auth/react";

interface IAuthenticateParams {
    email: string;
    password: string;
}

export async function authenticate(params: IAuthenticateParams) {
    console.log(">> check params: ", params);
    const { email, password } = params;
    try {
        const user = await signIn("credentials", {
            email,
            password,
            redirect: false
        });
        console.log(">> check user: ", user);
        return user;
    } catch (error) {
        if ((error as any).name === "InvalidEmailPasswordError") {
            return {
                error: (error as any).type,
                code: 1
            }
        } else if ((error as any).name === "InactiveAccountError") {
            return {
                error: (error as any).type,
                code: 2
            }
        } else {
            return {
                error: "Internal server error",
                code: 0
            }
        }
    }
}

export class InvalidEmailPasswordError extends Error {
    static type = "InvalidEmailPasswordError";
}

export class InactiveAccountError extends Error {
    static type = "InactiveAccountError";
}
