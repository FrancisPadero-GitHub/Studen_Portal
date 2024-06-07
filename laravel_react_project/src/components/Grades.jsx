import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

const Grades = () => {

    const { user, setUser } = useStateContext();

    // Fetch user and student data on component mount
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
            // Fetch the student's data using the user's ID
            const subsInfo = data.id;
            setGrades(subsInfo);
        });
    }, [setUser]);

    const [loading, setLoading] = useState(false);
    const [grade, setstudGrades] = useState([]);
    const setGrades = (userID) => {
        let stringID = userID
        setLoading(true);
        axiosClient.get(`/grade`)
            .then(response => {
                const allSubjects = response.data.data;
                const fildteredGradeData = allSubjects.filter(grade => grade.student_id == stringID);
                console.log(fildteredGradeData);
                setstudGrades(fildteredGradeData);
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
                    <h5 className="card-title">Report of Grades</h5>
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
                                <th scope="col">Units</th>
                                <th scope="col">Section</th>
                                <th scope="col">Midterm</th>
                                <th scope="col">Final</th>
                                <th scope="col">Re-Exam</th>
                                <th scope="col">Remarks</th>
                            </tr>
                        </thead>
                        {loading && (
                            <tbody>
                                <tr>
                                    <td colSpan="10" className="text-center">
                                        Loading...
                                    </td>
                                </tr>
                            </tbody>
                        )}
                        {!loading && grade.length > 0 ?(
                            <tbody>
                                {grade.map((grades, index) => (
                                    <tr key={index}>
                                        <td>{grades.id}</td>
                                        <td>{grades.code}</td>
                                        <td>{grades.descriptive}</td>
                                        <td>{grades.units}</td>
                                        <td>{grades.section}</td>
                                        <td>{grades.midterm}</td>
                                        <td>{grades.final}</td>
                                        <td>{grades.reExam}</td>
                                        <td>{grades.remarks}</td>

                                    </tr>
                                ))}
                            </tbody>
                            ) : (
                             <tbody>
                                 <tr>
                                     <td colSpan="10" className="text-center">
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

export default Grades;
