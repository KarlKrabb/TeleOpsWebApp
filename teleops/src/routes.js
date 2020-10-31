import Register from "./components/Register";
import UserLogin from "./components/UserLogin";

const routes = [
    {
        path: "/",
        exact: true,
        component: UserLogin
    },{
        path: "/register",
        exact: true,
        component: Register
    }
]

export default routes