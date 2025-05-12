"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Aboutplace from "../components/Aboutplace/Aboutplace";
import Tourinfo from "../components/Tourinfo/Tourinfo";
import Experience from "../components/Experience/Experience";
import Review from "../components/ReviewSection/Review";
import Feedback from "../components/Feedback/Feedback";
import FaqSection from "../components/FAQ's/faq";
import Gallery from "../components/Gallery/Gallery";
import MightAlsoLike from "../components/MightAlsoLike/MightAlsoLike";
import TravelSignup from "../components/TravelSignin/TravelSignup";
import styles from "./page.module.css";

const PostDetail = ({ searchParams }) => {
    const id = searchParams?.id;
    const [fetchedProduct, setFetchedProduct] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [details, setDetails] = useState([
        {
            image: "https://i.ibb.co/555Rvxy/Group-48101161.png",
            title: "Duration",
            description: "",
        },
        {
            image: "https://i.ibb.co/8z1SrhM/Group-48101165.png",
            title: "Language",
            description: "",
        },
        {
            image: "https://i.ibb.co/VL0rbqd/Group-48101160.png",
            title: "Pickup optional",
            description: "",
        },
        {
            image: "https://i.ibb.co/x5LYGrY/Group-48101166.png",
            title: "Small group",
            description: "",
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
                            description: productData.tourDuration || "",
                        },
                        {
                            ...prevDetails[1],
                            description: productData.tourLanguage || "",
                        },
                        {
                            ...prevDetails[2],
                            description: productData.pickupOption || "",
                        },
                        {
                            ...prevDetails[3],
                            description: productData.groupSize?`Limited to ${productData.groupSize || ""}`:"",
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

    return (
        <div>
            <Gallery mapeLink={fetchedProduct?.mapeLink} id={fetchedProduct?._id || ""} loading={loading} />
            <Aboutplace
                title="Brief about the place"
                sections={fetchedProduct?.briefDescription ? [fetchedProduct.briefDescription] : []}
                loading={loading}
            />{
               ( !fetchedProduct?.tourDuration & !fetchedProduct?.tourLanguage & !fetchedProduct?.pickupOption & !fetchedProduct?.groupSize) ?<></>:
                <>
                    <h2 className={styles.hd}>Tour Information</h2>
                    <Tourinfo details={details} loading={loading} />
                </>
            }
            
            <Experience
                fullDescription={fetchedProduct?.fullDescription || ""}
                highlights={fetchedProduct?.highlights || []}
                includes={fetchedProduct?.includes || []}
                meetingPoint={fetchedProduct?.meetingPoint || ""
            }
            loading={loading} 

      />
            <MightAlsoLike loading={loading} />
            {/* <Review /> */}
            <TravelSignup />
            <Feedback loading={loading} />
            <FaqSection loading={loading} />
            {fetchError && <p className={styles.error}>Error fetching product: {fetchError}</p>}
        </div>
    );
};

export default PostDetail;
