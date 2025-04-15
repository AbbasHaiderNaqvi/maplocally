"use client";
import { Row, Col, Image, Skeleton } from 'antd';
import styles from './Tourinfo.module.css';

const Tourinfo = ({ details, loading }) => {
  return (
    <Row className={styles.tourinfo} gutter={[16, 16]}>
      {loading
        ? Array(4)
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
        ? details.map((detail, index) => {
            const hasImage = !!detail.image;
            const hasTitle = !!detail.title;
            const hasDescription = !!detail.description;

            if (!hasImage && !hasTitle && !hasDescription) return null;

            return (
              <Col key={index} span={24}>
                <div className={styles.detailRow}>
                  {hasImage && (
                    <Image
                      src={detail.image}
                      alt={detail.title || 'Detail icon'}
                      width={30}
                      height={30}
                      preview={false}
                      className={styles.icon}
                    />
                  )}
                  <div className={styles.textContainer}>
                    {hasTitle && <h4 className={styles.title}>{detail.title}</h4>}
                    {hasDescription && <p className={styles.description}>{detail.description}</p>}
                  </div>
                </div>
              </Col>
            );
          })
        : <p>No details available.</p>
      }
    </Row>
  );
};

export default Tourinfo;
