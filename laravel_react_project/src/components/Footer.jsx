import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container-fluid">
                <div className="row text-muted">
                    <div className="col-6 text-start">
                        <p className="mb-0">
                            <a href="#" className="text-muted">
                                <label>Byte Me If You Can © 2024</label>
                            </a>
                        </p>
                    </div>
                    <div className="col-6 text-end">
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <a href="#" className="text-muted">Contact</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#" className="text-muted">About Us</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#" className="text-muted">Terms</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#" className="text-muted">Booking</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
