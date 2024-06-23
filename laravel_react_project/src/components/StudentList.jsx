import React, { useRef, useState, useEffect } from 'react';
import axiosClient from "../axiosClient";
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function StudentList() {
    const [formData, setFormData] = useState({
        student_id: '', // Ensure initial values are empty strings or undefined
        email: '',
        password: '',
    });
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null); // Track selected student for editing

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        setLoading(true);
        axiosClient.get('/students')
            .then(response => {
                const allStudents = response.data.data;
                setStudents(allStudents);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
                setLoading(false);
            });
    };

    const handleShow = (student) => {
        setSelectedStudent(student); // Set the selected student
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    // Mao ni tong ma autofill then ma editable ang inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const studenId = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef(); // this is for the check if same input 

    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState(null);

    // User Table HTTP REQUEST
    const Submit = (ev) => {
        ev.preventDefault();

        // Check if passwords match
        if (passwordRef.current.value !== confirmPassword) {
            setErrors({ confirmPassword: ["Passwords do not match"] });
            return;
        }

        // Payload to send
        const payload = {
            student_id: studenId.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            account: "user",
        };

        // Determine the correct request
        const mainRequest = selectedStudent.student_id
            ? axiosClient.put(`/users/${selectedStudent.student_id}`, payload) // Assuming an ID is required for updating user
            : axiosClient.post("/register", payload);

        // If selectedStudent has a student_id, include it in the URL for the PUT request
        const additionalRequest = axiosClient.put(`/students/${selectedStudent.id}`, payload);

        // Execute requests in parallel
        Promise.all([mainRequest, additionalRequest])
            .then(([mainResponse, additionalResponse]) => {
                console.log("Main request successful:", mainResponse.data);
                console.log("Additional request successful:", additionalResponse.data);

                // Navigate to a component or handle close
                handleClose();
                window.location.reload();
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                } else {
                    console.error("Error in request:", err);
                }
            });
    };





    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <main className="content px-4 py-2">
            <div className="d-flex justify-content-center align-items-center flex-column mb-3">
                <h3 className="text-center">Set Students Login Information</h3>
            </div>
            <div className="card animated fadeInDown">
                <div className="card-body">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th> </th>
                                <th className='text-end'>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center">Loading...</td>
                                </tr>
                            ) : students.length > 0 ? (
                                students.map((student, index) => (
                                    <tr key={index}>
                                        <td>{student.student_id}</td>
                                        <td>{student.first_name} {student.middle_initial ? student.middle_initial + '.' : ''} {student.last_name}</td>
                                        <td>{student.email}</td>
                                        <td>{student.password}</td>
                                        <td> </td>
                                        <td className='text-end'>
                                            <Button
                                                variant="primary"
                                                style={{ fontSize: '13px', padding: '1px 10px' }}
                                                onClick={() => handleShow(student)}
                                            >
                                                { // if the id has a value proceed to update otherwise add new user
                                                    student.student_id ? <label>Edit</label> : <label>Add</label>}
                                            </Button>
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

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Credentials</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={Submit}>
                        <div className="card">
                            <div className="card-body">
                                <div className="row mb-2 justify-content-center">
                                    <div className="mb-2">
                                        <label htmlFor="student_id" className="form-label">Student ID</label>
                                        <input
                                            ref={studenId}
                                            value={(selectedStudent ? selectedStudent.student_id : '')}
                                            onChange={handleChange}
                                            className="form-control form-control-md"
                                            id="student_id"
                                            name="student_id"
                                            required
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            ref={emailRef}
                                            value={formData.email || (selectedStudent ? selectedStudent.email : '')}
                                            onChange={handleChange}
                                            className="form-control form-control-md"
                                            id="email"
                                            name="email"
                                            required
                                        />
                                    </div>
                                </div>
                                {errors && (
                                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-triangle-fill me-2" viewBox="0 0 16 16">
                                            <path d="M7.938 2.016a.13.13 0 0 1 .124 0l6.857 11.856c.06.104.016.24-.094.3a.115.115 0 0 1-.1.012H1.273a.115.115 0 0 1-.1-.012.198.198 0 0 1-.094-.3L7.938 2.016zm.012 5.482a.905.905 0 0 0-1.8 0L6.7 10.995a.905.905 0 1 0 1.8 0L7.95 7.498zm0 4.8a.905.905 0 1 0-1.8 0 .905.905 0 0 0 1.8 0z" />
                                        </svg>
                                        <div>
                                            {Object.keys(errors).map(key => (
                                                <p key={key} className="mb-0">{errors[key][0]}</p>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div className="row mb-2 justify-content-center">
                                    <div className="mb-2">
                                        <label htmlFor="Password" className="form-label">Password</label>
                                        <input
                                            ref={passwordRef}
                                            value={(selectedStudent ? selectedStudent.password : '')}
                                            onChange={handleChange}
                                            type={showPassword ? "text" : "password"}
                                            className="form-control form-control-md"
                                            id="Password"
                                            name="Password"
                                            required
                                        />
                                        <small>Password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.</small>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="confirm_pass" className="form-label">Confirm Password</label>
                                        <input
                                            ref={confirmPasswordRef}
                                            type={showPassword ? "text" : "password"}
                                            className="form-control form-control-md"
                                            id="confirm_pass"
                                            name="confirm_pass"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-2 form-check">
                                        <input
                                            style={{ margin: '3px 5px 0px 1px' }}
                                            className="form-check-input"
                                            type="checkbox"
                                            id="checkbox"
                                            name="checkbox"
                                            onChange={togglePassword}
                                            checked={showPassword}
                                        />
                                        <label className="form-check-label" htmlFor="checkbox">Show Password</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-end">
                            <button className="btn btn-secondary me-2" onClick={handleClose}>Close</button>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </main>
    );
}

export default StudentList;
