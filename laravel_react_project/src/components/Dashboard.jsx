import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import React, { useState } from 'react';

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from './Footer';


export default function Dashboard() {

    const { token } = useStateContext();
    // If the token is empty redirect to login page
    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="wrapper">
            <Sidebar />
            <div className="main">
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </div>
    );
}
