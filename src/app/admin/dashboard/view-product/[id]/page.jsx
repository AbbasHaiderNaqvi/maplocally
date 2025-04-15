"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "antd"; // Ant Design Carousel for image slider
import styles from "./page.module.css"; // Importing CSS module for styling

const ViewProduct = ({ params }) => {
  const [product, setProduct] = useState(null);
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:3002/api/get-product/${id}`);
          console.log(response.data); // Log product details
          setProduct(response.data.data);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.productDetailsContainer}>
      <h1 className={styles.productTitle}>{product.title}</h1>

      {/* Image Slider using Ant Design Carousel */}
      <div className={styles.sliderContainer}>
        <Carousel autoplay>
          {Array.isArray(product.productImages) && product.productImages.length > 0 ? (
            product.productImages.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Product Image ${index + 1}`} className={styles.productImage} />
              </div>
            ))
          ) : (
            <p>No images available.</p>
          )}
        </Carousel>
      </div>

      {/* Product Details */}
      <div className={styles.productInfo}>
        <div className={styles.productDescription}>
          <p><strong>Sub Title:</strong> {product.subTitle}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Tour Date:</strong> {new Date(product.tourDate).toLocaleString()}</p>
          <p><strong>Tour Duration:</strong> {product.tourDuration}</p>
          <p><strong>Language:</strong> {product.tourLanguage}</p>
          <p><strong>Group Size:</strong> {product.groupSize}</p>
          <p><strong>Meeting Point:</strong> {product.meetingPoint}</p>
          <p><strong>Pickup Option:</strong> {product.pickupOption}</p>
          <p><strong>Brief Description:</strong> {product.briefDescription}</p>
          <p><strong>Full Description:</strong> {product.fullDescription}</p>
        </div>

        {/* Tags and Dates */}
        <div className={styles.productMeta}>
          <p><strong>Tags:</strong> {product.tags && product.tags.length > 0 ? product.tags.join(", ") : "No tags available"}</p>
          <p><strong>Created At:</strong> {new Date(product.createdAt).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(product.updatedAt).toLocaleString()}</p>
          <p><strong>Latitude:</strong> {product.latitude}</p>
          <p><strong>Longitude:</strong> {product.longitude}</p>
        </div>
      </div>

      {/* Highlights and Includes */}
      <div className={styles.highlightsIncludes}>
        <h3>Highlights</h3>
        {product.highlights && product.highlights.length > 0 ? (
          <ul>
            {product.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        ) : (
          <p>No highlights available.</p>
        )}

        <h3>Includes</h3>
        {product.includes && product.includes.length > 0 ? (
          <ul>
            {product.includes.map((include, index) => (
              <li key={index}>{include}</li>
            ))}
          </ul>
        ) : (
          <p>No includes available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewProduct;
