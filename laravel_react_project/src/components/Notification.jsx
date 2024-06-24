import React, { useRef, useState, useEffect } from 'react';
import axiosClient from "../axiosClient";
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function Notification() {


    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notif, setNotif] = useState([]);
    const [selectedNotif, setSelectedNotif] = useState(null);

    // Fetch notifications when component mounts
    useEffect(() => {
        fetchNotification();
    }, []);

    const fetchNotification = () => {
        setLoading(true);
        axiosClient.get('/notification')
            .then(response => {
                const allNotification = response.data.data;
                setNotif(allNotification);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching notifications:', error);
                setLoading(false);
            });
    };

    const handleDelete = (notif) => {
        // Prompt for confirmation before setting the notification to be deleted
        const isConfirmed = window.confirm(`Are you sure you want to delete this notification with title: ${notif.title}?`);

        if (isConfirmed) {
            console.log("User confirmed the deletion.");
            // Set the selected notification to be deleted
            setSelectedNotif(notif);

            // Proceed with the deletion
            deleteNotification(notif.id);
        } else {
            console.log("Deletion cancelled by the user.");
        }
    };

    const deleteNotification = (notifId) => {
        setLoading(true);
        axiosClient.delete(`/notification/${notifId}`)
            .then(response => {
                console.log('Notification deleted successfully:', response.data);
                // Update the state to remove the deleted notification
                setNotif(prevNotif => prevNotif.filter(notif => notif.id !== notifId));
                setLoading(false);
                // Clear the selected notification after deletion
                setSelectedNotif(null);
            })
            .catch(error => {
                console.error('Error deleting notification:', error);
                setLoading(false);
                // Clear the selected notification if deletion fails
                setSelectedNotif(null);
            });
    };

    const handleShow = () => {
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    const titleRef= useRef();
    const descriptionRef = useRef();

    const Submit = (ev) => {
        ev.preventDefault();

        const payload = {
            title: titleRef.current.value,
            description: descriptionRef.current.value
        }

        try {
            axiosClient.post("/notification", payload)
                .then(() => {
                    handleClose();
                    window.location.reload();
                    console.log("Notification Uploaded successful:");
                })
                .catch(err => {
                    console.error("Notification submission failed:", err);
                });
        } catch (error) {
            console.error("An error occurred while submitting the notification form:", error);
        }
    }

    const Update = (ev) => {
        ev.preventDefault();

        const payload = {
            title: titleRef.current.value,
            description: descriptionRef.current.value
        }

        try {
            axiosClient.put("/notification", payload)
                .then(() => {
                    handleClose();
                    window.location.reload();
                    console.log("Notification Uploaded successful:");
                })
                .catch(err => {
                    console.error("Notification submission failed:", err);
                });
        } catch (error) {
            console.error("An error occurred while submitting the notification form:", error);
        }
    }


    return (
        <main className="content px-4 py-2 mb-">
            <div className="text-end mb-2">
                <Button 
                variant="primary"
                onClick={handleShow}
                >
                    Add
                </Button>
            </div>
            <div className="card animated fadeInDown">
                <h3 className="text-center mt-2">Notifications</h3>
                <div className="card-body">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th className='text-end'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center">Loading...</td>
                                </tr>
                            ) : notif.length > 0 ? (
                                notif.map((notifs, index) => (
                                    <tr key={index}>
                                        <td>{notifs.title}</td>
                                        <td>{notifs.description}</td>
                                        <td className='text-end' style={{ padding: '5px', whiteSpace: 'nowrap' }}>
                                            {/* <Button
                                                variant="secondary "
                                                
                                                style={{
                                                    fontSize: '12px',   // Smaller font size
                                                    padding: '2px 6px', // Compact padding
                                                    margin: '0 3px',    // Minimal margin between buttons
                                                    minWidth: '45px',   // Reduced minimum width for consistency
                                                    minHeight: '25px'   // Reduced minimum height
                                                }}
                                                disabled
                                            // onClick={() => handleEdit(notifs)} // Assuming there's an edit handler
                                            >
                                                Edit
                                            </Button> */}

                                            <Button
                                                variant="danger"
                                                style={{
                                                    fontSize: '12px',   // Smaller font size
                                                    padding: '2px 6px', // Compact padding
                                                    margin: '0 3px',    // Minimal margin between buttons
                                                    minWidth: '45px',   // Reduced minimum width for consistency
                                                    minHeight: '25px'   // Reduced minimum height
                                                }}
                                                onClick={() => handleDelete(notifs)}
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
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input
                                            ref={titleRef}
                                            className="form-control form-control-md"
                                            id="title"
                                            name="title"
                                            required
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea
                                            ref={descriptionRef}  // Maintain the ref for accessing the DOM element
                                            className="form-control form-control-md"  // Bootstrap classes for styling
                                            id="description"  // Update the id to match the field
                                            name="description"  // Update the name to match the field
                                            required  // Ensure the field is required
                                            rows="5"  // Set the number of visible rows
                                            style={{ resize: 'none', overflowY: 'auto' }}  // Disable resizing and enable vertical scroll
                                            placeholder="Enter your description here..."  // Add a placeholder for user guidance
                                        ></textarea>
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