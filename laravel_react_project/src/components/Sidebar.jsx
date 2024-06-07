import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside id="sidebar" className="js-sidebar">
      <div className="h-100">
        <div className="sidebar-logo">
          <Link to="#">Student Portal</Link>
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
            <a href="#" className="sidebar-link collapsed" data-bs-target="#student" data-bs-toggle="collapse" aria-expanded="false">
              <i className="fa-solid fa-circle-user pe-2"></i>
              Student
            </a>
            <ul id="student" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
              <li className="sidebar-item">
                <Link to="#" className="sidebar-link">
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
                <Link to="/enrollment" className="sidebar-link">
                  <i className="fa-solid fa-scroll ps-2 pe-2"></i>
                  Enrollment
                </Link>
              </li>
            </ul>
          </li>
          <li className="sidebar-header">Admin Only Options</li>
          <li className="sidebar-item">
            <a href="#" className="sidebar-link collapsed" data-bs-target="#auth" data-bs-toggle="collapse" aria-expanded="false">
              <i className="fa-solid fa-user-tie pe-2"></i>
              Manage
            </a>
            <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
              <li className="sidebar-item">
                <Link to="/studentlist" className="sidebar-link">
                  <i className="fa-solid fa-circle-user pe-2 ps-2"></i>
                  Students
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to="#" className="sidebar-link">
                  <i className="fa-solid fa-lock pe-2 ps-2"></i>
                  Register
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
