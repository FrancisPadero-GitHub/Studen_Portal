import React from "react";
import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import { Link } from "react-router-dom";

// Sevare Fixed Logout and update of profile picture
const Navbar = () => {
    useEffect(() => {
        const sidebarToggle = document.getElementById("sidebar-toggle");
        const sidebar = document.getElementById("sidebar");

        if (sidebarToggle && sidebar) {
            const handleToggle = () => {
                sidebar.classList.toggle("collapsed");
            };

            sidebarToggle.addEventListener("click", handleToggle);

            // Cleanup event listener on component unmount
            return () => {
                sidebarToggle.removeEventListener("click", handleToggle);
            };
        } else {
            console.error(
                "Element with ID 'sidebar-toggle' or 'sidebar' not found"
            );
        }
    }, []);
    const { user, setUser, setToken } = useStateContext();

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    // Logout Option
    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.get("/logout").then(({}) => {
            setUser(null);
            setToken(null);
        });
    };

    // to fetch the gender type of the profile in the students personal image information
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
            // Fetch the student's data using the user's ID
            const studentId = data.login_id;
            getStudents(studentId);
        });
    }, [setUser]);


    const [students, setStudents] = useState({});
    const getStudents = (id) => {
        axiosClient
            .get(`/personalInfo/fetch/${id}`)
            .then((response) => {
                const studentData = response.data.data;
                setStudents(studentData);
            })
            .catch((error) => {
                console.error("Error fetching students:", error);
                // setLoading(false); // Stop loading even if there was an error
            });
    };

    
    return (
        <nav className="navbar navbar-expand px-3 py-0 border-bottom">
            <button className="btn" id="sidebar-toggle" type="button">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse navbar py-1">
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <a
                            href="#"
                            data-bs-toggle="dropdown"
                            className="nav-icon pe-md-0"
                        >
                            <img
                                src={
                                    students.gender === "Female"
                                        ? "/profile_girl.jpg"
                                        : "/profile.jpg"
                                }
                                
                                className="card-img-top"
                                alt="Profile Image"
                                id="navpic"
                            />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                            <Link
                                to="/profile"
                                className="dropdown-item"
                            >
                                Profile
                            </Link>
                            {/* <Link to="#" className="dropdown-item">Settings</Link> */}
                            <Link
                                to="#"
                                className="dropdown-item"
                                onClick={onLogout}
                            >
                                Logout
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
export default Navbar;
