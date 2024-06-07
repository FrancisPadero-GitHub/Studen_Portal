import React, { useEffect, useState } from "react";
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import { useNavigate } from 'react-router-dom';

const IT2R2 = () => {
    // Sample data (you can replace it with your dynamic data)
    const courses = [
        {
            id: 1,
            code: 'IT221',
            description: 'Information Management',
            tfCompute: '',
            lecUnit: 2,
            labUnit: 1,
            creditUnit: 3,
            lecHr: '',
            labHr: '',
            section: 'IT2R2',
            schedule: ['M 7:30 AM - 10:30 AM', 'W 11:00 AM - 1:00 PM'],
            teacher: 'BABIA, JHON HARVEY',
            email: '3213725@com.com',
            status: 'Regular Load',
            specialClass: ''
        },
        {
            id: 2,
            code: 'IT222',
            description: 'Networking 1',
            tfCompute: '',
            lecUnit: 2,
            labUnit: 1,
            creditUnit: 3,
            lecHr: '',
            labHr: '',
            section: 'IT2R2',
            schedule: ['M 10:30 AM - 1:30 PM', 'W 1:00 PM - 3:00 PM'],
            teacher: 'TAGA, MAVE REM',
            email: '',
            status: 'Regular Load',
            specialClass: ''
        },
        {
            id: 3,
            code: 'IT223',
            description: 'Web Systems and Technologies',
            tfCompute: '',
            lecUnit: 2,
            labUnit: 1,
            creditUnit: 3,
            lecHr: '',
            labHr: '',
            section: 'IT2R2',
            schedule: ['S 7:30 AM - 10:30 AM', 'W 6:00 PM - 8:00 PM'],
            teacher: 'PABOLOLOT, RONALYN ANNE H.',
            email: 'pabololot@gmail.com',
            status: 'Regular Load',
            specialClass: ''
        },
        {
            id: 4,
            code: 'IT224',
            description: 'Systems Integration and Architecture',
            tfCompute: '',
            lecUnit: 2,
            labUnit: 1,
            creditUnit: 3,
            lecHr: '',
            labHr: '',
            section: 'IT2R2',
            schedule: ['M 6:00 PM - 9:00 PM', 'Th 6:00 PM - 8:00 PM'],
            teacher: 'ABANILLA, DAN DAVID',
            email: '3234703@com.com',
            status: 'Regular Load',
            specialClass: ''
        },
        {
            id: 5,
            code: 'Rizal',
            description: 'Life and Works of Rizal',
            tfCompute: '',
            lecUnit: 3,
            labUnit: 0,
            creditUnit: 3,
            lecHr: '',
            labHr: '',
            section: 'IT2R2',
            schedule: ['T 12:00 PM - 1:30 PM', 'F 10:30 AM - 12:00 PM'],
            teacher: 'Endaya, Anton Alfred',
            email: '3234741@com.com',
            status: 'Regular Load',
            specialClass: ''
        },
        {
            id: 6,
            code: 'PATH FIT 4',
            description: 'Physical Activity Towards Health and Fitness 2',
            tfCompute: '',
            lecUnit: 2,
            labUnit: 0,
            creditUnit: 2,
            lecHr: '',
            labHr: '',
            section: 'IT2R2',
            schedule: ['F 1:00 PM - 3:00 PM'],
            teacher: 'Ortiz, Saramae Jane P.',
            email: 'saramaejaneortiz27@gmail.com',
            status: 'Regular Load',
            specialClass: ''
        },
    ];

    // Aggregate data

    const totalCourses = courses.length;
    const totalTFCompute = courses.reduce((sum, course) => sum + (course.tfCompute || 0), 0);
    const totalLecUnits = courses.reduce((sum, course) => sum + course.lecUnit, 0);
    const totalLabUnits = courses.reduce((sum, course) => sum + course.labUnit, 0);
    const totalCreditUnits = courses.reduce((sum, course) => sum + course.creditUnit, 0);
    const totalLecHrs = courses.reduce((sum, course) => sum + (course.lecHr || 0), 0);
    const totalLabHrs = courses.reduce((sum, course) => sum + (course.labHr || 0), 0);



    return (
        <div className="content px-1 py-0">
            <div className="container mt-4">
                <h6>Subject Preview</h6>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Code</th>
                            <th>Description</th>
                            <th>TF Compute</th>
                            <th>Lec Unit</th>
                            <th>Lab Unit</th>
                            <th>Credit Unit</th>
                            <th>Lec Hr</th>
                            <th>Lab Hr</th>
                            <th>Section</th>
                            <th>Schedule</th>
                            <th>Teacher</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Special Class</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={course.id}>
                                <td>{index + 1}</td>
                                <td>{course.code}</td>
                                <td>{course.description}</td>
                                <td>{course.tfCompute}</td>
                                <td>{course.lecUnit}</td>
                                <td>{course.labUnit}</td>
                                <td>{course.creditUnit}</td>
                                <td>{course.lecHr}</td>
                                <td>{course.labHr}</td>
                                <td>{course.section}</td>
                                <td>
                                    {course.schedule.map((time, i) => (
                                        <div key={i}>{time}</div>
                                    ))}
                                </td>
                                <td>{course.teacher}</td>
                                <td>{course.email}</td>
                                <td>{course.status}</td>
                                <td>{course.specialClass}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="2">{totalCourses}</td>
                            <td colSpan="2">{totalTFCompute}</td>
                            <td>{totalLecUnits}</td>
                            <td>{totalLabUnits}</td>
                            <td>{totalCreditUnits}</td>
                            <td colSpan="2">{totalLecHrs}</td>
                            <td colSpan="2">{totalLabHrs}</td>
                            <td colSpan="5"></td>
                        </tr>
                    </tfoot>
                </Table>
                <div className="d-flex justify-content-between mb-4">
                    <Link type="button" className="btn btn-primary" to="/enrollment">
                        Confirm
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default IT2R2;
