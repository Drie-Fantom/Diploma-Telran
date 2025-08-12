import React from 'react';
import Title from '../ui/title';
import Img1 from '../../../assets/icons/instagram.png';
import Img2 from '../../../assets/icons/whatsapp.png';

const footer = () => {
    const phoneNumber = '+49 999 999 99 99';
    const address = 'Linkstraße 2, 8 OG, 10785, Berlin, Deutschland';
    const workingHours = '24 hours a day';

    return (
        <footer className="footer">
            <Title text="Contact" />
            <div className="contact-grid">
                <div className="phone">
                    <p className="contact-label">Phone</p>
                    <a href={`tel:$`}>{phoneNumber}</a>
                </div>
                <div className="socials">
                    <p className="contact-label">Socials</p>
                    <div className="social-icons">
                        <img src={Img1} alt="Instagram" />
                        <img src={Img2} alt="Whatsapp" />
                    </div>
                </div>
                <div className="address">
                    <p className="contact-label">Address</p>
                    <p>{address}</p>
                </div>
                <div className="hours">
                    <p className="contact-label">Working Hours</p>
                    <p>{workingHours}</p>
                </div>
            </div>
            <div className="map-container">
                <iframe
                    src="https://www.google.com/maps?q=Starta Institute by Tel-Ran,%2010785%20Berlin&z=16&output=embed"
                    loading="lazy"
                ></iframe>
            </div>
        </footer>
    );
};

export default footer;