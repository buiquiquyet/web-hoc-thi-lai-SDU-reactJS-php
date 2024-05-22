import DefaultLayout from "../components/Layout/DefaultLayout";
import Login from "../login";
import Home from "../Page/Home";
import Main from "../Page/Main";
import TimeSetting from "../Page/TimeSetting";
import User from "../Page/User";
const publicRoutes = [
    {path: '/login', component: Login,  props: { type: 'login' } },
    {path: '/', component: Main, layout: DefaultLayout,  props: { type: 'Main' } },
    {path: '/duyet/:typeSidebar', component: Home, layout: DefaultLayout,  props: { type: 'Home' } },
    {path: '/filter', component: Home, layout: DefaultLayout,  props: { type: 'Filter' }},
    {path: '/duyetKhoa/:typeSidebar', component: Home, layout: DefaultLayout,  props: { type: 'Department' }},
    {path: '/user', component: User, layout: DefaultLayout,  props: { type: 'User' } },
    {path: '/time', component: TimeSetting, layout: DefaultLayout,  props: { type: 'Time' } },
]
const privateRoutes = [
    
]

export { publicRoutes, privateRoutes }