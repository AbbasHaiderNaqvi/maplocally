"use client"
import React from 'react'
import Aboutplace from '../components/Aboutplace/Aboutplace';
import Tourinfo from '../components/Tourinfo/Tourinfo';
import Feedback from '../components/Feedback/Feedback';
import FaqSection from "../components/FAQ's/faq";
import Location from '../components/Location/Location';
import TravelSignup from '../components/TravelSignin/TravelSignup';
import DirectionPost from '../components/DirectionPost/DirectionPost';
import styles from "./page.module.css"
import { useState,useEffect } from 'react';
import axios from "axios";

const Direction = ({searchParams}) => {
    const id = searchParams?.id; // Get the `id` from searchParams if available
    const [fetchedProduct, setFetchedProduct] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [details, setDetails] = useState([
        {
            image: "https://i.ibb.co/555Rvxy/Group-48101161.png", // Duration image URL
            title: "Duration",
            description: "Check availability", // Placeholder, will be updated dynamically
        },
        {
            image: "https://i.ibb.co/8z1SrhM/Group-48101165.png", // Live tour image URL
            title: "Language",
            description: "French", // Placeholder, will be updated dynamically
        },
        {
            image: "https://i.ibb.co/VL0rbqd/Group-48101160.png", // Pickup optional image URL
            title: "Pickup optional",
            description: "Pickup details will be updated dynamically", // Placeholder
        },
        {
            image: "https://i.ibb.co/x5LYGrY/Group-48101166.png", // Small group image URL
            title: "Small group",
            description: "Limited to participants", // Placeholder
        },
    ]);

   
    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://maplocally-be.vercel.app/api/get-product/${id}`);
                if (response.data.success) {
                    const productData = response.data.data;
                    setFetchedProduct(productData);

                    setDetails((prevDetails) => [
                        {
                            ...prevDetails[0],
                            description: productData.tourDuration || "Check availability",
                        },
                        {
                            ...prevDetails[1],
                            description: productData.tourLanguage || "French",
                        },
                        {
                            ...prevDetails[2],
                            description: productData.pickupOption || "Pickup details not available",
                        },
                        {
                            ...prevDetails[3],
                            description: `Limited to ${productData.groupSize || "participants"}`,
                        },
                    ]);
                } else {
                    setFetchError("Failed to fetch product data.");
                }
            } catch (err) {
                setFetchError(err.message);
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchProduct();
    }, [id]);

    if (!fetchedProduct && !loading) {
        return <div>Error: {fetchError || "No product found."}</div>;
    }
    const location = {
        name: 'Hilton Hotel Niagara Falls',
        city: 'Niagara Falls',
        latitude: 43.0962,
        longitude: -79.0377,
    };

    const recommendations = [
        { id: 1, title: 'The Best Pizza in New York', imageUrl: 'https://i.ibb.co/34rRKpy/image-5.png' },
        { id: 2, title: 'Popular Burger Spot', imageUrl: 'https://i.ibb.co/34rRKpy/image-5.png' },
        { id: 3, title: 'Top Sushi Place', imageUrl: 'https://i.ibb.co/34rRKpy/image-5.png' },
    ];
    const post1 = [
        {
            id: 1,
            title: "Niagara Falls Tour",
            category: "tour",
            price: 94,
            img: 'https://i.ibb.co/XDTkpvb/images.jpg',
            tags: ['Nature', 'Waterfall'],
            description: "Tour",
            paragraph: 'White Center pizzeria Proletariat offers thin-crust pies with the occasional surprise topping (like Spam), arcade games, a photo booth, and a cheerful family vibe. Service is blindingly fast. The fact that the kids’ area is right next to a table, so diners can actually eat their food while keeping an eye on the children, is a major bonus.',
            goldentag: 'Best price guarantee' // New property for the dynamic tag
        },
        
    ];
    const post2 = [
        {
            id: 1,
            title: "Niagara Falls Tour",
            category: "tour",
            price: 94,
            img: 'https://i.ibb.co/XDTkpvb/images.jpg',
            tags: ['Nature', 'Waterfall'],
            description: "Tour",
            paragraph: 'White Center pizzeria Proletariat offers thin-crust pies with the occasional surprise topping (like Spam), arcade games, a photo booth, and a cheerful family vibe. Service is blindingly fast. The fact that the kids’ area is right next to a table, so diners can actually eat their food while keeping an eye on the children, is a major bonus.',
        }
    ];

    const post3 = [
        {
            id: 1,
            title: "Niagara Falls Tour",
            category: "tour",
            price: 94,
            img: 'https://i.ibb.co/XDTkpvb/images.jpg',
            tags: ['Pickup', 'Easy refund'],
            description: "Tour",
            goldentag: 'Exclusive Deal' ,
            paragraph: 'White Center pizzeria Proletariat offers thin-crust pies with the occasional surprise topping (like Spam), arcade games, a photo booth, and a cheerful family vibe. Service is blindingly fast. The fact that the kids’ area is right next to a table, so diners can actually eat their food while keeping an eye on the children, is a major bonus.',

        }
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
            <div style={{ padding: '20px' }}>
                <Location location={location} recommendations={recommendations} />
            </div>
            <Aboutplace
                title="Brief about the place"
                sections={fetchedProduct?.briefDescription ? [fetchedProduct.briefDescription] : []}
                loading={loading}
            />
            <h2 className={styles.hd} >You may also like</h2>
            <DirectionPost posts={post1} />
            <Tourinfo details={details} loading={loading} />

            <DirectionPost posts={post2} />
            <Tourinfo details={details} loading={loading} />

            <DirectionPost posts={post3} />
            <Tourinfo details={details} loading={loading} />



            {/* <TravelSignup /> */}
            <Feedback />
            <FaqSection />
        </div>
    )
}

export default Direction; 