import React, { useState, useEffect } from 'react';
import axiosClient from "../axiosClient";
import { Link } from 'react-router-dom';
import { useStateContext } from "../contexts/contextprovider";
// This one will display all the students in the database in a list

function StudentList() {


    const [loading, setLoading] = useState(false);

    const { user, setUser } = useStateContext();
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
            fetchStudents(); // Fetch students after setting the user
        });
    }, [setUser]);

    // Fetch students based on an array
    const [students, setStudents] = useState([]);

    const fetchStudents = () => {
        setLoading(true);
        axiosClient.get('/students')
            .then(response => {
                const allStudents = response.data.data;

                // Filter students to only include the one with matching id
                const filteredStudents = allStudents.filter(student => student.id === user.id);
                setStudents(filteredStudents);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
                setLoading(false);
            });
    };


    return (
        <main className="content px-4 py-2">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 id="users">Add Students Information</h3>
                {/* <Link className="btn btn-success" to="#">
          Add new
        </Link> */}
            </div>
            <div className="card animated fadeInDown">
                <div className="card-body">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Age</th>
                                <th>Address</th>
                                <th>Contact Number</th>
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
                        {!loading && students.length > 0 ? (
                            <tbody>
                                {students.map((student, index) => (
                                    <tr key={index}>
                                        <td>{student.id}</td>
                                        <td>{student.first_name} {student.middle_initial ? student.middle_initial + '.' : ''} {student.last_name}</td>
                                        <td>{student.email}</td>
                                        <td>{student.gender}</td>
                                        <td>{student.age}</td>
                                        <td>{student.address}</td>
                                        <td>{student.contact_number}</td>
                                    </tr>
                                ))}
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

export default StudentList;
