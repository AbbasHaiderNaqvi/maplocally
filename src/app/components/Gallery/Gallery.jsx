"use client";
import { Row, Col, Button, Skeleton, Carousel } from "antd";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./Gallery.module.css";

const Gallery = ({ id, mapeLink }) => {
  const [data, setData] = useState(null); // Default state is null
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://maplocally-be.vercel.app/api/get-product/${id}`
        );
        console.log("Fetched Data:", response.data); // Debugging API response
        setData(response.data.data); // Access the "data" field from the API response
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleDirectionClick = () => {
    if (id) {
      router.push(`/Direction?id=${id}`);
    } else {
      console.error("ID is missing. Cannot navigate to direction.");
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Skeleton.Input
          active
          style={{ width: 300, height: 40, marginBottom: 16 }}
        />
        <Skeleton active paragraph={{ rows: 2 }} />
        <Skeleton.Button
          active
          style={{ width: 150, height: 45, margin: "16px 0" }}
        />
      </div>
    );
  }

  if (!data) {
    return <p>No data available</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>{data?.title || "Gallery"}</h1>
        <p>{data?.briefDescription || "Description not available"}</p>
      </div>

      <div className={styles.buttonContainer}>
        {mapeLink && (
          <Button
            className={styles.directionButton}
            type="primary"
            shape="round"
            size="large"
            onClick={() => {
              if (id) {
                window.open(mapeLink, "_blank"); // Opens in a new tab
              }
            }}
          >
            Direction
          </Button>
        )}
      </div>
      {!!data?.productImages?.length && (
        <div className={styles.sliderWrapper}>
          <Carousel dots autoplay arrows>
            {data?.productImages?.length > 0 ? (
              data.productImages.map((img, index) => (
                <div key={index}>
                  <img
                    src={img}
                    className={styles.sliderImage}
                    alt="Article Image"
                  />
                </div>
              ))
            ) : (
              <p>No images in the slider</p>
            )}
          </Carousel>
        </div>
      )}

      {/* <Row className={styles.imageGrid} gutter={[16, 16]}>
        {data?.productImages?.length > 0 ? (
          data.productImages.map((img, index) => (
            <Col key={index} className={styles.customCol} xs={24} md={8}>
              <div className={styles.imageWrapper}>
                <Image
                  src={img} // Use the direct image URL
                  alt={`Image ${index + 1}`}
                  width={280}
                  height={180}
                  className={styles.imageSmall}
                />
              </div>
            </Col>
          ))
        ) : (
          <p>No images available</p>
        )}
      </Row> */}
    </div>
  );
};

export default Gallery;
