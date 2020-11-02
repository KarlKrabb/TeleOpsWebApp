import Register from "./components/externalpages/Register";
import UserLogin from "./components/externalpages/UserLogin";
import Timeline from "./components/mainpage/Timeline";
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
        path: "/timeline",
        exact: true,
        component: Timeline
    },{
        path: "/config",
        exact: true,
        component: WorkDayConfig
    }
]

export default routes