import React from 'react';
import { Row, Col } from 'antd';
import Image from 'next/image';
import styles from './ArticleCard.module.css';

const ArticleCard = ({ articles }) => {
  return (
    <div className={styles.cardContainer}>
    <Row gutter={24} >
      {articles.map((article, index) => (
        <Col xs={24} sm={12} md={8} key={index}>
          <div className={styles.customCard}>
            <div className={styles.coverImageContainer}>
              <Image
                src={article.coverImage}
                alt="background image"
                layout="fill"
                objectFit="cover"
                priority
              />
              <div className={styles.profileOverlay}>
                <div className={styles.customAvatar}>
                  <Image
                    src={article.profileImage}
                    alt="profile"
                    width={30}
                    height={30}
                    className={styles.profileImage}
                  />
                </div>
                <span className={styles.profileName}>{article.profileName}</span>
              </div>
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{article.title}</h3>
              <p className={styles.description}>{article.description}</p>
              <Row className={styles.infoRow}>
              <div>
                <Col span={12} className={styles.infoCol}>
                  <Image
                    src="https://i.ibb.co/QNyvSX4/Vector-2.png"
                    alt="calendar"
                    width={10}
                    height={10}
                    className={styles.calendar}
                  />
                  <span>{article.date}</span>
                </Col>
                <Col span={12} className={`${styles.infoCol} ${styles.infoColRight}`}>
                  <Image
                    src="https://i.ibb.co/yBKMnz5/Group-1000003419.png"
                    alt="eye"
                    width={15}
                    height={10}
                    className={styles.eyeicon}
                  />
                  <span>{article.views} Viewers</span>
                </Col>
                </div>
              </Row>
              <button className={styles.readMoreButton}>Read More</button>
            </div>
          </div>
        </Col>
      ))}
    </Row>
    </div>
  );
};

export default ArticleCard;
