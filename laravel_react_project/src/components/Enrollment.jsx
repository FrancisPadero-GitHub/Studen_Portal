import axiosClient from "../axiosClient";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/contextprovider";
import { Link } from "react-router-dom";


// Displays the Current (You have to connect)

export default function Enrollment() {
    const { user, setUser } = useStateContext();

    // Fetch user and student data on component mount
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
            // Fetch the student's data using the user's ID
            const enrollInfo = data.login_id;
            getEnrollInfo(enrollInfo);
        });
    }, [setUser]);

    const [loading, setLoading] = useState(false);
    const [enrollment, setEnrollmetnInfo] = useState({});

    const getEnrollInfo = (id) => {
        setLoading(true);
        axiosClient
            .get(`/enrollment/by-student-id/${id}`)
            .then((response) => {
                const enrollInfo = response.data.data;
                setEnrollmetnInfo(enrollInfo);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching students:", error);
                setLoading(false); // Stop loading even if there was an error
            });
    };


    return (
        <main className="content px-3 py-2">
            <div className="card border-0">
                <div className="card-header">
                    <h5 className="card-title">Enrollment Status</h5>
                    {/* Add something here that reflects what Semester is the schedule for */}
                    <h6 className="card-subtitle text-muted">
                        2nd Year 2nd Semester
                    </h6>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Enrollment ID</th>
                                <th scope="col">Program</th>
                                <th scope="col">Course</th>
                                <th scope="col">Enrollment Date</th>
                                <th scope="col">Payment Balance</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        {loading && (
                            <tbody>
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        Loading...
                                    </td>
                                </tr>
                            </tbody>
                        )}
                        {!loading && enrollment.id > 0 ? (
                            <tbody>
                                <tr>
                                    <td>{enrollment.id}</td>
                                    <td>{enrollment.program}</td>
                                    <td>{enrollment.course}</td>
                                    <td>{enrollment.enrolled_date}</td>
                                    <td>{enrollment.payment_balance}</td>
                                    <td>{enrollment.status}</td>
                                </tr>
                            </tbody>
                        ) : (
                            <tbody>
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        No student data available.
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </main>
    );
}
