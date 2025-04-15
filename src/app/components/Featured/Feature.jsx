"use client";
import React, { useState, useEffect } from "react";
import PostRow from "./PostRow";
import styles from "./Feature.module.css";
import axios from "axios";

const fetchProducts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3002/api/get-featured-products",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const products = response.data.data;

    // Ensure products exist and map required fields
    return products.map((product) => ({
      id: product._id,
      title: product.title,
      price: product.price,
      category: product.category,
      img: product.productImages.length > 0 ? product.productImages[0] : "https://via.placeholder.com/150", // Default placeholder
      tags: product.tags || [],
      description: product.highlights.length > 0 ? product.highlights[0] : "No highlights available",
    }));
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};

const Feature = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts();
      setPlaces(products);
    };

    loadProducts();
  }, []);

  return (
    <div className={styles.mainsection}>
      <h2 className={styles.title}>Featured Places</h2>
      <PostRow posts={places} />
    </div>
  );
};

export default Feature;
