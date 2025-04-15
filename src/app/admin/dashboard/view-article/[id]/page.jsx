"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "antd"; // Ant Design Carousel for image slider
import styles from "./page.module.css"; // Importing CSS module for styling

const ViewArticle = ({ params }) => {
  const [article, setArticle] = useState(null);
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const response = await axios.get(`http://localhost:3002/api/get-article/${id}`);
          setArticle(response.data.data);
        } catch (error) {
          console.error("Error fetching article details:", error);
        }
      };

      fetchArticle();
    }
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.articleDetailsContainer}>
      <h1 className={styles.articleTitle}>{article.title}</h1>

      {/* Image Slider using Ant Design Carousel */}
      <div className={styles.sliderContainer}>
        <Carousel autoplay>
          {article.articleImage ? (
            <div>
              <img
                src={article.articleImage}
                alt="Article Image"
                className={styles.articleImage}
              />
            </div>
          ) : (
            <p>No article image available.</p>
          )}
          {Array.isArray(article.places) &&
            article.places.map((place, index) => (
              place.image && (
                <div key={index}>
                  <img
                    src={place.image}
                    alt={`Place ${index + 1}`}
                    className={styles.articleImage}
                  />
                </div>
              )
            ))}
        </Carousel>
      </div>

      {/* Article Details */}
      <div className={styles.articleInfo}>
        <p><strong>Short Description:</strong> {article.shortDescription}</p>
        <p><strong>Full Description:</strong> {article.fullDescription}</p>
        <p><strong>User Name:</strong> {article.userName}</p>
        <p><strong>Date:</strong> {article.date}</p>
        <p><strong>Views:</strong> {article.views}</p>
      </div>

      {/* Places Details */}
      {Array.isArray(article.places) && article.places.length > 0 && (
        <div className={styles.placesSection}>
          <h2>Places</h2>
          {article.places.map((place, index) => (
            <div key={index} className={styles.place}>
              <h3>{place.title}</h3>
              <p><strong>Short Description:</strong> {place.shortDescription}</p>
              <p><strong>Number:</strong> {place.number}</p>
              <p><strong>Website:</strong> <a href={place.website} target="_blank" rel="noopener noreferrer">{place.website}</a></p>
              <p><strong>Address:</strong> {place.address}</p>
              {place.image && (
                <img
                  src={place.image}
                  alt={`Place ${index + 1}`}
                  className={styles.placeImage}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewArticle;
