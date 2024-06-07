import axiosClient from "../axiosClient";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/contextprovider";

// YASAY WORK UPDATE
// Displays the Current (You have to connect)
const Home = () => {
    const { user, setUser } = useStateContext();
    // Fetch user and student data on component mount
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
            // Fetch the student's data using the user's ID
            const studentId = data.id;
            getStudents(studentId);
            getEnrollmentInfo(studentId);
            setSub(studentId);
        });
    }, [setUser]);

    const [students, setStudents] = useState({});
    const getStudents = (id) => {
        axiosClient
            .get(`/students/${id}`)
            .then((response) => {
                const studentData = response.data.data;
                setStudents(studentData);
            })
            .catch((error) => {
                console.error("Error fetching students:", error);
            });
    };

    const [enroll, setEnroll] = useState({});
    // To get the student ID from the enrollment table
    const getEnrollmentInfo = (id) => {
        axiosClient
            .get(`/enrollment/${id}`)
            .then((response) => {
                const enrollData = response.data.data;
                setEnroll(enrollData);
            })
            .catch((error) => {
                console.error("Error fetching students:", error);
            });
    };

    //schedule grab
    const [loading, setLoading] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const setSub = (userID) => {
        let stringID = userID;
        setLoading(true);
        axiosClient
            .get(`/subject`)
            .then((response) => {
                const allSubjects = response.data.data;
                const filteredSubjects = allSubjects.filter(
                    (subjects) => subjects.student_id == stringID
                );
                console.log(filteredSubjects);
                setSubjects(filteredSubjects);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching students:", error);
                setLoading(false); // Stop loading even if there was an error
            });
    };

    return (
        <main className="content px-3 py-2">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">
                        Home
                    </li>
                </ol>
            </nav>

            <div className="container-fluid">
                <div className="mb-3">
                    <h4>Student Dashboard</h4>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6 d-flex">
                        <div
                            className="card flex-fill border-0"
                            id="welcomeContainer"
                        >
                            <div className="card-body p-0 d-flex flex-fill">
                                <div className="row g-0 w-100">
                                    <div className="col-6">
                                        <div className="p-3 m-1">
                                            <h4>
                                                Welcome, {students.first_name}{" "}
                                                {students.middle_initial
                                                    ? students.middle_initial +
                                                      "."
                                                    : ""}{" "}
                                                {students.last_name}
                                            </h4>
                                            <p className="mb-0">
                                                Random Motivation Qoutes
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-6 align-self-end text-end">
                                        <img
                                            src="/customer-support.jpg"
                                            className="img-fluid illustration-img"
                                            alt="Qoutes Image"
                                        />
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
                                        {/* you have to put an if statement here if the amount is below 2000 set the  text to green otherwise this text design red */}
                                        <h4 className="mb-2 text-danger-emphasis">
                                            {enroll && enroll.payment_balance
                                                ? enroll.payment_balance.toLocaleString(
                                                      "en-US",
                                                      {
                                                          style: "currency",
                                                          currency: "USD",
                                                      }
                                                  )
                                                : "N/A"}
                                        </h4>
                                        <p className="mb-2">
                                            Outstanding Balance
                                        </p>
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                        >
                                            Settle
                                        </button>
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
                <div className="card border-0" id="subjects">
                    <div className="card-header">
                        <h5 className="card-title">Quick Subjects Enrolled Preview</h5>
                        {/* Add something here that reflects what Semester is the schedule for */}
                        <h6 className="card-subtitle text-muted">
                            2nd Year 2nd Semester
                        </h6>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Code</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Lec Unit</th>
                                    <th scope="col">Lab Unit</th>
                                    <th scope="col">Credit Unit</th>
                                    <th scope="col">Section</th>
                                    <th scope="col">Schedule</th>
                                    <th scope="col">Teacher</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            {loading && (
                                <tbody>
                                    <tr>
                                        <td
                                            colSpan="15"
                                            className="text-center"
                                        >
                                            Loading...
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                            {!loading && subjects.length > 0 ? (
                                <tbody>
                                    {subjects.map((sub, index) => (
                                        <tr key={index}>
                                            <td>{sub.id}</td>
                                            <td>{sub.code}</td>
                                            <td>{sub.description}</td>
                                            <td>{sub.lec_unit}</td>
                                            <td>{sub.lab_unit}</td>
                                            <td>{sub.credit_unit}</td>
                                            <td>{sub.section}</td>
                                            <td>
                                                {sub.schedule.map((time, i) => (
                                                    <div key={i}>{time}</div>
                                                ))}
                                            </td>
                                            <td>{sub.teacher}</td>
                                            <td>{sub.email}</td>
                                            <td>{sub.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <tbody>
                                    <tr>
                                        <td
                                            colSpan="15"
                                            className="text-center"
                                        >
                                            No student data available.
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;
