"use client";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Skeleton, Row, Col, Tag } from "antd";
import styles from "./DirectionPost.module.css";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

const DirectionPost = ({ posts }) => {
    const rowRef = useRef(null);
    const [isScrollable, setIsScrollable] = useState(false);
    const [scrollPos, setScrollPos] = useState(0);
    const [loading, setLoading] = useState(true);

    const updateScrollable = () => {
        if (rowRef.current) {
            setIsScrollable(rowRef.current.scrollWidth > rowRef.current.clientWidth);
        }
    };

    useEffect(() => {
        updateScrollable();

        if (typeof window !== "undefined") {
            window.addEventListener("resize", updateScrollable);
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("resize", updateScrollable);
            }
        };
    }, []);

    const handleScroll = () => {
        if (rowRef.current) {
            setScrollPos(rowRef.current.scrollLeft);
        }
    };

    const scrollLeft = () => {
        if (rowRef.current) {
            rowRef.current.scrollBy({ left: -390, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (rowRef.current) {
            rowRef.current.scrollBy({ left: 390, behavior: "smooth" });
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

    // Simulate loading state (remove this logic if loading is already managed by a parent)
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000); // Minimum 2s duration
        return () => clearTimeout(timer);
    }, [posts]);

    if (loading) {
        return (
            <div className={styles.cardRowContainer}>
                <div className={styles.cardRow}>
                    {[...Array(1)].map((_, index) => (
                        <div key={index} className={styles.skeletonCard}>
                            <Skeleton.Image
                                style={{ objectFit: 'cover', width: '300px', height: '200px' }}
                                active
                            />
                            <Skeleton active title={false} paragraph={{ rows: 5, width: "300px" }} />
                            <Skeleton.Button
                                style={{ width: '200px', height: '40px', marginBottom: '16px', marginTop: '10px'}}
                                active
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className={styles.cardRowContainer}>

            <>
                {isScrollable && scrollPos > 0 && (
                    <button className={`${styles.arrowButton} ${styles.left}`} onClick={scrollLeft}>
                        <LeftOutlined />
                    </button>
                )}
                {isScrollable &&
                    rowRef.current &&
                    scrollPos < rowRef.current.scrollWidth - rowRef.current.clientWidth - 5 && (
                        <button className={`${styles.arrowButton} ${styles.right}`} onClick={scrollRight}>
                            <RightOutlined />
                        </button>
                    )}
                <div className={styles.cardRow} ref={rowRef}>
                    {posts.map((post) => (
                        <div key={post.id}>
                            <Link href={`/PostDetail?id=${post.id}`} className={styles.link} passHref>
                                <div className={styles.customCard}>
                                    <img
                                        src={post.img}
                                        alt={post.title}
                                        className={styles.cardImage}
                                    />
                                    <div className={styles.cardContent}>
                                        <p className={styles.cardDescription}>{post.description}</p>
                                        <h3 className={styles.cardTitle}>{post.title}</h3>
                                        <div className={styles.tagContainer}>
                                            {post.tags.map((tag, index) => (
                                                <Tag key={index} className={styles.tag}>
                                                    {tag}
                                                </Tag>
                                            ))}
                                        </div>
                                        <p className={styles.price}>From US$ {post.price}</p>
                                        {post.goldentag && (
                                            <Tag className={styles.guranteeTag}>
                                                {post.goldentag}
                                            </Tag>
                                        )}
                                    </div>
                                </div>
                            </Link>
                            <p className={styles.additionalText}>{post.paragraph}</p>
                            <button className={styles.openMapButton}>Open in Google Maps</button>
                        </div>
                    ))}
                </div>
            </>
        </div>
    );
};

export default DirectionPost;
