import React from 'react';
import { Row, Col, Rate } from 'antd'; // Import Rate from Ant Design
import styles from './Feedback.module.css';

const testimonials = [
  {
    name: "Ralph Gibson",
    location: "London, England",
    review: "I've been using map locally for years now...",
    desc: "It's very convenient to have this all around pass! It was our first time visiting New York and it is a must have to get this pass as it will save you time, money, and effort. Using this pass, my mom and I were able to visit The Rockefeller Center....",
    rating: 5,
  },
  {
    name: "Genvis",
    location: "France",
    review: "I've been using map locally for years now...",
    desc: "It's very convenient to have this all around pass! It was our first time visiting New York and it is a must have to get this pass as it will save you time, money, and effort. Using this pass, my mom and I were able to visit The Rockefeller Center....",
    rating: 5,
  },
  {
    name: "Ariga",
    location: "Mexico, USA",
    review: "I've been using map locally for years now...",
    desc: "It's very convenient to have this all around pass! It was our first time visiting New York and it is a must have to get this pass as it will save you time, money, and effort. Using this pass, my mom and I were able to visit The Rockefeller Center....",
    rating: 5,
  },
  {
    name: "Abbas",
    location: "Mexico, USA",
    review: "I've been using map locally for years now...",
    desc: "It's very convenient to have this all around pass! It was our first time visiting New York and it is a must have to get this pass as it will save you time, money, and effort. Using this pass, my mom and I were able to visit The Rockefeller Center....",
    rating: 4,
  },
];

const Feedback = () => {
  return (
    <div className={styles.testimonialssection} id='feedback'>
      <h2>
        Why People <span className={styles.highlight}>Love</span> New York
      </h2>
      <Row gutter={[16, 16]} className={styles.testimonialscontainer} wrap={false}>
        {testimonials.map((testimonial, index) => (
          <Col key={index} className={styles.testimonialcardContainer}>
            <div className={styles.testimonialcard}>
              <div className={styles.testimonialheader}>
                <img
                  src={`https://i.pravatar.cc/50?img=${index + 1}`}
                  alt={`${testimonial.name}'s profile`}
                  className={styles.testimonialavatar}
                />
                <div className={styles.testimonialcontent}>
                  <h4 className={styles.testimonialname}>{testimonial.name}</h4>
                  <p className={styles.testimoniallocation}>{testimonial.location}</p>
                </div>
              </div>
              <p className={styles.testimonialreview}>{testimonial.review}</p>
              <p className={styles.testimonialdesc}>{testimonial.desc}</p>
              <div className={styles.testimonialrating}>
                <Rate value={testimonial.rating} disabled className={styles.stars} />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Feedback;
