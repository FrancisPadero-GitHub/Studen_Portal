import React, { useRef, useState, useEffect } from 'react';
import axiosClient from "../axiosClient";
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { all } from 'axios';

function EnrollStudents() {
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

                // Loop thru the result to find the specific student it
                allStudents.forEach(student => {
                    getEnrollmentInfo(student.student_id);
                });

                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
                setLoading(false);
            });
    };

    const [enroll, setEnroll] = useState({});
    // To get the student ID from the enrollment table
    const getEnrollmentInfo = (id) => {
        axiosClient
            .get(`/enrollment/by-student-id/${id}`)
            .then((response) => {
                const enrollData = response.data.data;
                setEnroll(enrollData);
            })
            .catch((error) => {
                console.error("Error fetching students:", error);
            });
    };



    const handleShow = (student) => {
        setSelectedStudent(student); // Set the selected student
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    // Define the state to keep track of the selected course
    const [selectedCourse, setSelectedCourse] = useState("BSIT");

    // Define all possible sections
    const sections = [
        { id: "IT2R2", course: "BSIT" },
        { id: "IT2R1", course: "BSIT" },
        { id: "CS1A", course: "CS" },
        { id: "CS2B", course: "CS" },
    ];
    // Handle course selection change
    const handleCourseChange = (event) => {
        setSelectedCourse(event.target.value);
    };

    // Filter sections based on the selected course
    const filteredSections = sections.filter((section) =>
        selectedCourse === "BSIT"
            ? section.id.startsWith("IT")
            : section.id.startsWith("CS")
    );

    const navigate = useNavigate();
    // this data is for the enrollment info
    const enrollData = () => {
        // Get the current date and format it as YYYY-MM-DD
        let programName = "BSIT";
        let courseName = "Information Technology";
        let student_id = selectedStudent.student_id;
        let payment_balance = "33820.00";
        let status = "ENROLLED";

        let currentDate = new Date();
        let formattedDate = `${currentDate.getFullYear()}-${(
            currentDate.getMonth() + 1
        )
            .toString()
            .padStart(2, "0")}-${currentDate
                .getDate()
                .toString()
                .padStart(2, "0")}`;

        // Construct the payload with the current date
        const payload = {
            student_id: student_id,
            course: courseName,
            program: programName,
            enrolled_date: formattedDate,
            payment_balance: payment_balance,
            status: status,
        };
        // Send POST request to your server using Axios
        try {
            axiosClient
                .post("/enrollment", payload)
                .then(() => {
                    console.log("Enroll Form submission successful:");
                })
                .catch((err) => {
                    console.error("Form submission failed:", err);
                });
        } catch (error) {
            console.error(
                "An error occurred while submitting the form:",
                error
            );
        }
    };

    // this data is for the subject data
    const subjectsData = () => {
        let student_id = selectedStudent.student_id;
        const courses = [
            {
                student_id: student_id,
                code: "IT221",
                description: "Information Management",
                lec_unit: 2,
                lab_unit: 1,
                credit_unit: 3,
                section: "IT2R2",
                schedule: ["M 7:30 AM - 10:30 AM", "W 11:00 AM - 1:00 PM"],
                teacher: "BABIA, JHON HARVEY",
                email: "3213725@com.com",
                status: "Regular Load",
            },
            {
                student_id: student_id,
                code: "IT222",
                description: "Networking 1",
                lec_unit: 2,
                lab_unit: 1,
                credit_unit: 3,
                section: "IT2R2",
                schedule: ["M 10:30 AM - 1:30 PM", "W 1:00 PM - 3:00 PM"],
                teacher: "TAGA, MAVE REM",
                email: "test@gmail.com", // Fill this if available
                status: "Regular Load",
            },
            {
                student_id: student_id,
                code: "IT223",
                description: "Web Systems and Technologies",
                lec_unit: 2,
                lab_unit: 1,
                credit_unit: 3,
                section: "IT2R2",
                schedule: ["S 7:30 AM - 10:30 AM", "W 6:00 PM - 8:00 PM"],
                teacher: "PABOLOLOT, RONALYN ANNE H.",
                email: "pabololot@gmail.com",
                status: "Regular Load",
            },
            {
                student_id: student_id,
                code: "IT224",
                description: "Systems Integration and Architecture",
                lec_unit: 2,
                lab_unit: 1,
                credit_unit: 3,
                section: "IT2R2",
                schedule: ["M 6:00 PM - 9:00 PM", "Th 6:00 PM - 8:00 PM"],
                teacher: "ABANILLA, DAN DAVID",
                email: "3234703@com.com",
                status: "Regular Load",
            },
            {
                student_id: student_id,
                code: "Rizal",
                description: "Life and Works of Rizal",
                lec_unit: 3,
                lab_unit: 0,
                credit_unit: 3,
                section: "IT2R2",
                schedule: ["T 12:00 PM - 1:30 PM", "F 10:30 AM - 12:00 PM"],
                teacher: "Endaya, Anton Alfred",
                email: "3234741@com.com",
                status: "Regular Load",
            },
            {
                student_id: student_id,
                code: "PATH FIT 4",
                description: "Physical Activity Towards Health and Fitness 2",
                lec_unit: 2,
                lab_unit: 0,
                credit_unit: 2,
                section: "IT2R2",
                schedule: ["F 1:00 PM - 3:00 PM"],
                teacher: "Ortiz, Saramae Jane P.",
                email: "saramaejaneortiz27@gmail.com",
                status: "Regular Load",
            },
        ];
        
        // Loops through the array
        courses.forEach((course) => {
            axiosClient
                .post("/subject", course)
                .then(() => {
                    console.log("Subjects Form submission successful:");
                })
                .catch((err) => {
                    console.error(
                        "Subjects Form submission failed:",
                        err.response.data.errors
                    ); // Log detailed validation errors
                });
        });
    };

    // Grades
    const gradesdata = () => {
        let student_id = selectedStudent.student_id;
        const payload = [
            {
                student_id: student_id,
                code: "IT221",
                descriptive: "Information Management",
                units: 3,
                section: "IT2R2",
                midterm: 2.25,
                final: 1.25,
                reExam: null,
                remarks: "Not Yet Posted",
            },
            {
                student_id: student_id,
                code: "IT222",
                descriptive: "Networking 1",
                units: 3,
                section: "IT2R2",
                midterm: 2.5,
                final: 1.25,
                reExam: null,
                remarks: "Not Yet Posted",
            },
            {
                student_id: student_id,
                code: "IT223",
                descriptive: "Web Systems and Technologies",
                units: 3,
                section: "IT2R2",
                midterm: 2.25,
                final: 1.25,
                reExam: null,
                remarks: "Not Yet Posted",
            },
            {
                student_id: student_id,
                code: "IT224",
                descriptive: "Systems Integration and Architecture",
                units: 3,
                section: "IT2R2",
                midterm: 2.75,
                final: 1.25,
                reExam: null,
                remarks: "Not Yet Posted",
            },
            {
                student_id: student_id,
                code: "Rizal",
                descriptive: "Life and Works of Rizal",
                units: 3,
                section: "IT2R2",
                midterm: 1.75,
                final: 1.25,
                reExam: null,
                remarks: "Not Yet Posted",
            },
            {
                student_id: student_id,
                code: "PATH FIT 4",
                descriptive: "Physical Activity Towards Health and Fitness 2",
                units: 2,
                section: "IT2R2",
                midterm: 1.0,
                final: 1.75,
                reExam: null,
                remarks: "Not Yet Posted",
            },
        ];
        console.log(payload);
        payload.forEach((payload) => {
            axiosClient
                .post("/grade", payload)
                .then(() => {
                    console.log("grades Form submission successful:");
                })
                .catch((err) => {
                    console.error(
                        "grades Form submission failed:",
                        err.response.data.errors
                    ); // Log detailed validation errors
                });
        });
    };



    // Schedule
    const submitData = async (ev) => {
        try {
            // Ensure the functions are called and all promises are resolved
            await Promise.all([gradesdata(), subjectsData(), enrollData()]);
            handleClose();
            // Show success alert after all functions have run successfully
            alert("Student Successfully Enrolled");
            // Navigate to the section page
        } catch (error) {
            // Handle errors if any of the promises fail
            console.error("Error during enrollment process:", error);
            alert("Enrollment failed. Please try again.");
        }
    };



    return (
        <main className="content px-4 py-2">
            <div className="d-flex justify-content-center align-items-center flex-column mb-3">
                <h3 className="text-center">Enrollment</h3>
            </div>
            <div className="card animated fadeInDown">
                <div className="card-body">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                {/* <th>Status</th> */}
                                <th className='text-end'>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="text-center">Loading...</td>
                                </tr>
                            ) : students.length > 0 ? (
                                students.map((student, index) => (
                                    <tr key={index}>
                                        <td>{student.student_id}</td>
                                        <td>{student.first_name} {student.middle_initial ? student.middle_initial + '.' : ''} {student.last_name}</td>
                                        <td>{student.email}</td>
                                        {/* <td>{student.student_id === enroll.student_id ? enroll.status : 'Not Enrolled'}</td> */}
                                        <td className='text-end'>
                                            <Button
                                                variant="primary"
                                                style={{ fontSize: '13px', padding: '1px 10px' }}
                                                onClick={() => handleShow(student)}
                                                
                                            >
                                                Enroll
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">No student data available.</td>
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
                    <Modal.Title>Enroll: {(selectedStudent ? selectedStudent.student_id : '')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={submitData}>
                        <p className="text-center mb-1 mt-0" id="header">
                            Quick Enroll
                        </p>


                        <div className="mb-2">
                            <label
                                htmlFor="course"
                                className="form-label"
                            >
                                Course
                            </label>
                            <select
                                className="form-select form-select-md"
                                id="course"
                                name="course"
                                required
                                value={selectedCourse}
                                onChange={handleCourseChange}
                            >
                                <option value="BSIT">BSIT</option>
                                <option value="CS">CS</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="section"
                                className="form-label"
                            >
                                Section
                            </label>
                            <select
                                className="form-select form-select-md"
                                id="section"
                                name="section"
                                required
                            >
                                {filteredSections.map((section) => (
                                    <option
                                        key={section.id}
                                        value={section.id}
                                    >
                                        {section.id}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="d-flex justify-content-between">

                            <Button
                                className="btn btn-secondary"
                                onClick={handleClose}
                            >
                                Back
                            </Button>
                            
                            <Link
                                type="submit"
                                className="btn btn-primary"
                                onClick={submitData}
                            >
                                Next
                            </Link>
                        </div>

                    </form>
                </Modal.Body>
            </Modal>


        </main>
    );
}

export default EnrollStudents;
