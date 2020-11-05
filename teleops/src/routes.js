import Register from "./components/externalpages/Register";
import UserLogin from "./components/externalpages/UserLogin";
import MainPage from "./components/mainpage/MainPage";
import WorkDayConfig from "./components/settingpages/WorkDayConfig"

const routes = [
    {
        path: "/",
        exact: true,
        component: UserLogin
    },{
        path: "/register",
        exact: true,
        component: Register
    },{
        path: "/main",
        exact: true,
        component: MainPage
    },{
        path: "/config",
        exact: true,
        component: WorkDayConfig
    }
]

export default routes