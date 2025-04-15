import { Skeleton, Tag, Avatar } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./products.module.css";

const PostRow = ({ posts, loading }) => {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <div className={styles.gridContainer}>
        {[...Array(6)].map((_, index) => (
          <div key={index} className={styles.skeletonCard}>
            <Skeleton.Image active className={styles.skeletonImage} />
            <Skeleton active title={false} paragraph={{ rows: 3, width: "80%" }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.gridContainer}>
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
                <Avatar
                  size="large"
                  className={styles.avatarLetter}
                >
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
  );
};

export default PostRow;
