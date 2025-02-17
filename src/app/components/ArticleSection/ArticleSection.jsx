import React from 'react';
import { Row, Col, Image } from 'antd';
import styles from './ArticleSection.module.css';

const ArticleSection = () => {
  const mainArticle = {
    coverImage: 'https://i.ibb.co/fMKN2sL/image-7.png',
    profileImage: 'https://i.ibb.co/njhtKpt/Ellipse-17.png',
    author: 'Johnny Gaudreau',
    title: "The world's best cities for nightlife right now",
    description:
      'American professional ice hockey winger who played 11 seasons in the National Hockey League (NHL). He was selected by the Calgary Flames in the fourth',
    likes: 542,
    comments: 339,
    timeAgo: '2h ago',
  };

  return (
    <div className={styles.mainSection}>
      <h2 className={styles.hd}>Articles</h2>
      <Row gutter={16} className={styles.articleComponent}>
        {/* Left Side (Main Article) */}
        <Col xs={24} md={24} lg={12} className={styles.leftArticleCard}>
          <div className={styles.imageContainer}>
            <Image
              src={mainArticle.coverImage}
              alt="Main article image"
              preview={false}
              className={styles.articleImage}
            />
          </div>
          <div className={styles.cardContent}>
            <div className={styles.profileInfo}>
              <Image
                src={mainArticle.profileImage}
                alt="Profile"
                width={30}
                height={30}
                className={styles.profileImage}
              />
              <span className={styles.author}>{mainArticle.author}</span>
            </div>
            <h3 className={styles.title}>{mainArticle.title}</h3>
            <p className={styles.description}>{mainArticle.description}</p>
            <span className={styles.timeAgo}>{mainArticle.timeAgo}</span>
          </div>
        </Col>

        {/* Right Side (Identical to Left Side but Wider) */}
        <Col xs={24} md={24} lg={12} className={styles.rightArticleCard}>
          <div className={styles.imageContainer}>
            <Image
              src={mainArticle.coverImage}
              alt="Main article image"
              preview={false}
              className={styles.articleImage}
            />
          </div>
          <div className={styles.cardContent}>
            <div className={styles.profileInfo}>
              <Image
                src={mainArticle.profileImage}
                alt="Profile"
                width={30}
                height={30}
                className={styles.profileImage}
              />
              <span className={styles.author}>{mainArticle.author}</span>
            </div>
            <h3 className={styles.title}>{mainArticle.title}</h3>
            <p className={styles.description}>{mainArticle.description}</p>
            <span className={styles.timeAgo}>{mainArticle.timeAgo}</span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ArticleSection;
