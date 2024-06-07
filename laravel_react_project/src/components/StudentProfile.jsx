import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

export default function StudentProfile() {
  // Fetch the user context
  const { user, setUser } = useStateContext();

  // State for students' data
  const [students, setStudents] = useState({});
  // State for form inputs
  const [formData, setFormData] = useState({});
  // State for loading status
  const [loading, setLoading] = useState(true);

  // Fetch user and student data on component mount
  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
      // Fetch the student's data using the user's ID
      const studentId = data.id;
      getStudents(studentId);
    });
  }, [setUser]);

  const getStudents = (id) => {
    axiosClient.get(`/students/${id}`)
      .then(response => {
        const studentData = response.data.data;
        setStudents(studentData);
        setFormData(studentData); // Populate form with fetched data
        setLoading(false); // Data loaded, set loading to false
      })
      .catch(error => {
        console.error('Error fetching students:', error);
        setLoading(false); // Stop loading even if there was an error
      });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const onSubmit = (ev) => {
    ev.preventDefault();
    axiosClient.put(`/students/${user.id}`, formData)
      .then(() => {
        // Optionally, you can fetch the updated data again to refresh the state
        getStudents(user.id);
        alert('Profile updated successfully!');
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          console.error('Validation errors:', response.data.errors);
        } else {
          console.error('Update failed:', err);
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
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="row">
            <div className="col" id="profileContainer">
              <div className="container" id="rightCont">
                <div className="card" id="profileCard">
                    <img
                      src={students.gender === 'Female' ? '/profile_girl.jpg' : '/profile.jpg'}
                      className="card-img-top"
                      alt="Profile Image"
                      id="formalImg"
                    />
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
                <form onSubmit={onSubmit}>
                  <h4>Student Personal Information</h4>
                  <div className="card" id="formCard">
                    <div className="card-body" id="regisForm">
                      <p className="text-center mb-2" id="header">Personal Information</p>
                      <div className="row mb-2 justify-content-center">
                        <div className="col-sm-3">
                          <label htmlFor="lastName" className="form-label">Last Name</label>
                          <input
                            value={formData.last_name || ''}
                            onChange={handleChange}
                            type="text"
                            className="form-control form-control-md"
                            id="lastName"
                            name="last_name"
                            required
                          />
                        </div>
                        <div className="col-sm-3">
                          <label htmlFor="firstName" className="form-label">First Name</label>
                          <input
                            value={formData.first_name || ''}
                            onChange={handleChange}
                            type="text"
                            className="form-control form-control-md"
                            id="firstName"
                            name="first_name"
                            required
                          />
                        </div>
                        <div className="col-sm-3">
                          <label htmlFor="middleName" className="form-label">Middle Name</label>
                          <input
                            value={formData.middle_name || ''}
                            onChange={handleChange}
                            type="text"
                            className="form-control form-control-md"
                            id="middleName"
                            name="middle_name"
                            required
                          />
                        </div>

                        <div className="col-sm-1">
                          <label htmlFor="middle_initial" className="form-label">M.I</label>
                          <input
                            value={formData.middle_initial || ''}
                            onChange={handleChange}
                            type="text"
                            className="form-control form-control-md"
                            id="middle_initial"
                            name="middle_initial"
                            maxLength="1"
                            required
                          />
                        </div>
                        <div className="col-sm-1">
                          <label htmlFor="ext" className="form-label">Ext.</label>
                          <input
                            value={formData.ext || ''}
                            onChange={handleChange}
                            type="text"
                            className="form-control form-control-md"
                            id="ext"
                            name="ext"
                          />
                        </div>
                        <div className="col-sm-1">
                          <label htmlFor="age" className="form-label">Age</label>
                          <input
                            value={formData.age || ''}
                            onChange={handleChange}
                            type="number"
                            className="form-control form-control-md"
                            id="age"
                            name="age"
                          />
                        </div>
                      </div>

                      <div className="row mb-2 justify-content-center">
                        <div className="col-sm-3">
                          <label htmlFor="gender" className="form-label">Gender</label>
                          <select
                            value={formData.gender || ''}
                            onChange={handleChange}
                            className="form-select form-select-md"
                            id="gender"
                            name="gender"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div className="col-sm-3">
                          <label htmlFor="date_of_birth" className="form-label">Date of Birth</label>
                          <input
                            value={formData.date_of_birth || ''}
                            onChange={handleChange}
                            type="date"
                            className="form-control form-control-md"
                            id="date_of_birth"
                            name="date_of_birth"
                          />
                        </div>

                        <div className="col-sm-3">
                          <label htmlFor="place_of_birth" className="form-label">Place of Birth</label>
                          <input
                            value={formData.place_of_birth || ''}
                            onChange={handleChange}
                            type="text"
                            className="form-control form-control-md"
                            id="place_of_birth"
                            name="place_of_birth"
                          />
                        </div>

                        <div className="col-sm-3">
                          <label htmlFor="civilStatus" className="form-label">Civil Status</label>
                          <select
                            value={formData.civil_status || ''}
                            onChange={handleChange}
                            className="form-select form-select-md"
                            id="civilStatus"
                            name="civil_status"
                          >
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="row mb-2 justify-content-center">
                        <div className="col-sm-3">
                          <label htmlFor="nationality" className="form-label">Nationality</label>
                          <select
                            value={formData.nationality || ''}
                            onChange={handleChange}
                            className="form-select form-select-md"
                            id="nationality"
                            name="nationality"
                          >
                            <option value="">Select</option>
                            <option value="Filipino">Filipino</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="col-sm-3">
                          <label htmlFor="contact_number" className="form-label">Contact #</label>
                          <input
                            value={formData.contact_number || ''}
                            onChange={handleChange}
                            type="text"
                            className="form-control form-control-md"
                            id="contact_number"
                            name="contact_number"
                            required
                          />
                        </div>

                        <div className="col-sm-3">
                          <label htmlFor="email" className="form-label">Email</label>
                          <input
                            value={formData.email || ''}
                            onChange={handleChange}
                            type="email"
                            className="form-control form-control-md"
                            id="email"
                            name="email"
                            required
                          />
                        </div>

                        <div className="col-sm-3">
                          <label htmlFor="religion" className="form-label">Religion</label>
                          <input
                            value={formData.religion || ''}
                            onChange={handleChange}
                            type="text"
                            className="form-control form-control-md"
                            id="religion"
                            name="religion"
                          />
                        </div>
                      </div>

                      <div className="row mb-2 justify-content-center">
                        <div className="col-sm-3">
                          <label htmlFor="ethnicity" className="form-label">Ethnicity</label>
                          <input
                            value={formData.ethnicity || ''}
                            onChange={handleChange}
                            type="text"
                            className="form-control form-control-md"
                            id="ethnicity"
                            name="ethnicity"
                          />
                        </div>
                        <div className="col-sm-2">
                          <label htmlFor="height" className="form-label">Height (m)</label>
                          <input
                            value={formData.height || ''}
                            onChange={handleChange}
                            type="number"
                            step="0.1"
                            className="form-control form-control-md"
                            id="height"
                            name="height"
                          />
                        </div>
                        <div className="col-sm-2">
                          <label htmlFor="weight" className="form-label">Weight (kg)</label>
                          <input
                            value={formData.weight || ''}
                            onChange={handleChange}
                            type="number"
                            step="0.1"
                            className="form-control form-control-md"
                            id="weight"
                            name="weight"
                          />
                        </div>
                        <div className="col-sm-2">
                          <label htmlFor="bloodType" className="form-label">Blood Type</label>
                          <input
                            value={formData.blood_type || ''}
                            onChange={handleChange}
                            type="text"
                            className="form-control form-control-md"
                            id="bloodType"
                            name="blood_type"
                          />
                        </div>
                        <div className="col-sm-3">
                          <label htmlFor="address" className="form-label">Address (House#/Block/Street)</label>
                          <input
                            value={formData.address || ''}
                            onChange={handleChange}
                            type="text"
                            className="form-control form-control-md"
                            id="address"
                            name="address"
                          />
                        </div>
                      </div>

                      <div className="row mb-2 justify-content-center">
                        <div className="col-sm-3">
                          <label htmlFor="province" className="form-label">Province</label>
                          <input
                            value={formData.province || ''}
                            onChange={handleChange}
                            type="text"
                            className="form-control form-control-md"
                            id="province"
                            name="province"
                          />
                        </div>
                        <div className="col-sm-3">
                          <label htmlFor="municipality" className="form-label">Municipality</label>
                          <input
                            value={formData.municipality || ''}
                            onChange={handleChange}
                            type="text"
                            className="form-control form-control-md"
                            id="municipality"
                            name="municipality"
                          />
                        </div>

                        <div className="col-sm-3">
                          <label htmlFor="barangay" className="form-label">Barangay</label>
                          <input
                            value={formData.barangay || ''}
                            onChange={handleChange}
                            type="text"
                            className="form-control form-control-md"
                            id="barangay"
                            name="barangay"
                          />
                        </div>
                        <div className="col-sm-3">
                          <label htmlFor="zip_code" className="form-label">Zip Code</label>
                          <input
                            value={formData.zip_code || ''}
                            onChange={handleChange}
                            type="text"
                            className="form-control form-control-md"
                            id="zip_code"
                            name="zip_code"
                          />
                        </div>
                      </div>

                      <div className="row mb-4 justify-content-center">
                        <div className="col-sm-3">
                          <label htmlFor="emergency_contact_person" className="form-label">Emergency Contact Person</label>
                          <input
                            value={formData.emergency_contact_person || ''}
                            onChange={handleChange}
                            type="text"
                            className="form-control form-control-md"
                            id="emergency_contact_person"
                            name="emergency_contact_person"
                          />
                        </div>
                        <div className="col-sm-3">
                          <label htmlFor="emergency_address" className="form-label">Emergency Address</label>
                          <input
                            value={formData.emergency_address || ''}
                            onChange={handleChange}
                            type="text"
                            className="form-control form-control-md"
                            id="emergency_address"
                            name="emergency_address"
                          />
                        </div>
                        <div className="col-sm-3">
                          <label htmlFor="emergency_mobile_number" className="form-label">Emergency Mobile Number</label>
                          <input
                            value={formData.emergency_mobile_number || ''}
                            onChange={handleChange}
                            type="text"
                            className="form-control form-control-md"
                            id="emergency_mobile_number"
                            name="emergency_mobile_number"
                          />
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
        )}
      </div>
    </main>
  );
}
