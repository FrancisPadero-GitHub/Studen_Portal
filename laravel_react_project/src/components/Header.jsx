import React from 'react';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

const Header = () => {
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
    <header>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">Admin Dashboard (Temporary)</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/Home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">TBA</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">TBA</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">TBA</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Administrator
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/users">Login Accounts</a></li>
                  <li><a className="dropdown-item" href="/profile">Add Student</a></li>
                  <li className="dropdown-divider"><hr /></li>
                  <li><a className="dropdown-item" href="#">TBA</a></li>
                </ul>
              </li>
            </ul>
            <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary" onClick={handleRedirect}>{user.name}</button>
              <button className="btn btn-outline-danger" onClick={onLogout}>Logout</button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
