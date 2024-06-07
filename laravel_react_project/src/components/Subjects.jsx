import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

const Subjects = () => {

    const { user, setUser } = useStateContext();

    // Fetch user and student data on component mount
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
            // Fetch the student's data using the user's ID
            const subsInfo = data.id;
            setSub(subsInfo);
        });
    }, [setUser]);

    const [loading, setLoading] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const setSub = (userID) => {
        let stringID = userID
        setLoading(true);
        axiosClient.get(`/subject`)
            .then(response => {
                const allSubjects = response.data.data;
                const filteredSubjects = allSubjects.filter(subjects => subjects.student_id == stringID);
                console.log(filteredSubjects);
                setSubjects(filteredSubjects);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
                setLoading(false); // Stop loading even if there was an error
            });
    };

    return (
        <main className="content px-3 py-5">
            <div className="card border-0" id="subjects">
                <div className="card-header">
                    <h5 className="card-title">Subjects Enrolled Preview</h5>
                    {/* Add something here that reflects what Semester is the schedule for */}
                    <h6 className="card-subtitle text-muted">2nd Year 2nd Semester</h6>
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
                                    <td colSpan="15" className="text-center">
                                        Loading...
                                    </td>
                                </tr>
                            </tbody>
                        )}
                        {!loading && subjects.length > 0 ?(
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
                                     <td colSpan="15" className="text-center">
                                         No student data available.
                                     </td>
                                 </tr>
                             </tbody>
                         )}
                    </table>
                </div>
            </div>
        </main >
    );
};

export default Subjects;
