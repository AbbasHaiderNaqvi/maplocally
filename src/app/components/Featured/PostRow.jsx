import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from './PostRow.module.css';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

const PostRow = ({ posts }) => {
  const rowRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);

  const updateScrollable = () => {
    if (rowRef.current) {
      setIsScrollable(rowRef.current.scrollWidth > rowRef.current.clientWidth);
    }
  };

  useEffect(() => {
    updateScrollable();
    window.addEventListener('resize', updateScrollable);
    return () => {
      window.removeEventListener('resize', updateScrollable);
    };
  }, []);

  const handleScroll = () => {
    if (rowRef.current) {
      setScrollPos(rowRef.current.scrollLeft);
    }
  };

  const scrollLeft = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: -390, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: 390, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (rowRef.current) {
      rowRef.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (rowRef.current) {
        rowRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className={styles.cardRowContainer}>
      {isScrollable && scrollPos > 0 && (
        <button className={`${styles.arrowButton} ${styles.left}`} onClick={scrollLeft}>
          <LeftOutlined />
        </button>
      )}
      {isScrollable && rowRef.current && scrollPos < (rowRef.current.scrollWidth - rowRef.current.clientWidth) - 5 && (
        <button className={`${styles.arrowButton} ${styles.right}`} onClick={scrollRight}>
          <RightOutlined />
        </button>
      )}
      <div className={styles.cardRow} ref={rowRef}>
        {posts.map((post) => (
          <Link href={`/PostDetail?id=${post.id}`} key={post.id} className={styles.link} passHref>
            <div className={styles.customCard}>
              <img src={post.img} alt={post.title} className={styles.cardImage} />
              <div className={styles.cardContent}>
                <p className={styles.cardDescription}>{post.description}</p>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <img
                  src="https://i.ibb.co/XYTSfLC/Group-48101322.png"
                  alt="Custom image"
                  className={styles.customImage}                 />
                <p className={styles.price}>From US$ {post.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostRow;
