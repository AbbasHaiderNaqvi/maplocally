import React from 'react';
import { Row, Col, Image } from 'antd';
import { HeartOutlined, CommentOutlined } from '@ant-design/icons';
import styles from './SeperateArticle.module.css';

const SeperateArticle = () => {
  const article = {
    coverImage: 'https://i.ibb.co/Hx1pnpY/image-9.png', // Replace with the URL to your image
    title: "What is the ‘Temple Run Challenge’ and why are conservationists condemning it?",
    description: "Are you curious about the latest breakthrough in solar technology? Scientists have recently unveiled a groundbreaking new technology that is set to revolutionize the way we harness solar energy.",
    likes: 542,
    comments: 339,
  };

  return (
    <div className={styles.articleContainer}>
      <Row gutter={16}>
        {/* Article Image */}
        <Col xs={24} sm={8} md={6} className={styles.imageCol}>
          <Image src={article.coverImage} alt="Article Cover" preview={false} className={styles.articleImage} />
        </Col>

        {/* Article Content */}
        <Col xs={24} sm={16} md={18} className={styles.contentCol}>
          <h3 className={styles.title}>{article.title}</h3>
          <p className={styles.description}>{article.description}</p>
          <div className={styles.iconContainer}>
            <CommentOutlined className={styles.icon} />
            <HeartOutlined className={styles.icon} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SeperateArticle;
