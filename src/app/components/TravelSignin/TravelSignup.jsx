import { Row, Col, Input, Button } from 'antd';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import styles from './TravelSignup.module.css';

const TravelSignup = () => {
  // Detect if the screen size is less than `lg` (1024px)
  const isLgOrAbove = useMediaQuery({ minWidth: 1024 });

  if (!isLgOrAbove) return null; // Don't render the component for smaller screens

  return (
    <>
      <div className={styles.signupContainer}>
        {/* Background Image Element */}
        <div className={styles.backgroundImage}>
          <Image
            src="https://i.ibb.co/h8n7QKZ/Group-1000003417-3.png"
            alt="background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>

        <Row className={styles.row}>
          {/* Right Section with Text and Input */}
          <Col xs={24} md={12} className={styles.rightSection}>
            <div className={styles.content}>
              <h2 className={styles.hd}>Your travel journey starts here</h2>
              <p className={styles.para}>
                Sign-up now for travel tips, personalized itineraries, and vacation
                inspiration straight to your inbox.
              </p>
              <Input
                size="large"
                placeholder="Email"
                className={styles.emailInput}
                suffix={
                  <Button type="primary" className={styles.submitButton}>
                    Let&apos;s go
                  </Button>
                }
              />
            </div>
          </Col>
        </Row>
      </div>
      {/* Terms and Conditions */}
      <p className={styles.terms}>
        By signing up, you agree to receive promotional emails on activities and insider tips. 
        You can unsubscribe or withdraw your consent at any time with future effect.
      </p>
    </>
  );
};

export default TravelSignup;
