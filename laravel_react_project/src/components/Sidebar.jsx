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
                <div className="sidebar-logo text-center">
                    <Link to="/">
                        Byte Me Portal
                        <div className="text-center" style={{ fontSize: '12px' }}>
                            {user.account === 'admin' && ' (Admin)'}
                            {user.account === 'instructor' && ' (Instructor)'}
                            {user.account === 'student' && ' (Student)'}

                        </div>
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

                {user.account === 'student' && (
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
                    )}

                    {/* Conditionally render admin options */}
                    {user.account === 'admin' && (
                        <>
                            {/* Administrator Section */}
                            <li className="sidebar-header">Manage Administrators</li>
                            <li className="sidebar-item">
                                <a
                                    href="#"
                                    className="sidebar-link collapsed"
                                    data-bs-target="#admin"
                                    data-bs-toggle="collapse"
                                    aria-expanded="false"
                                >
                                    <i className="fa-solid fa-user-tie pe-2"></i>
                                    Admins
                                </a>
                                <ul
                                    id="admin"
                                    className="sidebar-dropdown list-unstyled collapse"
                                    data-bs-parent="#sidebar"
                                >
                                    {/* List of Admins */}
                                    <li className="sidebar-item">
                                        <Link to="/adminlist" className="sidebar-link">
                                            <i className="fa-solid fa-circle-user pe-2 ps-2"></i>
                                            List of Admins
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </>
                    )}

                    {user.account === 'admin' && (
                        <>
                            {/* Instructor Section */}
                            <li className="sidebar-header">Manage Instructors</li>
                            <li className="sidebar-item">
                                <a
                                    href="#"
                                    className="sidebar-link collapsed"
                                    data-bs-target="#instructors"
                                    data-bs-toggle="collapse"
                                    aria-expanded="false"
                                >
                                    <i className="fa-solid fa-user-tie pe-2"></i>
                                    Instructors
                                </a>
                                <ul
                                    id="instructors"
                                    className="sidebar-dropdown list-unstyled collapse"
                                    data-bs-parent="#sidebar"
                                >
                                    {/* List of Instructors */}
                                    <li className="sidebar-item">
                                        <Link to="/instructorlist" className="sidebar-link">
                                            <i className="fa-solid fa-circle-user pe-2 ps-2"></i>
                                            List of Instructors
                                        </Link>
                                    </li>

                                    <li className="sidebar-item">
                                        <Link to="/instructor/schedules" className="sidebar-link">
                                            <i className="fa-regular fa-calendar pe-2 ps-2"></i>
                                            Schedules
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </>
                    )}

                    {(user.account === 'admin' || user.account === 'instructor') && (
                        <>
                            {/* Student Section */}
                            <li className="sidebar-header">Manage Students</li>
                            <li className="sidebar-item">
                                <a
                                    href="#"
                                    className="sidebar-link collapsed"
                                    data-bs-target="#students"
                                    data-bs-toggle="collapse"
                                    aria-expanded="false"
                                >
                                    <i className="fa-solid fa-user-tie pe-2"></i>
                                    Students
                                </a>
                                <ul
                                    id="students"
                                    className="sidebar-dropdown list-unstyled collapse"
                                    data-bs-parent="#sidebar"
                                >
                                    <li className="sidebar-item">
                                        <Link to="/studentlist" className="sidebar-link">
                                            <i className="fa-solid fa-circle-user pe-2 ps-2"></i>
                                            Student List
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </>
                    )}
                    {(user.account === 'admin' || user.account === 'instructor') && (
                    <li className="sidebar-item">
                        <Link to="/notification" className="sidebar-link">
                            <i className="fa-regular fa-bell pe-2"></i>
                            Notify Students
                        </Link>
                    </li>
                    )}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
