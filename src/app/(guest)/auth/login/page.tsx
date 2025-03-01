import Login from "@/components/auth/login";
import { auth } from "@/auth";
const LoginPage = async () => {

    // const sesion = await auth();
    // console.log(">> check session: ", sesion);
    return (
        <Login />
    )
}

export default LoginPage;