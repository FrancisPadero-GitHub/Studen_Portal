import React from "react";
import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
// You still need the ID on this one

export default function StudentProfile() {

    // Fetch the ID that is currently tokened and signed in
    const { user, setUser } = useStateContext();
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
            // Assign that ID to the Students table to filter it
            const studentId = data.id;
            getStudents(studentId);
        });
    }, [setUser]);

    const [students, setStudents] = useState([]);
    const getStudents = (id) => {
        axiosClient.get(`/students/${id}`)
            .then(response => {
                const allStudents = response.data.data;
                // Set the fetched students data in the state
                setStudents(allStudents);
            })
            .catch(error => {
                // Handle any errors here
                console.error('Error fetching students:', error);
            });
    };



    const onSubmit = ev => {
        ev.preventDefault();
        const request = axiosClient.put(`/students/${user.id}`, stud);
        request
            .then(() => {
                Navigate("#")
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };


    return (
        <main className="content px-3 py-2 d-flex justify-content-center">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/home">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Profile</li>
                </ol>
            </nav>
            
            <div className="container" id="cont">
                <div className="row">
                    <div className="col" id="profileContainer">
                        <div className="container" id="rightCont">
                            <div className="card" id="profileCard">
                                <img src="/formal_picture.png" className="card-img-top" alt="Profile Image" id="formalImg" />
                                <div className="card-body">
                                    <p className="card-text lead text-center mb-0">
                                        {students.first_name} {students.middle_initial ? students.middle_initial + '.' : ''} {students.last_name}

                                    </p>


                                    <div className="text-center mb-1">
                                        <em>2020300597</em>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-info">STUDENT</p>
                                    </div>
                                    <hr />
                                    <div className="text-center">
                                        <p className="text-info">Status:</p>
                                        <p className="text-success">Enrolled</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container" id="leftCont">
                            <form>
                                <h4>Student Personal Information</h4>
                                <div className="card" id="formCard">
                                    <div className="card-body" id="regisForm">
                                        <p className="text-center mb-2" id="header">Personal Information</p>
                                        <div className="row mb-2 justify-content-center">
                                            <div className="col-sm-3">
                                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                                <input value={students.last_name} type="text" className="form-control form-control-md" id="lastName" placeholder="Francis" disabled readOnly />
                                            </div>
                                            <div className="col-sm-3">
                                                <label htmlFor="firstName" className="form-label">First Name</label>
                                                <input value={students.first_name} type="text" className="form-control form-control-md" id="firstName" placeholder="Padero" disabled readOnly />
                                            </div>
                                            <div className="col-sm-3">
                                                <label htmlFor="middleName" className="form-label">Middle Name</label>
                                                <input value={students.middle_name} type="text" className="form-control form-control-md" id="middleName" placeholder="Sevilla" disabled readOnly />
                                            </div>

                                            <div className="col-sm-1">
                                                <label htmlFor="middle_initial" className="form-label">M.I</label>
                                                <input value={students.middle_initial} type="text" className="form-control form-control-md" id="middle_initial" name="middle_initial" maxLength="1" />
                                            </div>
                                            <div className="col-sm-1">
                                                <label htmlFor="ext" className="form-label">Ext.</label>
                                                <input value={students.ext} type="text" className="form-control form-control-md" id="ext" name="ext" />
                                            </div>
                                            <div className="col-sm-1">
                                                <label htmlFor="age" className="form-label">Age</label>
                                                <input value={students.age} type="number" className="form-control form-control-md" id="age" name="age" />
                                            </div>
                                        </div>

                                        <div className="row mb-2 justify-content-center">
                                            <div className="col-sm-3">
                                                <label htmlFor="gender" className="form-label">Gender</label>
                                                <select value={students.gender} className="form-select form-select-md" id="gender" name="gender" disabled readOnly >
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>

                                            <div className="col-sm-3">
                                                <label htmlFor="date_of_birth" className="form-label">Date of Birth</label>
                                                <input value={students.date_of_birth} type="date" className="form-control form-control-md" id="date_of_birth" name="date_of_birth" />
                                            </div>

                                            <div className="col-sm-3">
                                                <label htmlFor="place_of_birth" className="form-label">Place of Birth</label>
                                                <input value={students.place_of_birth} type="text" className="form-control form-control-md" id="place_of_birth" name="place_of_birth" />
                                            </div>

                                            <div className="col-sm-3">
                                                <label htmlFor="civilStatus" className="form-label">Civil Status</label>
                                                <select value={students.civil_status} className="form-select form-select-md" id="civilStatus" >
                                                    <option value="Single">Single</option>
                                                    <option value="Married">Married</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row mb-2 justify-content-center">
                                            <div className="col-sm-3">
                                                <label htmlFor="nationality" className="form-label">Nationality</label>
                                                <select value={students.nationality} className="form-select form-select-md" id="nationality" name="nationality"  >
                                                    <option value="">Select</option>
                                                    <option value="Filipino">Filipino</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            <div className="col-sm-3">
                                                <label htmlFor="contact_number" className="form-label">Contact #</label>
                                                <input value={students.contact_number} type="text" className="form-control form-control-md" id="contact_number" name="contact_number" />
                                            </div>

                                            <div className="col-sm-3">
                                                <label htmlFor="email" className="form-label">Email</label>
                                                <input value={students.email} type="text" className="form-control form-control-md" id="email" name="text" />
                                            </div>

                                            <div className="col-sm-3">
                                                <label htmlFor="religion" className="form-label">Religion</label>
                                                <input value={students.religion} type="text" className="form-control form-control-md" id="religion" name="religion" />
                                            </div>

                                        </div>


                                        <div className="row mb-2 justify-content-center">
                                            <div className="col-sm-3">
                                                <label htmlFor="ethnicity" className="form-label">Ethnicity</label>
                                                <input value={students.ethnicity} type="text" className="form-control form-control-md" id="ethnicity" name="ethnicity" />
                                            </div>
                                            <div className="col-sm-2">
                                                <label htmlFor="height" className="form-label">Height (m)</label>
                                                <input value={students.height} type="number" step="0.1" className="form-control form-control-md" id="height" name="height" />
                                            </div>
                                            <div className="col-sm-2">
                                                <label htmlFor="weight" className="form-label">Weight (kg)</label>
                                                <input value={students.weight} type="number" step="0.1" className="form-control form-control-md" id="weight" name="weight" />
                                            </div>
                                            <div className="col-sm-2">
                                                <label htmlFor="bloodType" className="form-label">Blood Type</label>
                                                <input value={students.blood_type} type="text" className="form-control form-control-md" id="bloodType" name="blood_type" />
                                            </div>

                                            <div className="col-sm-3">
                                                <label htmlFor="address" className="form-label">Address(House#/Block/Street)</label>
                                                <input value={students.address} type="text" className="form-control form-control-md" id="address" name="address" />
                                            </div>

                                        </div>

                                        <div className="row mb-2 justify-content-center">

                                            <div className="col-sm-3">
                                                <label htmlFor="province" className="form-label">Province</label>
                                                <input value={students.province} type="text" className="form-control form-control-md" id="province" name="province" />
                                            </div>
                                            <div className="col-sm-3">
                                                <label htmlFor="municipality" className="form-label">Municipality</label>
                                                <input value={students.municipality} type="text" className="form-control form-control-md" id="municipality" name="municipality" />
                                            </div>

                                            <div className="col-sm-3">
                                                <label htmlFor="barangay" className="form-label">Barangay</label>
                                                <input value={students.barangay} type="text" className="form-control form-control-md" id="barangay" name="barangay" />
                                            </div>
                                            <div className="col-sm-3">
                                                <label htmlFor="zip_code" className="form-label">Zip Code</label>
                                                <input value={students.zip_code} type="text" className="form-control form-control-md" id="zip_code" name="zip_code" />
                                            </div>

                                        </div>

                                        <div className="row mb-4 justify-content-center">
                                            <div className="col-sm-3">
                                                <label htmlFor="emergency_contact_person" className="form-label">Emergency Contact Person</label>
                                                <input value={students.emergency_contact_person} type="text" className="form-control form-control-md" id="emergency_contact_person" name="emergency_contact_person" />
                                            </div>
                                            <div className="col-sm-3">
                                                <label htmlFor="emergency_address" className="form-label">Emergency Address</label>
                                                <input value={students.emergency_address} type="text" className="form-control form-control-md" id="emergency_address" name="emergency_address" />
                                            </div>
                                            <div className="col-sm-3">
                                                <label htmlFor="emergency_mobile_number" className="form-label">Emergency Mobile Number</label>
                                                <input value={students.emergency_mobile_number} type="text" className="form-control form-control-md" id="emergency_mobile_number" name="emergency_mobile_number" />
                                            </div>
                                        </div>
                                        <div className="text-end">
                                            <button type="submit" className="btn btn-primary btn-sm">Update</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}