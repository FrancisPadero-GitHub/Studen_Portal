import React from 'react';
import { useEffect } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";


const Navbar = () => {

    useEffect(() => {
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const sidebar = document.getElementById('sidebar');

        if (sidebarToggle && sidebar) {
            const handleToggle = () => {
                sidebar.classList.toggle('collapsed');
            };

            sidebarToggle.addEventListener('click', handleToggle);

            // Cleanup event listener on component unmount
            return () => {
                sidebarToggle.removeEventListener('click', handleToggle);
            };
        } else {
            console.error("Element with ID 'sidebar-toggle' or 'sidebar' not found");
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
        axiosClient.get("/logout").then(({ }) => {
            setUser(null);
            setToken(null);
        });
    };

    return (
        <nav className="navbar navbar-expand px-3 border-bottom">
            <button className="btn" id="sidebar-toggle" type="button">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse navbar">
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <a href="#" data-bs-toggle="dropdown" className="nav-icon pe-md-0">
                            <img src="image/profile.jpg" className="avatar img-fluid rounded" alt="" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                            <a href="#" className="dropdown-item">Profile</a>
                            <a href="#" className="dropdown-item">Setting</a>
                            <a href="#" className="dropdown-item" onClick={onLogout}>Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
export default Navbar;