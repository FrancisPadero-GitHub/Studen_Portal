import { useRef, useState, useEffect } from "react";
import axiosClient from "../axiosClient";
import axios from 'axios'; // Import axios if you're using it directly
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function InstructorSchedule () {
    const [loading, setLoading] = useState(false);
    const [scheduleInfo, setscheduleInfo] = useState([]); // use to fetch instructor table data
    useEffect(() => {
        fetchSchedule();
    }, []);

    const fetchSchedule = () => {
        setLoading(true);
        axiosClient.get('/schedule')
            .then(response => {
                const data = response.data.data;
                // console.log(data[0].instructor_id)
                setscheduleInfo(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching instructor:', error);
                setLoading(false);
            });
    };
    
    return (
        <main className="content px-4 py-2">
            <div className="d-flex justify-content-center align-items-center flex-column mb-3">
                <h4 className="text-center">Instructors Schedule</h4>
            </div>
            <div className="card animated fadeInDown">
                <div className="card-body">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Instructor ID</th>
                                <th>Day</th>
                                <th>Time</th>
                                <th>Course</th>
                                <th>Section</th>
                                <th>Room</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="8" className="text-center">Loading...</td>
                                </tr>
                            ) : scheduleInfo.length > 0 ? (
                                scheduleInfo.map((sched, index) => (
                                    <tr key={index}>
                                        <td>{sched.id}</td>
                                        <td>{sched.instructor_id}</td>
                                        <td>{sched.day}</td>
                                        <td>{sched.time}</td>
                                        <td>{sched.course}</td>
                                        <td>{sched.section}</td>
                                        <td>{sched.room}</td>
                                        <td>{sched.notes}</td>
 
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">No instructor data available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}