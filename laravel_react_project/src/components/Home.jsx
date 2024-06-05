import { useEffect } from "react";
import axiosClient from "../axiosClient";
import React from "react";
import { useStateContext } from "../contexts/contextprovider";

// Displays the Current (You have to connect)
const Home = () => {
  const { user, setUser } = useStateContext();
  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <main className="content px-4 py-2">
      <div className="container-fluid">
        <div className="mb-3">
          <h4>Student Dashboard</h4>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 d-flex">
            <div className="card flex-fill border-0" id="welcomeContainer">
              <div className="card-body p-0 d-flex flex-fill">
                <div className="row g-0 w-100">
                  <div className="col-6">
                    <div className="p-3 m-1">
                      <h4>Welcome , {user.name}</h4>
                      <p className="mb-0">Random Motivation Qoutes</p>

                    </div>
                  </div>
                  <div className="col-6 align-self-end text-end">
                    <img src="/customer-support.jpg" className="img-fluid illustration-img" alt="Qoutes Image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex">
            <div className="card flex-fill border-0">
              <div className="card-body py-4">
                <div className="d-flex align-items-start">
                  <div className="flex-grow-1">

                    {/* you have to put an if statement here if the amount is below 2000 set the 
                    text to green otherwise this text design red */}
                    <h4 className="mb-2 text-danger-emphasis">₱ 33,820.00</h4>
                    <p className="mb-2">Outstanding Balance</p>
                    <button type="button" className="btn btn-success">Pay Now</button>
                    <div className="mb-0">

                      {/* <span className="badge text-success me-2">+9.0%</span>
                      <span className="text-muted">Since Last Month</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card border-0">
          <div className="card-header">
            <h5 className="card-title">Class Schedule</h5>
            {/* Add something here that reflects what Semester is the schedule for */}
            <h6 className="card-subtitle text-muted">2nd Year 2nd Semester</h6>
          </div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Time</th>
                  <th scope="col">Monday</th>
                  <th scope="col">Tuesday</th>
                  <th scope="col">Wednesday</th>
                  <th scope="col">Thursday</th>
                  <th scope="col">Friday</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td colSpan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;