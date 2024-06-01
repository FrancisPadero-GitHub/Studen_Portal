import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

export default function Register() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [confirmPassword, setConfirmPassword] = useState('');
    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);

    // This is for the toggle password
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword((prevState) => !prevState);
    }

    const Submit = (ev) => {
        ev.preventDefault();
        if (passwordRef.current.value !== confirmPassword) {
            setErrors({ confirmPassword: ["Passwords do not match"] });
            return;
        }
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post("/register", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    }

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <p className="text-center mb-1 mt-0" id="header">Temporary Account Login</p>

                            {errors && (
                                <div className="alert alert-danger d-flex align-items-center" role="alert">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-triangle-fill me-2" viewBox="0 0 16 16">
                                        <path d="M7.938 2.016a.13.13 0 0 1 .124 0l6.857 11.856c.06.104.016.24-.094.3a.115.115 0 0 1-.1.012H1.273a.115.115 0 0 1-.1-.012.198.198 0 0 1-.094-.3L7.938 2.016zm.012 5.482a.905.905 0 0 0-1.8 0L6.7 10.995a.905.905 0 1 0 1.8 0L7.95 7.498zm0 4.8a.905.905 0 1 0-1.8 0 .905.905 0 0 0 1.8 0z" />
                                    </svg>
                                    <div>
                                        {Object.keys(errors).map(key => (
                                            <p key={key} className="mb-0">{errors[key][0]}</p>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            <form onSubmit={Submit}>
                                <div className="mb-3">
                                    <input ref={nameRef} type="text" className="form-control" placeholder="Name" required/>
                                </div>
                                <div className="mb-1">
                                    <input ref={emailRef} type="email" className="form-control" placeholder="Email" required/>
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-1">
                                    <input ref={passwordRef} type={showPassword ? "text" : "password"} className="form-control" placeholder="Password" required/>
                                    <div id="passwordHelpBlock" className="form-text">
                                        Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <input ref={confirmPasswordRef} type={showPassword ? "text" : "password"} className="form-control" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} required/>
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

                                <button type="submit" className="btn btn-primary btn-block">Register</button>
                            </form>
                            <p className="text-center mt-3 mb-0">Already Have An Account? <Link to='/login'>Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
