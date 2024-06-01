import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

// import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

export default function Dashboard() {
  const { token } = useStateContext();

  // If the token is empty redirect to login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  //Logout Option
  // const onLogout = (ev) => {
  //     ev.preventDefault();
  //     axiosClient.get("/logout").then(({ }) => {
  //         setUser(null);
  //         setToken(null);
  //     });
  // };

  // useEffect(() => {
  //     axiosClient.get("/user").then(({ data }) => {
  //         setUser(data);
  //     });
  // }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
        <main role="main" className="flex-grow-1 p-3">
          <div className="starter-template">
            <Outlet/>
          </div>
        </main>
      <Footer />
    </div>
  );

  // return (
  //     <div id="dashboard">
  //         <nav className="navbar navbar-expand-lg navbar-light bg-light">
  //             <div className="container-fluid">
  //                 <a className="navbar-brand" href="/">Dashboard</a>
  //                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
  //                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
  //                         <li className="nav-item">
  //                             <a className="nav-link" href="/users">Users</a>
  //                         </li>
  //                         {/* Add more navbar items as needed */}
  //                     </ul>
  //                     <div className="d-flex">
  //                         <span className="navbar-text me-3">{user.name}</span>
  //                         <button className="btn btn-outline-danger" onClick={onLogout}>Logout</button>
  //                     </div>
  //                 </div>
  //             </div>
  //         </nav>
  //         <div className="content">
  //             <main>
  //                 <Outlet/>
  //             </main>
  //         </div>
  //     </div>
  // );

}
