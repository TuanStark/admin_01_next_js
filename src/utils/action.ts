'use server'

import { signIn } from "next-auth/react";

export async function authenticate(email: string, password: string) {
   try{
    const user = await signIn("credentials", {
        email,
        password,
        redirect: false,
    });
    return user;
   } catch (error) {
    console.log(error);
    return { error: "Invalid credentials" };
   }
}