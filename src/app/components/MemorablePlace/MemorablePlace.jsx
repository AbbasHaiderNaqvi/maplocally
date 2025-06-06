"use client"
import React, { useState, useEffect } from "react";

import { Row, Col, Button } from 'antd';
import Image from 'next/image';
import { RightOutlined } from '@ant-design/icons';
import styles from './MemorablePlace.module.css';
import {useRouter} from 'next/navigation'
import axios from "axios";

// Sample data for the component


// const places = [
//   {
//     id: 1,
//     title: 'Statue of Liberty',
//     description:
//       'The Statue of Liberty is a must-visit tourist spot in New York City. This iconic symbol of freedom and democracy stands tall on Liberty Island in the middle of the New York Harbor....',
//     image: 'https://i.ibb.co/qxykY5r/Rectangle-33.png',
//     linkText: 'Explore all activities',
//   },
//   {
//     id: 2,
//     title: 'Central Park',
//     description:
//       'Central Park is a sprawling green oasis in the heart of Manhattan, offering scenic beauty, recreational activities, and cultural landmarks....',
//     image: 'https://i.ibb.co/WHnF1Bs/Rectangle-33.png',
//     linkText: 'Explore all activities',
//   },
//   {
//     id: 3,
//     title: 'Empire State Building',
//     description:
//       'The Empire State Building is a historic skyscraper offering breathtaking views of New York City from its observation decks....',
//     image: 'https://i.ibb.co/c2XjQdn/Rectangle-33-1.png',
//     linkText: 'Explore all activities',
//   },
//   {
//     id: 4,
//     title: 'Brooklyn Bridge',
//     description:
//       'The Brooklyn Bridge is an architectural marvel connecting Manhattan and Brooklyn, perfect for walks and stunning city views....',
//       image: 'https://i.ibb.co/qxykY5r/Rectangle-33.png',
//       linkText: 'Explore all activities',
//     },
//   ];
  const MemorablePlace = () => {
    
  const [places, setPlaces] = useState([]);

    const router = useRouter();

    const handleReadMore = (id) => {
      router.push(`/article/${id}`);
    };
    const handleseemore=()=>{
      router.push('/articles')
    }
    const handleplace=()=>{
      router.push('/Article2')
    }
    useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://maplocally-be.vercel.app/api/get-articles", {
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        const articles = response.data.data;
    
        // Filter out articles that have an empty `places` array
        const filteredArticles = articles.filter(article => 
          Array.isArray(article.places) && !article.places.length
        );
    
        console.log("Filtered Articles:", filteredArticles);
        setPlaces(filteredArticles);
    
      } catch (error) {
        console.error("", error);
      }
    };
    
      fetchProducts();
    }, []);
    return (
    <div className={styles.memorableplacessection}>
      <Row  className={styles.mainblog3}>
        <Col>
          <h2 className={styles.memorableheading}>
            <span>Memorable Places</span> to visit in New York
          </h2>
        </Col>
        <Col>
          <Button type="link" className={styles.seemorebtn} onClick={handleseemore}>
            See More
          </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {places.map((place) => (
          <Col key={place.id} xs={24} sm={24} md={24} lg={12} xl={12} style={{cursor:'pointer'}} onClick={() => handleReadMore(place._id)}>
            <div className={styles.blog}>
              <Image
                src={place.articleImage}
                width={200}
                height={200}
                className={styles.blogImage}

                alt={`${place.title}-image`}
              />
              <div className={styles.blogcontent}>
                <h2 className={styles.blogheading}>{place.title}</h2>
                <p className={styles.blogparagraph}>{place.shortDescription}</p>
                <div className={styles.bloglink}>
                  <h3 className={styles.bloglinkheading} >
                    Explore <RightOutlined />
                  </h3>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MemorablePlace;
