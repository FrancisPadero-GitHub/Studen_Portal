import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import { useNavigate } from "react-router-dom";

export default function EnrollForm() {
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

    // Fetch current user ID
    const { user, setUser } = useStateContext();
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, [setUser]);

    let id = user.id;

    const navigate = useNavigate();
    // this data is for the enrollment info
    const enrollData = () => {
        // Get the current date and format it as YYYY-MM-DD
        let programName = "BSIT";
        let courseName = "Information Technology";
        let student_id = "2020300597";
        let currentDate = new Date();
        let payment_balance = "33820.00";
        let status = "ENROLLED";
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
            enrollment_id: user.id, // Assuming user.id is defined and holds the enrollment ID
            student_id: student_id,
            course: courseName,
            program: programName,
            enrolled_date: formattedDate,
            payment_balance: payment_balance,
            status: status,
        };
        console.log("Payload: " + payload);
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
        const courses = [
            {
                student_id: user.id,
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
                student_id: user.id,
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
                student_id: user.id,
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
                student_id: user.id,
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
                student_id: user.id,
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
                student_id: user.id,
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
        console.log(id);
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
        const payload = [
            {
                student_id: user.id,
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
                student_id: user.id,
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
                student_id: user.id,
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
                student_id: user.id,
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
                student_id: user.id,
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
                student_id: user.id,
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
    
    const submitData = () => {
        gradesdata();
        subjectsData();
        enrollData();
        navigate("/section"); // enrollment ni nga component dli controller
    };
    return (
        <main className="content px-2 py-5">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <p className="text-center mb-1 mt-0" id="header">
                                Quick Enroll
                            </p>

                            {/* {errors && (
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
                            )} */}
                            <form>
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

                                {/* <div className="mb-2 form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="checkbox"
                                        name="checkbox"
                                        onChange={togglePassword}
                                        checked={showPassword}
                                    />
                                    <label className="form-check-label" htmlFor="checkbox">Show Password</label>
                                </div> */}
                                <div className="d-flex justify-content-between">
                                    <Link
                                        className="btn btn-secondary"
                                        to="/enrollment"
                                    >
                                        Back
                                    </Link>
                                    <Link
                                        type="submit"
                                        className="btn btn-primary"
                                        onClick={submitData}
                                    >
                                        Next
                                    </Link>
                                </div>
                            </form>
                            {/* <p className="text-center mt-3 mb-0">Already Have An Account? <Link to='/login'>Login</Link></p> */}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
