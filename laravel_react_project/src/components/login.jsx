import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

export default function Login() {
    // This is for the toggle password
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    // Logic validation logic
    const { setUser, setToken } = useStateContext();
    const [errorMessage, setErrorMessage] = useState('');
    const emailRef = useRef();
    const passwordRef = useRef();
    const handleSubmit = (event) => {
        // This code prevents the page refresh after submission
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
                if (response && response.status === 401) {
                    setErrorMessage("Incorrect email or password. Please try again.");
                }
            });
    };

    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid" id="logoCont">
                    <a className="navbar-brand" href="#">
                        <img src="/ustplogolight.png" className="d-inline-block align-center" id="ustpLogo" />
                    </a>
                    <span id="ustpHead">UNIVERSITY OF SCIENCE AND TECHNOLOGY OF SOUTHERN PHILIPPINES</span>
                </div>
            </nav>
            <div className="mainContent">
                <div id="mainContainer">
                    <div className="m-1" id="imgContainer" >
                        <img
                            src="/login_pic.png"
                            className="img-fluid mx-auto d-block"
                            id="img"
                            alt="Welcome to Student Portal"
                        />
                    </div>
                    <div className="m-1" id="form">
                        <p className="text-center mb-1 mt-0" id="header">Please Login </p>

                        {errorMessage && <div className="alert alert-danger d-flex align-items-center" role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                            </svg>
                            <div className="error">
                                {errorMessage}
                            </div>
                        </div>}

                        <form name="loginForm" onSubmit={handleSubmit} id="formContainer">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    required
                                    ref={emailRef}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    aria-describedby="passwordHelpBlock"
                                    required
                                    ref={passwordRef}
                                />
                            </div>
                            <div className="mb-2 form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="checkbox"
                                    name="checkbox"
                                    onChange={togglePassword}
                                    checked={showPassword}
                                />
                                <label className="form-check-label" htmlFor="checkbox">Show Password</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <p className="m-2">
                                Need an Account?
                                <Link className="p-2" to="/register">
                                    Enroll Now!
                                </Link>
                            </p>
                        </form>
                    </div>

                </div>
            </div>

            {/* <footer className="d-flex flex-wrap justify-content-between align-items-center mb-0 my-4 border-top bg-light">
                <p className="col-md-4 mb-0 ">© 2024 Byte Me If You Can, Inc</p>
                <a href="#" className="col-md-4 d-flex align-items-center justify-content-center mb-0 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <img src="/pngegg.png" width="60" />
                </a>
                <ul className="nav col-md-4 justify-content-end">
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Home</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Features</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Pricing</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">FAQs</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">About</a></li>
                </ul>
            </footer> */}

        </>
    );
}
