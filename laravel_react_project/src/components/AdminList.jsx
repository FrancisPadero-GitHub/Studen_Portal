import { useRef, useState, useEffect } from "react";
import axiosClient from "../axiosClient";
import axios from 'axios'; // Import axios if you're using it directly
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function AdminList() {

    // Define your refs here
    const infoIdRef = useRef();
    const lastNameRef = useRef();
    const firstNameRef = useRef();
    const middleNameRef = useRef();
    const middleInitialRef = useRef();
    const extRef = useRef();
    const genderRef = useRef();
    const ageRef = useRef();
    const dateOfBirthRef = useRef();
    const placeOfBirthRef = useRef();
    const civilStatusRef = useRef();
    const nationalityRef = useRef();
    const religionRef = useRef();
    const emailRef1 = useRef();
    const contactNumberRef = useRef();
    const heightRef = useRef();
    const weightRef = useRef();
    const bloodTypeRef = useRef();
    const ethnicityRef = useRef();
    const addressRef = useRef();
    const provinceRef = useRef();
    const municipalityRef = useRef();
    const barangayRef = useRef();
    const zipCodeRef = useRef();
    const emergencyContactPersonRef = useRef();
    const emergencyAddressRef = useRef();
    const emergencyMobileNumberRef = useRef();
    const passwordRef = useRef();
    const departmentRef = useRef();

    // State for modal visibility and selected admin
    const [showModal, setShowModal] = useState(false);
    const [admin2, setadmin2] = useState({});
    const [isConfirmed, setIsConfirmed] = useState(false);

    // Form Submit Merged All http requests
    const handleSubmit = async (ev) => {
        ev.preventDefault();

        if (!isConfirmed) {
            const userConfirmed = window.confirm("Are you sure you want to submit the form?");
            if (!userConfirmed) {
                console.log("Form submission canceled by user.");
                return; // Exit the function if user cancels
            }
            setIsConfirmed(true);
        }

        // Set loading state to true
        setLoading(true);

        // Construct payloads for the different requests
        const personalInfoPayload = {
            info_id: infoIdRef.current.value,
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
            email: emailRef1.current.value,
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

        const loginPayload = {
            login_id: infoIdRef.current.value,
            email: emailRef1.current.value,
            password: passwordRef.current.value,
            account: 'admin',
        };

        const adminPayload = {
            admin_id: infoIdRef.current.value,
            login_id: infoIdRef.current.value,
            department: departmentRef.current.value,
        };

        // Send requests concurrently
        try {
            await axios.all([
                axiosClient.post("/personalInfo", personalInfoPayload),
                axiosClient.post("/register", loginPayload),
                axiosClient.post("/admin", adminPayload)
            ]);

            // If all requests are successful
            window.alert("Form submitted successfully. Please wait for updates or visit the administrators at school.");
            console.log("Form submission successful:");

            // Optional: Navigate or close modal if applicable
            window.location.reload();
            navigate("#"); // if using react-router-dom for navigation
        } catch (error) {
            console.error("Error submitting forms:", error);
        } finally {
            // Reset loading state
            setLoading(false);
        }
    };
    

    // Function to handle row click to view admin details
    const [selectedAdmin, setSelectedAdmin] = useState(null);

    const handleDelete = (admin) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete this administrator?`);

        if (isConfirmed) {
            console.log("User confirmed the deletion.");
            // Set the selected administrator to be deleted
            setSelectedAdmin(admin);

            // Proceed with the deletion by calling deleteAdmin with admin.admin_id
            deleteAdmin(admin.admin_id);
        } else {
            console.log("Deletion cancelled by the user.");
        }
    };

    //  Delete Function Merged
    const navigate = useNavigate();
    const deleteAdmin = (id) => {
        setLoading(true);

        // Create delete requests for all three endpoints
        const deleteAdminRequest = axiosClient.delete(`/admin/${id}`);
        const deletePersonalInfoRequest = axiosClient.delete(`/personalInfo/${id}`);
        const deleteLoginInfo = axiosClient.delete(`/users/${id}`);

        // Use axios.all to handle all requests concurrently
        axios.all([deleteAdminRequest, deletePersonalInfoRequest, deleteLoginInfo])
            .then(axios.spread((adminResponse, personalInfoResponse, userResponse) => {
                // Log successful deletions
                console.log('Administrator deleted successfully from admin table:', adminResponse.data);
                console.log('Administrator personal info deleted successfully:', personalInfoResponse.data);
                console.log('Administrator login info deleted successfully:', userResponse.data);

                // Update the state to remove the deleted administrator
                setadmininfo(adminInfo => adminInfo.filter(admin => admin.admin_id !== id));

                // Clear the selected administrator after successful deletion
                setSelectedAdmin(null);

                // Navigate to the home page and reload the window after deletion
                window.location.reload();
                navigate("#");
            }))
            .catch(error => {
                // Handle errors from any of the requests
                console.error('Error deleting administrator or associated info:', error);
            })
            .finally(() => {
                // Reset loading state in both success and error cases
                setLoading(false);
            });
    };




    // Function to handle "Add / Register" button click to just show the modal
    const handleAddRegisterClick = () => {
        setSelectedAdmin(null);  // Ensure no admin is selected
        setShowModal(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

    //

    // Fetch data for the table
    const [admininfo, setadmininfo] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchAdmin();
    }, []);

    const fetchAdmin = () => {
        setLoading(true);
        axiosClient.get('/admin')
            .then(response => {
                const data = response.data.data;
                console.log(data[0].admin_id)
                fetchPersonalInfoAdmin(data[0].admin_id)
                setadmininfo(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching admin:', error);
                setLoading(false);
            });
    };

    const fetchPersonalInfoAdmin = (id) => {
        axiosClient.get(`/personalInfo/fetch/${id}`)
            .then((response) => {
                setadmin2(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching personal information name and email:", error);
            });
    };



    return (
        <main className="content px-4 py-2">
            <div className="d-flex justify-content-center align-items-center flex-column mb-3">
                <h4 className="text-center">Administrators</h4>
            </div>
            <div className="text-end mb-1 me-0">
                <Button
                    className="btn btn-primary"
                    style={{ fontSize: '13px', padding: '1px 10px' }}
                    onClick={handleAddRegisterClick}
                >
                    Add / Register
                </Button>
            </div>
            <div className="card animated fadeInDown">
                <div className="card-body">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Admin ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th className="text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center">Loading...</td>
                                </tr>
                            ) : admininfo.length > 0 ? (
                                admininfo.map((admin, index) => (
                                    <tr key={index}>
                                        <td>{admin.admin_id}</td>
                                        <td>{admin.admin_id === admin2.info_id ? admin2.first_name + " " + admin2.middle_initial + ". " + admin2.last_name : "ID mismatched"} </td>
                                        <td>{admin.admin_id === admin2.info_id ? admin2.email : "ID mismatched"}</td>
                                        <td>{admin.department}</td>

                                        <td className='text-end'>
                                            <Button
                                                variant="danger"
                                                style={{ fontSize: '13px', padding: '1px 10px' }}
                                                onClick={() => handleDelete(admin)}
                                            >
                                                Delete
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

            {/* Modal for displaying admin details or Add/Register form */}
            <Modal
                show={showModal}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
                centered
                dialogClassName="modal-dialog-scrollable"
            >
                <Modal.Header closeButton>
                    {/* <Modal.Title>{selectedAdmin ? "Admin Details" : "Add / Register Admin"}</Modal.Title> */}
                </Modal.Header>
                <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="card">
                            <div className="card-body" id="regisForm">
                                <p className="text-center mb-2" id="header">Registration Form</p>

                                {/* Row 1 */}
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <label htmlFor="lastName" className="form-label">Last Name</label>
                                        <input ref={lastNameRef} type="text" className="form-control form-control-sm" id="lastName" name="last_name" required />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="firstName" className="form-label">First Name</label>
                                        <input ref={firstNameRef} type="text" className="form-control form-control-sm" id="firstName" name="first_name" required />
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <label htmlFor="middleName" className="form-label">Middle Name</label>
                                        <input ref={middleNameRef} type="text" className="form-control form-control-sm" id="middleName" name="middle_name" required />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="middle_initial" className="form-label">M.I</label>
                                        <input ref={middleInitialRef} type="text" className="form-control form-control-sm" id="middle_initial" name="middle_initial" maxLength="1" />
                                    </div>
                                </div>

                                {/* Row 3 */}
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <label htmlFor="ext" className="form-label">Ext.</label>
                                        <input ref={extRef} type="text" className="form-control form-control-sm" id="ext" name="ext" />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="age" className="form-label">Age</label>
                                        <input ref={ageRef} type="number" className="form-control form-control-sm" id="age" name="age" required />
                                    </div>
                                </div>

                                {/* Row 4 */}
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <label htmlFor="gender" className="form-label">Gender</label>
                                        <select ref={genderRef} className="form-select form-select-sm" id="gender" name="gender" required>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="date_of_birth" className="form-label">Date of Birth</label>
                                        <input ref={dateOfBirthRef} type="date" className="form-control form-control-sm" id="date_of_birth" name="date_of_birth" required />
                                    </div>
                                </div>

                                {/* Row 5 */}
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <label htmlFor="place_of_birth" className="form-label">Place of Birth</label>
                                        <input ref={placeOfBirthRef} type="text" className="form-control form-control-sm" id="place_of_birth" name="place_of_birth" required />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="civilStatus" className="form-label">Civil Status</label>
                                        <select ref={civilStatusRef} className="form-select form-select-sm" id="civilStatus" required>
                                            <option value="Single">Single</option>
                                            <option value="Married">Married</option>
                                            <option value="Complicated">Complicated</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Row 6 */}
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <label htmlFor="nationality" className="form-label">Nationality</label>
                                        <select ref={nationalityRef} className="form-select form-select-sm" id="nationality" name="nationality" required>
                                            <option value="Filipino">Filipino</option>
                                            <option value="Japanese">Japanese</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="phone" className="form-label">Contact #</label>
                                        <input ref={contactNumberRef} type="text" className="form-control form-control-sm" id="contact_number" name="contact_number" required />
                                    </div>
                                </div>

                                {/* Row 7 */}
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input ref={emailRef1} type="text" className="form-control form-control-sm" id="email" name="email" required />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="religion" className="form-label">Religion</label>
                                        <input ref={religionRef} className="form-control form-control-sm" id="religion" name="religion" required />
                                    </div>
                                </div>

                                {/* Row 8 */}
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <label htmlFor="ethnicity" className="form-label">Ethnicity</label>
                                        <input ref={ethnicityRef} type="text" className="form-control form-control-sm" id="ethnicity" name="ethnicity" required />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="height" className="form-label">Height (m)</label>
                                        <input ref={heightRef} type="number" step="0.1" className="form-control form-control-sm" id="height" name="height" required />
                                    </div>
                                </div>

                                {/* Row 9 */}
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <label htmlFor="weight" className="form-label">Weight (kg)</label>
                                        <input ref={weightRef} type="number" step="0.1" className="form-control form-control-sm" id="weight" name="weight" required />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="bloodType" className="form-label">Blood Type</label>
                                        <input ref={bloodTypeRef} type="text" className="form-control form-control-sm" id="bloodType" name="blood_type" required />
                                    </div>
                                </div>

                                {/* Row 10 */}
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <label htmlFor="address" className="form-label">Address(House#/Block/Street)</label>
                                        <input ref={addressRef} type="text" className="form-control form-control-sm" id="address" name="address" required />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="province" className="form-label">Province</label>
                                        <input ref={provinceRef} type="text" className="form-control form-control-sm" id="province" name="province" required />
                                    </div>
                                </div>

                                {/* Row 11 */}
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <label htmlFor="municipality" className="form-label">Municipality</label>
                                        <input ref={municipalityRef} type="text" className="form-control form-control-sm" id="municipality" name="municipality" required />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="barangay" className="form-label">Barangay</label>
                                        <input ref={barangayRef} type="text" className="form-control form-control-sm" id="barangay" name="barangay" required />
                                    </div>
                                </div>

                                {/* Row 12 */}
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <label htmlFor="zip_code" className="form-label">Zip Code</label>
                                        <input ref={zipCodeRef} type="text" className="form-control form-control-sm" id="zip_code" name="zip_code" required />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="emergency_contact_person" className="form-label">Emergency Contact Person</label>
                                        <input ref={emergencyContactPersonRef} type="text" className="form-control form-control-sm" id="emergency_contact_person" name="emergency_contact_person" required />
                                    </div>
                                </div>

                                {/* Row 13 */}
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <label htmlFor="emergency_address" className="form-label">Emergency Address</label>
                                        <input ref={emergencyAddressRef} type="text" className="form-control form-control-sm" id="emergency_address" name="emergency_address" required />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="emergency_mobile_number" className="form-label">Emergency Mobile Number</label>
                                        <input ref={emergencyMobileNumberRef} type="text" className="form-control form-control-sm" id="emergency_mobile_number" name="emergency_mobile_number" required />
                                    </div>
                                </div>

                                <hr />
                                <p className="text-center mb-2" id="header">Login Information</p>

                                <div className="row mb-2">
                                    <div className="col-sm-12">
                                        <label htmlFor="department" className="form-label">Department</label>
                                        <input ref={departmentRef} type="text" className="form-control form-control-sm" id="department" name="department" required />
                                    </div>
                                </div>

                                <div className="row mb-2">
                                    <div className="col-sm-12">
                                        <label htmlFor="info_id" className="form-label">Admin ID</label>
                                        <input ref={infoIdRef} type="text" className="form-control form-control-sm" id="info_id" name="info_id" required />
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-12">
                                        <label htmlFor="emailLogin" className="form-label">Email</label>
                                        <input ref={emailRef1} type="text" className="form-control form-control-sm" id="emailLogin" name="emailLogin" required />
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-12">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input ref={passwordRef} type="text" className="form-control form-control-sm" id="password" name="password" required />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-end">
                            <button type="submit" className="btn btn-primary btn-sm">Save</button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </main>
    );
}
