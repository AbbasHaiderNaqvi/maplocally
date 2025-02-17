"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import PostSection from "./PostSection";
import { Layout, Skeleton } from "antd";
import styles from "./Post.module.css";

const { Sider, Content } = Layout;

function Post() {
  const [filters, setFilters] = useState({
    category: [],
    date: null,
    people: "",
    priceRange: [0, 2000],
  });

  const [loading, setLoading] = useState(true); // Manage loading state

  // Function to update filters
  const handleFiltersChange = (updatedFilters) => {
    setFilters(updatedFilters);
    setLoading(true); // Show loader on filter change
  };

  useEffect(() => {
    const fetchData = async () => {
      const MIN_DISPLAY_TIME = 2000; // Minimum time for loader (2 seconds)
      const startTime = Date.now();

      // Simulate fetching data delay (replace with your API logic)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_DISPLAY_TIME - elapsedTime);

      setTimeout(() => setLoading(false), remainingTime);
    };

    fetchData();
  }, [filters]);


  return (
    <Layout className={styles.mainSection}>
      <Sider width={350} style={{ padding: "20px", background: "#fff" }}>
        {/* Pass the current filters and update function to Sidebar */}
        <Sidebar filters={filters} onFiltersChange={handleFiltersChange} />
      </Sider>
      <Layout className={styles.mainSection} style={{ padding: "20px" }}>
        <Content>
          {/* Pass the filters to PostSection */}
          <PostSection filters={filters} />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Post;
