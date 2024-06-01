import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";


export default function Login() {

    // this is for the toogle password 
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword((prevState) => !prevState);
    };
    // Logic validation logic
    const { setUser, setToken } = useStateContext();
    const emailRef = useRef();
    const passwordRef = useRef();
    const handleSubmit = (event) => {
        // this code prevents the page refresh after submission 
        event.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
    };

    return (
        <div className="container">
            <h3 className="heading">Student Login Page</h3>

            <div className="content">
                <img
                    src="/login_pic.png"
                    className="img"
                    alt="Welcome to Student Portal"
                />

                <form name="loginForm" onSubmit={handleSubmit}>
                    <label htmlFor="email" id="emailLabel">
                        Email / ID Number
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        ref={emailRef}
                        required
                    />
                    <label htmlFor="password" id="passwordLabel">
                        Password
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        ref={passwordRef}
                        required
                    />
                    <br />
                    <div className="checkboxContainer">
                        <input
                            type="checkbox"
                            id="checkbox"
                            name="checkbox"
                            onChange={togglePassword}
                            checked={showPassword}
                        />
                        <label htmlFor="checkbox" id="checkboxLabel">
                            Show Password
                        </label>
                        <a className="forgotPass" href="forgotPass.html">
                            Forgotten Password?
                        </a>
                    </div>
                    <button type="submit" id="buttonClick">
                        Login
                    </button>
                    <hr />
                    <p className="enroll">
                        Need an Account?
                        <Link className="enrollNow" to="/register">
                            Enroll Now!
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
