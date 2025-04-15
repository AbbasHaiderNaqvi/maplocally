"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./PostSection.module.css";
import PostRow from "./products";

const PostSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);

      const startTime = Date.now();

      try {
        const response = await axios.get("http://localhost:3002/api/product-filter", {
          params: {
            // category: filters.category.join(","),
            // minPrice: filters.priceRange[0],
            // maxPrice: filters.priceRange[1],
            // people: filters.people === "any" ? undefined : filters.people,
            // date: filters.date ? filters.date.toISOString().split("T")[0] : null,
          },
        });

        const data = Array.isArray(response.data.data) ? response.data.data : [];
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch filtered products:", error);
      } finally {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 1000 - elapsedTime);

        setTimeout(() => {
          setLoading(false);
        }, remainingTime);
      }
    };

    fetchFilteredProducts();
  }, []);

  return (
    <div className={styles.postSection}>
      <PostRow posts={posts} loading={loading} />
    </div>
  );
};

export default PostSection;
