import { useEffect, useState, useContext } from "react";
import { loginApi } from "../services/UserService";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext.js';

const Login = () => {
    const navigate = useNavigate();
    const { loginContext } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     let token = localStorage.getItem("token");
    //     if (token) {
    //         navigate("/");
    //     }
    // }, []);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("email, password is required");
            return;
        }
        setIsLoading(true);
        let res = await loginApi(email.trim(), password);
        //console.log("check res:", res);
        if (res && res.token) {
            loginContext(email, res.token);
            navigate("/");
        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error);
            }
        }
        setIsLoading(false);
    }
    const handleBack = () => {
        navigate("/");
    }
    const handlePressEnter = (event) => {
        if (event && event.keyCode == 13) {
            handleLogin();
        }
    }
    return (
        <div className="col-12 col-sm-4 login-container">
            <div className="title">Login</div>
            <div className="text">Email or username: eve.holt@reqres.in / cityslicka</div>

            <input type="text" placeholder="Email or username..." value={email} onChange={(event) => setEmail(event.target.value)} />
            <div className="input-2">
                <input type={isShowPassword === true ? "text" : "password"} placeholder="Password..." value={password} onChange={(event) => setPassword(event.target.value)}
                    onKeyDown={(event) => handlePressEnter(event)} />

                <i className={isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} onClick={() => setIsShowPassword(!isShowPassword)}></i>
            </div>

            <button className={email && password ? "active" : ""} disabled={email && password && !isLoading ? false : true} onClick={() => handleLogin()}>
                {isLoading && <i className="fa-solid fa-sync fa-spin"></i>} Login
            </button>
            <div className="back"><i className="fa-solid fa-angles-left "></i> <span onClick={() => handleBack()}>Go back</span> </div>
        </div >
    )
}
export default Login;