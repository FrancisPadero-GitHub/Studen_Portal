import axiosClient from "../axiosClient";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/contextprovider";

// YASAY WORK UPDATE
// Displays the Current (You have to connect)
const Home = () => {
    const { user, setUser } = useStateContext();
    const quotes = [
        {
            text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
            author: "Winston Churchill"
        },
        {
            text: "Believe you can and you're halfway there.",
            author: "Theodore Roosevelt"
        },
        {
            text: "The future belongs to those who believe in the beauty of their dreams.",
            author: "Eleanor Roosevelt"
        },
        {
            text: "Your time is limited, so don't waste it living someone else's life.",
            author: "Steve Jobs"
        },
        {
            text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
            author: "Malcolm X"
        }
    ];
    // State to hold the current quote
    const [currentQuote, setCurrentQuote] = useState(getRandomQuote());

    // Function to pick a random quote
    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    }

    // Function to update the quote with a new random quote
    const handleNewQuote = () => {
        setCurrentQuote(getRandomQuote());
    };


    // State management for students, enrollments, subjects, and notifications
    const [students, setStudents] = useState({});
    const [enroll, setEnroll] = useState({});
    const [loading, setLoading] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [notifications, setNotifications] = useState([]);

    // Fetch user and associated data on component mount
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
            const studentId = data.student_id;
            getStudents(studentId);
            getEnrollmentInfo(studentId);
            setSub(studentId);
            fetchNotifications(studentId); // Fetch notifications as well
        });
    }, [setUser]);

    // Function to fetch student data by ID
    const getStudents = (id) => {
        axiosClient.get(`/students/by-student-id/${id}`)
            .then((response) => {
                setStudents(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching students:", error);
            });
    };

    // Function to fetch enrollment data by student ID
    const getEnrollmentInfo = (id) => {
        axiosClient.get(`/enrollment/by-student-id/${id}`)
            .then((response) => {
                setEnroll(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching enrollment info:", error);
            });
    };

    // Function to fetch subjects based on student ID
    const setSub = (userID) => {
        setLoading(true);
        axiosClient.get(`/subject`)
            .then((response) => {
                const allSubjects = response.data.data;
                const filteredSubjects = allSubjects.filter(
                    (subjects) => subjects.student_id === userID
                );
                setSubjects(filteredSubjects);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching subjects:", error);
                setLoading(false); // Stop loading even if there was an error
            });
    };

    // Function to fetch notifications
    const fetchNotifications = () => {
        axiosClient.get('/notification')
            .then((response) => {
                setNotifications(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching notifications:", error);
            });
    };


    return (
        <main className="content px-3 py-2">
            {/* <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">
                        Home
                    </li>
                </ol>
            </nav> */}

            <div className="container-fluid">
                <div className="mb-3 mt-3">
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
                                            <div style={{ textAlign: 'center', margin: '30px 0px 0px 0px' }}>
                                                <blockquote style={{ fontSize: '14px', fontStyle: 'italic', margin: '10px 0' }}>
                                                    "{currentQuote.text}"
                                                </blockquote>
                                                <p style={{ fontSize: '14px', margin: '10px 0', fontWeight: 'bold' }}>
                                                    - {currentQuote.author}
                                                </p>
                                                <button className="btn btn-primary" onClick={handleNewQuote} style={{ padding: '5px 5px', fontSize: '12px' }}>
                                                    New Quote
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 align-self-center text-end">
                                        <img
                                            src="/customer-support.jpg"
                                            className="rounded responsive-img"
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
                                        <pre className="mb-2 text-danger-emphasis h3">
                                            ₱
                                            {enroll && enroll.payment_balance
                                                ? enroll.payment_balance.toLocaleString(
                                                    "en-US",
                                                    {
                                                        style: " currency",
                                                        currency: "USD",
                                                    }
                                                )
                                                : "N/A"}
                                        </pre>
                                        <p className="mb-2">
                                            Outstanding Balance
                                        </p>
                                        <button
                                            type="button"
                                            className="btn btn-success mt-3"
                                            disabled
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

                {/* Notifications Section */}
                <div className="container-fluid notification-container mt-0" style={{ fontSize: '14px' }}>
                    <h4 className="mb-3">Notifications</h4>
                    <div className="row">
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <div key={notification.id} className="col-md-4 mb-3">
                                    <div className='card notification-card border-success'>
                                        <div className='card-header bg-success text-white' style={{ fontSize: '16px', fontWeight: 'medium', letterSpacing: '2px' }}>
                                            {notification.title}
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">{notification.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No notifications available.</div>
                        )}
                    </div>
                </div>

                <div className="card border-0 mt-3" id="subjects">
                    <div className="card-header">
                        <h5 className="card-title">Quick Subjects Schedule</h5>
                        {/* Add something here that reflects what Semester is the schedule for */}
                        <h6 className="card-subtitle text-muted">
                            2nd Year 2nd Semester
                        </h6>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Monday</th>
                                        <th scope="col">Tuesday</th>
                                        <th scope="col">Wednesday</th>
                                        <th scope="col">Thursday</th>
                                        <th scope="col">Friday</th>
                                        <th scope="col">Saturday</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="6" className="text-center">Loading...</td>
                                        </tr>
                                    ) : subjects.length > 0 ? (
                                        subjects.map((subject, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {subject.schedule
                                                        .filter(time => time.startsWith('M'))
                                                        .map((time, idx) => (
                                                            <div key={idx} className="schedule-item">
                                                                <div>{time}</div>
                                                                <div>{subject.teacher}</div>
                                                                <div className="description">{subject.description}</div>
                                                            </div>
                                                        ))}
                                                </td>
                                                <td>
                                                    {subject.schedule
                                                        .filter(time => time.startsWith('T'))
                                                        .map((time, idx) => (
                                                            <div key={idx} className="schedule-item">
                                                                <div>{time}</div>
                                                                <div>{subject.teacher}</div>
                                                                <div className="description">{subject.description}</div>
                                                            </div>
                                                        ))}
                                                </td>
                                                <td>
                                                    {subject.schedule
                                                        .filter(time => time.startsWith('W'))
                                                        .map((time, idx) => (
                                                            <div key={idx} className="schedule-item">
                                                                <div>{time}</div>
                                                                <div>{subject.teacher}</div>
                                                                <div className="description">{subject.description}</div>
                                                            </div>
                                                        ))}
                                                </td>
                                                <td>
                                                    {subject.schedule
                                                        .filter(time => time.startsWith('Th'))
                                                        .map((time, idx) => (
                                                            <div key={idx} className="schedule-item">
                                                                <div>{time}</div>
                                                                <div>{subject.teacher}</div>
                                                                <div className="description">{subject.description}</div>
                                                            </div>
                                                        ))}
                                                </td>
                                                <td>
                                                    {subject.schedule
                                                        .filter(time => time.startsWith('F'))
                                                        .map((time, idx) => (
                                                            <div key={idx} className="schedule-item">
                                                                <div>{time}</div>
                                                                <div>{subject.teacher}</div>
                                                                <div className="description">{subject.description}</div>
                                                            </div>
                                                        ))}
                                                </td>
                                                <td>
                                                    {subject.schedule
                                                        .filter(time => time.startsWith('S'))
                                                        .map((time, idx) => (
                                                            <div key={idx} className="schedule-item">
                                                                <div>{time}</div>
                                                                <div>{subject.teacher}</div>
                                                                <div className="description">{subject.description}</div>
                                                            </div>
                                                        ))}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">No student data available.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
};

export default Home;
