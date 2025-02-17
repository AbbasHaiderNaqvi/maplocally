import React from 'react'
import Aboutplace from '../components/Aboutplace/Aboutplace';
import Tourinfo from '../components/Tourinfo/Tourinfo';
import Experience from '../components/Experience/Experience';
import Review from '../components/ReviewSection/Review';
import Feedback from '../components/Feedback/Feedback';
import styles from './page.module.css'
import ArticleCard from '../components/ArticleCard/ArticleCard';
import ArticleSection from '../components/ArticleSection/ArticleSection';
import SeperateArticle from '../components/SeperateArticle/SeperateArticle';
import ArticleHero from '../components/ArticleHero/ArticleHero'
const Articles = () => {
    const articlesData = [
        {
            title: "The 50 best cities in the world right now",
            description: "Every year we rank the very greatest cities in the world, based on a survey of thousands of locals",
            coverImage: "https://i.ibb.co/YN7YvmW/image-6.png",
            profileImage: "https://i.ibb.co/njhtKpt/Ellipse-17.png",
            profileName: "Rabia Aslam",
            date: "2022/09/24",
            views: "10k",
        },
        {
            title: "Top destinations for 2023",
            description: "Explore the most popular travel destinations to visit next year.",
            coverImage: "https://i.ibb.co/YN7YvmW/image-6.png",
            profileImage: "https://i.ibb.co/njhtKpt/Ellipse-17.png",
            profileName: "John Doe",
            date: "2023/01/01",
            views: "8.5k",
        },
        {
            title: "Best food cities around the globe",
            description: "Discover cities that are renowned for their food culture and delicious cuisines.",
            coverImage: "https://i.ibb.co/YN7YvmW/image-6.png",
            profileImage: "https://i.ibb.co/njhtKpt/Ellipse-17.png",
            profileName: "Jane Smith",
            date: "2023/05/10",
            views: "15k",
        },
    ];

    const placeData = {
        title: "Brief about the place",
        sections: [
            // "PostDetail your journey begins, you will be greeted by your experienced guide, who will share fascinating insights about Iceland is natural wonders and cultural heritage. The adventure kicks off with a scenic drive along the iconic Ring Road, where you will witness breathtaking landscapes that range from towering glaciers to black sand beaches.",
            // "Your first stop is the mesmerizing Seljalandsfoss waterfall, where you will have the unique opportunity to walk behind the cascading water, feeling the cool mist on your face. Next, you will visit the powerful Skógafoss waterfall, one of Iceland wis largest, where rainbows often form in the mist.",
            // "After soaking in the beauty of these natural wonders, the tour continues to the majestic Sólheimajökull glacier. Here, you will embark on an unforgettable journey into a hidden ice cave, a rare and magical experience. The intricate ice formations and vibrant blue hues within the cave create a surreal atmosphere, perfect for capturing stunning photographs."

            `PostDetail your journey begins, you will be greeted by your experienced guide, who will share fascinating insights about Iceland is natural wonders and cultural heritage. The adventure kicks off with a scenic drive along the iconic Ring Road, where you will witness breathtaking landscapes that range from towering glaciers to black sand beaches.
            Your first stop is the mesmerizing Seljalandsfoss waterfall, where you will have the unique opportunity to walk behind the cascading water, feeling the cool mist on your face. Next, you will visit the powerful Skógafoss waterfall, one of Iceland wis largest, where rainbows often form in the mist.
            After soaking in the beauty of these natural wonders, the tour continues to the majestic Sólheimajökull glacier. Here, you will embark on an unforgettable journey into a hidden ice cave, a rare and magical experience. The intricate ice formations and vibrant blue hues within the cave create a surreal atmosphere, perfect for capturing stunning photographs.`
        ]
    };
    return (
        <div>
            <ArticleHero/>
            <ArticleSection/>
            <Aboutplace title={placeData.title} sections={placeData.sections} />
            <ArticleCard articles={articlesData} />
            <ArticleCard articles={articlesData} />
            <Feedback />

        </div>
    )
}


export default Articles;