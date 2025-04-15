import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./PostSection.module.css";
import PostRow from "./PostRow";

const PostSection = ({ filters }) => {
  const [posts1, setPosts1] = useState([]);
  const [posts2, setPosts2] = useState([]);
  const [posts3, setPosts3] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true); // Start loading

      const startTime = Date.now(); // Record start time

      try {
        const response = await axios.get("http://localhost:3002/api/product-filter", {
          params: {
            category: filters.category.join(","),
            minPrice: filters.priceRange[0],
            maxPrice: filters.priceRange[1],
            people: filters.people === "any" ? undefined : filters.people,
            date: filters.date ? filters.date.toISOString().split("T")[0] : null,
          },
        });

        const data = Array.isArray(response.data.data) ? response.data.data : [];
        const chunkSize = Math.ceil(data.length / 3);
        setPosts1(data.slice(0, chunkSize));
        setPosts2(data.slice(chunkSize, chunkSize * 2));
        setPosts3(data.slice(chunkSize * 2));
      } catch (error) {
        console.error("Failed to fetch filtered products:", error);
      } finally {
        const elapsedTime = Date.now() - startTime; // Calculate elapsed time
        const remainingTime = Math.max(0, 1000 - elapsedTime); // Ensure at least 1s duration

        setTimeout(() => {
          setLoading(false); // Stop loading after the remaining time
        }, remainingTime);
      }
    };

    fetchFilteredProducts();
  }, [filters]);

  return (
    <div className={styles.postSection}>
      <h2 className={styles.title}>The Best of New York&apos;s</h2>
      <PostRow posts={posts1} loading={loading} />
      <PostRow posts={posts2} loading={loading} />
      <PostRow posts={posts3} loading={loading} />
    </div>
  );
};

export default PostSection;
