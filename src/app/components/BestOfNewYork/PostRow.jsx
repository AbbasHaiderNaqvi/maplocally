import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import styles from "./PostRow.module.css";
import { useRef, useEffect, useState } from "react";
import { Skeleton, Tag, Avatar } from "antd";
import { useRouter } from "next/navigation";

const PostRow = ({ posts, loading }) => {
  const rowRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const router = useRouter();

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
      {scrollPos > 0 && (
        <button className={`${styles.arrowButton} ${styles.left}`} onClick={scrollLeft}>
          <LeftOutlined />
        </button>
      )}

          <button className={`${styles.arrowButton} ${styles.right}`} onClick={scrollRight}>
            <RightOutlined />
          </button>
      <div className={styles.cardRow} ref={rowRef}>
        {posts.map((post) => {
          const hasImage = post.productImages && post.productImages.length > 0;
          const titleFirstLetter = post.title ? post.title.charAt(0).toUpperCase() : "?";

          return (
            <div
              key={post._id}
              className={styles.customCard}
              onClick={() => router.push(`/PostDetail?id=${post._id}`)}
            >
              {hasImage ? (
                <img src={post.productImages[0]} alt={post.title} className={styles.cardImage} />
              ) : (
                <div className={styles.cardAvatar}>
                  <Avatar size="large" className={styles.avatarLetter}>
                    {titleFirstLetter}
                  </Avatar>
                </div>
              )}
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
          );
        })}
      </div>
    </div>
  );
};

export default PostRow;
