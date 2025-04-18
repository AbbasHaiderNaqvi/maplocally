"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PostRow from "../PostRow/PostRow";
import styles from "./MightAlsoLike.module.css";
import axios from "axios";

function MightAlsoLike() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get 'id' from query parameters
  const [posts1, setPosts1] = useState([]);
  const [posts2, setPosts2] = useState([]);
  const [posts3, setPosts3] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      if (!id) {
        setError("No ID provided.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const response = await axios.get(
          `https://maplocally-be.vercel.app/api/product-tag-filter/${id}`
        );
        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        const chunkSize = Math.ceil(data.length / 3);
        setPosts1(data.slice(0, chunkSize));
        setPosts2(data.slice(chunkSize, chunkSize * 2));
        setPosts3(data.slice(chunkSize * 2));
      } catch (err) {
        setError("Failed to fetch related products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [id]);

  if (!loading && error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.mainsection}>
      <h2 className={styles.title}>You might also like...</h2>
      <div className={styles.animatedSection}>
        <PostRow posts={posts1} loading={loading} />
        <PostRow posts={posts2} loading={loading} />
        <PostRow posts={posts3} loading={loading} />
      </div>
    </div>
  );
}

export default MightAlsoLike;
