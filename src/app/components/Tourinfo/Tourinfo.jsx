"use client";
import { Row, Col, Image, Skeleton } from 'antd';
import styles from './Tourinfo.module.css';

const Tourinfo = ({ details, loading }) => {
  return (
    <Row className={styles.tourinfo} gutter={[16, 16]}>
      {loading
        ? // Skeleton loader for the details
          Array(4) // Number of skeleton placeholders matching expected detail items
            .fill(null)
            .map((_, index) => (
              <Col key={index} span={24}>
                <div className={styles.detailRow}>
                  <Skeleton.Avatar active size={30} shape="circle" className={styles.icon} />
                  <div className={styles.textContainer}>
                    <Skeleton.Input active style={{ width: 100, marginBottom: 8 }} />
                    <Skeleton.Input active style={{ width: 200 }} />
                  </div>
                </div>
              </Col>
            ))
        : details?.length > 0
        ? // Render actual details when loading is false
          details.map((detail, index) => (
            <Col key={index} span={24}>
              <div className={styles.detailRow}>
                <Image
                  src={detail.image}
                  alt={detail.title}
                  width={30}
                  height={30}
                  preview={false}
                  className={styles.icon}
                />
                <div className={styles.textContainer}>
                  <h4 className={styles.title}>{detail.title}</h4>
                  <p className={styles.description}>{detail.description}</p>
                </div>
              </div>
            </Col>
          ))
        : (
          <p>No details available.</p>
        )}
    </Row>
  );
};

export default Tourinfo;
