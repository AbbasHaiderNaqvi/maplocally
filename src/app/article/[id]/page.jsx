"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel, Card } from "antd";
import { UserOutlined, EyeOutlined, CalendarOutlined } from "@ant-design/icons";
import styles from "./page.module.css";

const ViewArticle = ({ params }) => {
  const [article, setArticle] = useState(null);
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const response = await axios.get(`https://maplocally-be.vercel.app/api/get-article/${id}`);
          setArticle(response.data.data);
        } catch (error) {
          console.error("Error fetching article details:", error);
        }
      };
      fetchArticle();
    }
  }, [id]);

  if (!article) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.articleContainer}>
        <div className={styles.info}>
      <h1 className={styles.articleTitle}>{article.title}</h1>
      <div className={styles.metadata}>
        <span><UserOutlined /> {article.userName}</span>
        <span style={{marginLeft:'2rem'}}><CalendarOutlined /> {new Date(article.date).toDateString()}</span>
        <span  style={{marginLeft:'2rem'}}><EyeOutlined /> {article.views}</span>
      </div>
      </div>
      
      <div className={styles.carouselContainer}>
        <Carousel autoplay>
          {article.articleImage && (
            <div>
              <img src={article.articleImage} alt="Article" className={styles.carouselImage} />
            </div>
          )}
          {Array.isArray(article.places) && article.places.map((place, index) => (
            place.image && (
              <div key={index}>
                <img src={place.image} alt={place.title} className={styles.carouselImage} />
              </div>
            )
          ))}
        </Carousel>
      </div>
      {article.places.length == 0 &&
            <div style={{width:'100%',textAlign:'center',marginTop:'3rem'}}>
            <p>{article.shortDescription}</p>
      
            </div>
      }


      <div className={styles.articleDescription}>
        <p>{article.fullDescription}</p>

      </div>

      {Array.isArray(article.places) && article.places.length > 0 && (
        <div className={styles.placesSection}>
            <div className={styles.mainHeading}>
            <h2>Top Recommendations</h2>
            </div>
          <div className={styles.placesGrid}>
            {article.places.map((place, index) => (
              <Card key={index} hoverable cover={place.image && <img alt={place.title} src={place.image} className={styles.placeImage} />} className={styles.placeCard}>
                <h3 className={styles.placeName} >{place.title}</h3>
                <p className={styles.fullDescription}>{place.shortDescription}</p>
                <p><strong>📍 Address:</strong> {place.address}</p>
                <p><strong>📞 Contact:</strong> {place.number}</p>
                <a href={place.website}><strong>🌐 More Detail</strong></a>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewArticle;