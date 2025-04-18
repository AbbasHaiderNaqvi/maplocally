"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Skeleton } from 'antd';
import ArticleHero from '../components/ArticleHero/ArticleHero';
import ArticleCard from '../components/ArticleCard/ArticleCard';
import Feedback from '../components/Feedback/Feedback';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get("https://maplocally-be.vercel.app/api/get-articles", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const filteredArticles = response.data.data.filter(article => article.places && article.places.length == 0);
                const formattedArticles = filteredArticles.map(article => ({
                    title: article.title,
                    id: article._id,
                    description: article.shortDescription,
                    coverImage: article.articleImage,
                    profileImage: article.userImage,
                    profileName: article.userName,
                    date: new Date(article.date).toISOString().split('T')[0],
                    views: article.views,
                }));
                setArticles(formattedArticles);
            } catch (error) {
                console.error("Failed to fetch articles:", error);
                setError("Failed to fetch articles. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return (
        <div style={{
            marginTop:'10rem'
        }}>
            {/* <ArticleHero /> */}
            {loading && (
                <div style={{ margin: '20px 0' }}>
                    <Skeleton active avatar paragraph={{ rows: 4 }} />
                    <Skeleton active avatar paragraph={{ rows: 4 }} />
                    <Skeleton active avatar paragraph={{ rows: 4 }} />
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && articles.length > 0 && <ArticleCard articles={articles} />}
            <Feedback />
        </div>
    );
};

export default Articles;
