import React, { useRef } from "react";
import axiosClient from "../axiosClient";
import { useNavigate } from 'react-router-dom';


const StudInfoForm = () => {
    const lastNameRef = useRef(null);
    const firstNameRef = useRef(null);
    const middleNameRef = useRef(null);
    const middleInitialRef = useRef(null);
    const extRef = useRef(null);
    const genderRef = useRef(null);
    const ageRef = useRef(null);
    const dateOfBirthRef = useRef(null);
    const placeOfBirthRef = useRef(null);
    const civilStatusRef = useRef(null);
    const nationalityRef = useRef(null);
    const religionRef = useRef(null);
    const emailRef = useRef(null);
    const contactNumberRef = useRef(null);
    const heightRef = useRef(null);
    const weightRef = useRef(null);
    const bloodTypeRef = useRef(null);
    const ethnicityRef = useRef(null);
    const addressRef = useRef(null);
    const provinceRef = useRef(null);
    const municipalityRef = useRef(null);
    const barangayRef = useRef(null);
    const zipCodeRef = useRef(null);
    const emergencyContactPersonRef = useRef(null);
    const emergencyAddressRef = useRef(null);
    const emergencyMobileNumberRef = useRef(null);

    // this is for the redirection
    const navigate = useNavigate();

    const handleSubmit = (ev) => {
        ev.preventDefault();

        // Prepare payload
        const payload = {
            last_name: lastNameRef.current.value,
            first_name: firstNameRef.current.value,
            middle_name: middleNameRef.current.value,
            middle_initial: middleInitialRef.current.value,
            ext: extRef.current.value,
            gender: genderRef.current.value,
            age: ageRef.current.value,
            date_of_birth: dateOfBirthRef.current.value,
            place_of_birth: placeOfBirthRef.current.value,
            civil_status: civilStatusRef.current.value,
            nationality: nationalityRef.current.value,
            religion: religionRef.current.value,
            email: emailRef.current.value,
            contact_number: contactNumberRef.current.value,
            height: heightRef.current.value,
            weight: weightRef.current.value,
            blood_type: bloodTypeRef.current.value,
            ethnicity: ethnicityRef.current.value,
            address: addressRef.current.value,
            province: provinceRef.current.value,
            municipality: municipalityRef.current.value,
            barangay: barangayRef.current.value,
            zip_code: zipCodeRef.current.value,
            emergency_contact_person: emergencyContactPersonRef.current.value,
            emergency_address: emergencyAddressRef.current.value,
            emergency_mobile_number: emergencyMobileNumberRef.current.value,
        };
        // Create form data object
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
            formData.append(key, value);
        });

        // Log FormData object for inspection
        console.log(...formData);

        // Send POST request to your server using Axios
        axiosClient.post("/store", formData)
            .then(({ data }) => {
                navigate('/studentlist');
                console.log("Form submission successful:", data);
            })
            .catch(err => {
                console.error("Form submission failed:", err);
            });
    };

    return (
        <main className="content ps-5 px-4 py-2">
            <h2 className="text-center mb-5">Student Information</h2>
            <form onSubmit={handleSubmit}>

                <div className="row mb-4">
                    <div className="col-sm-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input ref={lastNameRef} type="text" className="form-control" id="lastName" name="last_name" required />
                    </div>
                    <div className="col-sm-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input ref={firstNameRef} type="text" className="form-control" id="firstName" name="first_name" required />
                    </div>
                    <div className="col-sm-3">
                        <label htmlFor="middleName" className="form-label">Middle Name</label>
                        <input ref={middleNameRef} type="text" className="form-control" id="middleName" name="middle_name" required />
                    </div>
                    <div className="col-md-1">
                        <label htmlFor="middle_initial" className="form-label">M.I</label>
                        <input ref={middleInitialRef} type="text" className="form-control" id="middle_initial" name="middle_initial" maxLength="1" />
                    </div>
                    <div className="col-md-1">
                        <label htmlFor="ext" className="form-label">Ext.</label>
                        <input ref={extRef} type="text" className="form-control" id="ext" name="ext" />
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-sm-2">
                        <label htmlFor="gender" className="form-label">Gender</label>
                        <select ref={genderRef} className="form-select" id="gender" name="gender" required>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="col-sm-1">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input ref={ageRef} type="number" className="form-control" id="age" name="age" required />
                    </div>

                    <div className="col-sm-3">
                        <label htmlFor="date_of_birth" className="form-label">Date of Birth</label>
                        <input ref={dateOfBirthRef} type="date" className="form-control" id="date_of_birth" name="date_of_birth" required />
                    </div>

                    <div className="col-sm-3">
                        <label htmlFor="place_of_birth" className="form-label">Place of Birth</label>
                        <input ref={placeOfBirthRef} type="text" className="form-control" id="place_of_birth" name="place_of_birth" required />
                    </div>

                    <div className="col-sm-2">
                        <label htmlFor="civilStatus" className="form-label">Civil Status</label>
                        <select ref={civilStatusRef} className="form-select" id="civilStatus" required>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-sm-3">
                        <label htmlFor="nationality" className="form-label">Nationality</label>
                        <select ref={nationalityRef} className="form-select" id="nationality" name="nationality" required >
                            <option value="">Select</option>
                            <option value="Filipino">Filipino</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="col-sm-3">
                        <label htmlFor="phone" className="form-label">Contact #</label>
                        <input ref={contactNumberRef} type="text" className="form-control" id="contact_number" name="contact_number" required />
                    </div>

                    <div className="col-sm-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input ref={emailRef} type="email" className="form-control" id="email" name="email" required />
                    </div>

                    <div className="col-sm-2">
                        <label htmlFor="religion" className="form-label">Religion</label>
                        <select ref={religionRef} className="form-select" id="religion" name="religion" required>
                            <option value="">Select</option>
                            <option value="Christian">Christian</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                </div>


                <div className="row mb-4">
                    <div className="col-sm-1">
                        <label htmlFor="height" className="form-label">Height (m)</label>
                        <input ref={heightRef} type="number" step="0.1" className="form-control" id="height" name="height" required />
                    </div>
                    <div className="col-sm-1">
                        <label htmlFor="weight" className="form-label">Weight (kg)</label>
                        <input ref={weightRef} type="number" step="0.1" className="form-control" id="weight" name="weight" required />
                    </div>
                    <div className="col-sm-1">
                        <label htmlFor="bloodType" className="form-label">Blood Type</label>
                        <input ref={bloodTypeRef} type="text" className="form-control" id="bloodType" name="blood_type" required />
                    </div>
                    <div className="col-sm-3">
                        <label htmlFor="ethnicity" className="form-label">Ethnicity</label>
                        <input ref={ethnicityRef} type="text" className="form-control" id="ethnicity" name="ethnicity" required />
                    </div>
                    <div className="col-sm-3">
                        <label htmlFor="address" className="form-label">Address(House#/Block/Street)</label>
                        <input ref={addressRef} type="text" className="form-control" id="address" name="address" required />
                    </div>
                    <div className="col-sm-2">
                        <label htmlFor="zip_code" className="form-label">Zip Code</label>
                        <input ref={zipCodeRef} type="text" className="form-control" id="zip_code" name="zip_code" required />
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-sm-3">
                        <label htmlFor="province" className="form-label">Province</label>
                        <input ref={provinceRef} type="text" className="form-control" id="province" name="province" required />
                    </div>
                    <div className="col-sm-3">
                        <label htmlFor="municipality" className="form-label">Municipality</label>
                        <input ref={municipalityRef} type="text" className="form-control" id="municipality" name="municipality" required />
                    </div>

                    <div className="col-sm-3">
                        <label htmlFor="emergency_contact_person" className="form-label">Emergency Contact Person</label>
                        <input ref={emergencyContactPersonRef} type="text" className="form-control" id="emergency_contact_person" name="emergency_contact_person" required />
                    </div>

                    <div className="col-sm-2">
                        <label htmlFor="barangay" className="form-label">Barangay</label>
                        <input ref={barangayRef} type="text" className="form-control" id="barangay" name="barangay" required />
                    </div>

                </div>

                <div className="row mb-4">
                    <div className="col-sm-3">
                        <label htmlFor="emergency_address" className="form-label">Emergency Address</label>
                        <input ref={emergencyAddressRef} type="text" className="form-control" id="emergency_address" name="emergency_address" required />
                    </div>
                    <div className="col-sm-3">
                        <label htmlFor="emergency_mobile_number" className="form-label">Emergency Mobile Number</label>
                        <input ref={emergencyMobileNumberRef} type="text" className="form-control" id="emergency_mobile_number" name="emergency_mobile_number" required />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </main>
    );
}

export default StudInfoForm;
