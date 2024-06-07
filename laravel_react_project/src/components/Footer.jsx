import React from 'react';
// Footman Sevare update 
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
                        <ul className="list-inline ">
                            <li className="list-inline-item pe-2">
                                <a href="https://web.facebook.com/profile.php?id=100093372504994" target='_blank' className="text-muted">Contact Gwapo</a>
                            </li>
                            <li className="list-inline-item pe-2">
                                <a href="" className="text-muted">About Us</a>
                            </li>
                            <li className="list-inline-item pe-2">
                                <a href="#" className="text-muted">Terms</a>
                            </li>
                            <li className="list-inline-item pe-2">
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
