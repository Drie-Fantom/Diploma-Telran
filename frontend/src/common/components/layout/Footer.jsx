import React from 'react';
import InstagramIcon from '../../../assets/icons/instagram.svg?react';
import WhatsappIcon from '../../../assets/icons/whatsapp.svg?react';
import styles from './Footer.module.scss';
import Title from '../ui/title/title';
import styles from './Footer.module.scss';

const Footer = () => {
  const phoneNumber = '+49 999 999 99 99';
  const cleanPhoneNumber = phoneNumber.replace(/\s/g, '');
  const address = 'Linkstraße 2, 8 OG, 10785, Berlin, Deutschland';
  const workingHours = '24 hours a day';

  return (
    <footer className={styles.footer}>
      <Title text="Contact" />
      <div className={styles.contactGrid}>
        <div className={styles.footerPhone}>
          <p className={styles.contactLabel}>Phone</p>
          <a href={`tel:${cleanPhoneNumber}`}>{phoneNumber}</a>
        </div>
        <div className={styles.footerSocials}>
          <p className={styles.contactLabel}>Socials</p>
          <div className={styles.socialIcons}>
            <InstagramIcon className={styles.socialIcon} />
            <WhatsappIcon className={styles.socialIcon} />
          </div>
        </div>
        <div className={styles.footerAddress}>
          <p className={styles.contactLabel}>Address</p>
          <p>{address}</p>
        </div>
        <div className={styles.footerHours}>
          <p className={styles.contactLabel}>Working Hours</p>
          <p>{workingHours}</p>
        </div>
      </div>
      <div className={styles.mapContainer}>
        <iframe
          src="https://www.google.com/maps?q=Starta Institute by Tel-Ran,%2010785%20Berlin&z=16&output=embed"
          loading="lazy"
        ></iframe>
      </div>
    </footer>
  );
};

export default Footer;
