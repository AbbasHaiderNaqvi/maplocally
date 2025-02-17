import React from 'react';
import styles from './Footer.module.css';
import Image from 'next/image';
import { Row, Col } from 'antd';

const Footer = () => {
  return (
    <div className={styles.footersection}>
      <Row justify="center">
        <Col xs={24} sm={12} md={6} className={styles.logoCol}>
          <img 
            src="https://i.ibb.co/g918t1D/Mask-group.png" 
            alt= "footer"
            className={styles.footerlogo}
          />
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={24} className={styles.dividerCol}>
          <div className={styles.divider}></div>
        </Col>
      </Row>
      <Row justify="space-between" className={styles.menuicon}>
        <Col xs={24} md={12} className={styles.menuCol}>
          <div className={styles.menumain}>
            <ul className={styles.menu}>
              <li>About Secret NYC</li>
              <li>Advertise with us</li>
              <li>List your event</li>
              <li>Privacy Policy</li>
              <li>Contact</li>
            </ul>
          </div>
        </Col>
        <Col xs={24} md={12} className={styles.iconCol}>
          <div className={styles.iconmain}>
            <ul className={styles.iconmenu}>
              <li>
                <Image 
                  src='https://i.ibb.co/9YpFwRj/instagram-3.png'
                  width={25}
                  height={25}
                  alt='instagram'
                  className={styles.icon}
                />
              </li>
              <li>
                <Image 
                  src='https://i.ibb.co/CMbHJKW/twitter-1.png'
                  width={25}
                  height={25}
                  alt='Twitter'
                  className={styles.icon}
                />
              </li>
              <li>
                <Image 
                  src='https://i.ibb.co/bBMTvBN/youtube.png'
                  width={25}
                  height={25}
                  alt='youtube'
                  className={styles.icon}
                />
              </li>
              <li>
                <Image 
                  src='https://i.ibb.co/DCQdS09/linkedin.png'
                  width={25}
                  height={25}
                  alt='linkedin'
                  className={styles.icon}
                />
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
