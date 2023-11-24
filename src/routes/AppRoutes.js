import { Routes, Route } from "react-router-dom";
import Home from '../components/Home.js';
import Login from '../components/Login.js';
import TableUsers from '../components/TableUsers.js';
import PrivateRoute from "./PrivateRoute.js";
import NotFound from "../components/NotFound.js";

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/users' element={<PrivateRoute><TableUsers /></PrivateRoute>} />
                <Route path='*' element={<NotFound />} />
            </Routes>

        </>
    )
}
export default AppRoutes;