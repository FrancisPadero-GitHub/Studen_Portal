import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function UpdateUser() {
    // This is for the toggle password
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const { login_id } = useParams();
    const [user, setUsers] = useState({
        login_id: null,
        name: '',
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    if (login_id) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/users/${login_id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUsers(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, [id]);
    }

    const navigate = useNavigate();
    const onSubmit = ev => {
        ev.preventDefault();
        if (user.password !== confirmPassword) {
            setErrors({ confirmPassword: ["Passwords do not match"] });
            return;
        }

        const request = user.id
            ? axiosClient.put(`/users/${user.id}`, user)
            : axiosClient.post('/users', user); 

        request
            .then(() => {
                // navigate to a component
                navigate('#');
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };



    return (
        <div>

            { // if the id has a value proceed to update otherwise add new user
                user.login_id ? <h4>Update Account: {user.name} | {user.email}</h4> : <h1>Add Account</h1>}

            <div className="card animated fadeInDown">
                <div className="card-body">
                    {loading && (
                        <div className="text-center">
                            Loading...
                        </div>
                    )}

                    {errors && ( // this is for the warning if the passowords did not match
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


                    {!loading && (
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={user.email}
                                    onChange={ev => setUsers({ ...user, email: ev.target.value })}
                                    placeholder="Email"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    onChange={ev => setUsers({ ...user, password: ev.target.value })}
                                    placeholder="Password"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Confirm Password</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    onChange={ev => setConfirmPassword(ev.target.value)}
                                    placeholder="Confirm Password"
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
                            <button type="submit" className="btn btn-primary">
                                {user.id ? "Update" : "Add Account"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
