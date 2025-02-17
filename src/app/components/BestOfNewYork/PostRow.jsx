import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import styles from "./PostRow.module.css";
import { useRef, useEffect, useState } from "react";
import { Skeleton, Tag } from "antd";
import { useRouter } from "next/navigation"; // Import useRouter

const PostRow = ({ posts, loading }) => {
  const rowRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const router = useRouter(); // Initialize router

  const updateScrollable = () => {
    if (rowRef.current) {
      setIsScrollable(rowRef.current.scrollWidth > rowRef.current.clientWidth);
    }
  };

  useEffect(() => {
    updateScrollable();
    window.addEventListener("resize", updateScrollable);
    return () => {
      window.removeEventListener("resize", updateScrollable);
    };
  }, []);

  const handleScroll = () => {
    if (rowRef.current) {
      setScrollPos(rowRef.current.scrollLeft);
    }
  };

  const scrollLeft = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (rowRef.current) {
      rowRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (rowRef.current) {
        rowRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Render skeletons when loading
  if (loading) {
    return (
      <div className={styles.cardRowContainer}>
        <div className={styles.cardRow}>
          {[...Array(4)].map((_, index) => (
            <div key={index} className={styles.skeletonCard}>
              <Skeleton.Image active className={styles.skeletonImage} />
              <Skeleton active title={false} paragraph={{ rows: 3, width: "80%" }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cardRowContainer}>
      {isScrollable && scrollPos > 0 && (
        <button className={`${styles.arrowButton} ${styles.left}`} onClick={scrollLeft}>
          <LeftOutlined />
        </button>
      )}
      {isScrollable && rowRef.current && scrollPos < rowRef.current.scrollWidth - rowRef.current.clientWidth - 5 && (
        <button className={`${styles.arrowButton} ${styles.right}`} onClick={scrollRight}>
          <RightOutlined />
        </button>
      )}
      <div className={styles.cardRow} ref={rowRef}>
        {posts.map((post) => (
          <div
            key={post._id}
            className={styles.customCard}
            onClick={() => router.push(`/PostDetail?id=${post._id}`)} // Navigate on click
          >
            <img src={post.productImages[0]} alt={post.title} className={styles.cardImage} />
            <div className={styles.cardContent}>
              <p className={styles.cardDescription}>{post.subTitle}</p>
              <h3 className={styles.cardTitle}>{post.title}</h3>
              <div className={styles.tagContainer}>
                {post.tags.map((tag, index) => (
                  <Tag key={index} className={styles.tag}>
                    {tag}
                  </Tag>
                ))}
              </div>
              <p className={styles.price}>From US$ {post.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostRow;
