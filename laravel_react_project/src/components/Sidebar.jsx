import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";


// Sevare final push update (Bootstrap Navigator)
const Sidebar = () => {
    const { user, setUser } = useStateContext();
    // Fetch user and student data on component mount
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, [setUser]);

    return (
        <aside id="sidebar" className="js-sidebar">
            <div className="h-100">
                <div className="sidebar-logo">
                    <Link to="/">
                        Student Portal {user.account === 'admin' && ' (Admin)'}
                    </Link>
                </div>
                <ul className="sidebar-nav">
                    <li className="sidebar-header">Quick Navigation</li>
                    <li className="sidebar-item">
                        <Link to="/home" className="sidebar-link">
                            <i className="fa-solid fa-house-user pe-2"></i>
                            Dashboard
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <a
                            href="#"
                            className="sidebar-link collapsed"
                            data-bs-target="#student"
                            data-bs-toggle="collapse"
                            aria-expanded="false"
                        >
                            <i className="fa-solid fa-circle-user pe-2"></i>
                            Student
                        </a>
                        <ul
                            id="student"
                            className="sidebar-dropdown list-unstyled collapse"
                            data-bs-parent="#sidebar"
                        >
                            <li className="sidebar-item">
                                <Link to="/subjects" className="sidebar-link">
                                    <i className="fa-solid fa-list-ul ps-2 pe-2"></i>
                                    Subjects Enrolled
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link to="/grades" className="sidebar-link">
                                    <i className="fa-solid fa-square-poll-horizontal ps-2 pe-2"></i>
                                    Grades
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link to="/enrollpage" className="sidebar-link">
                                    <i className="fa-solid fa-scroll ps-2 pe-2"></i>
                                    Enrollment
                                </Link>
                            </li>
                        </ul>
                    </li>

                    {/* Conditionally render admin options */}
                    {user.account === 'admin' && (
                        <>
                            <li className="sidebar-header">Admin Options</li>
                            <li className="sidebar-item">
                                <a
                                    href="#"
                                    className="sidebar-link collapsed"
                                    data-bs-target="#auth"
                                    data-bs-toggle="collapse"
                                    aria-expanded="false"
                                >
                                    <i className="fa-solid fa-user-tie pe-2"></i>
                                    Manage
                                </a>
                                <ul
                                    id="auth"
                                    className="sidebar-dropdown list-unstyled collapse"
                                    data-bs-parent="#sidebar"
                                >
                                    <li className="sidebar-item">
                                        <Link
                                            to="/studentlist"
                                            className="sidebar-link"
                                        >
                                            <i className="fa-solid fa-circle-user pe-2 ps-2"></i>
                                            Login Credentials
                                        </Link>
                                    </li>
                                    <li className="sidebar-item">
                                        <Link to="/enroll/students" className="sidebar-link">
                                            <i className="fa-regular fa-address-card pe-2 ps-2"></i>
                                            Enroll Students
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="sidebar-item">
                                <Link to="/notification" className="sidebar-link">
                                    <i className="fa-regular fa-bell pe-2"></i>
                                    Notify Students
                                </Link>
                            </li>
                        </>
                    )}

                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
