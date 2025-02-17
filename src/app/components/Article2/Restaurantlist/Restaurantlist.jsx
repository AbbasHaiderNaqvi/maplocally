"use client"
import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import { EnvironmentOutlined, PhoneOutlined, GlobalOutlined } from "@ant-design/icons";
import styles from "./RestaurantList.module.css";

const data = [
  {
    id: 1,
    title: "Eaves Drop",
    image: "https://i.ibb.co/wBCwrWw/image-4.png",
    address: "552 W 235th St (Johnson Ave), Bronx, NY 10463",
    phone: "(718) 548-4534",
    website: "Visit Website",
    description:
      "Open since 1953, Liebman's is the last kosher deli in the Bronx – and is as much of a destination as its Manhattan rivals. Get the pastrami and corned beef on rye, the chicken soup, and the frankfurter. Dine in the seating area that's delightfully.",
  },
  {
    id: 2,
    title: "Public Records",
    image: "https://i.ibb.co/wBCwrWw/image-4.png",
    address: "552 W 235th St (Johnson Ave), Bronx, NY 10463",
    phone: "(718) 548-4534",
    website: "Visit Website",
    description:
      "When Roberto Paciullo established his eponymous restaurant in Belmont in 1989, it was surprising: There, among the red-sauced joints of Arthur Avenue, was a different kind of Italian restaurant – closely approximating the food you might find in a rural trattoria.",
  },
  {
    id: 3,
    title: "Cafe Modern",
    image: "https://i.ibb.co/wBCwrWw/image-4.png",
    address: "552 W 235th St (Johnson Ave), Bronx, NY 10463",
    phone: "(718) 548-4534",
    website: "Visit Website",
    description:
      "This cafe blends modern aesthetics with traditional cuisine. Enjoy a serene ambiance perfect for coffee lovers and casual diners alike.",
  },
  {
    id: 4,
    title: "The Green Table",
    image: "https://i.ibb.co/wBCwrWw/image-4.png",
    address: "552 W 235th St (Johnson Ave), Bronx, NY 10463",
    phone: "(718) 548-4534",
    website: "Visit Website",
    description:
      "Farm-to-table dining at its finest. Relish seasonal dishes sourced locally and crafted with care by expert chefs.",
  },
  {
    id: 5,
    title: "City Bistro",
    image: "https://i.ibb.co/wBCwrWw/image-4.png",
    address: "552 W 235th St (Johnson Ave), Bronx, NY 10463",
    phone: "(718) 548-4534",
    website: "Visit Website",
    description:
      "A hub for urban dwellers looking for vibrant food and drink. City Bistro offers a curated menu with a touch of elegance.",
  },
  {
    id: 6,
    title: "The Artisan",
    image: "https://i.ibb.co/wBCwrWw/image-4.png",
    address: "552 W 235th St (Johnson Ave), Bronx, NY 10463",
    phone: "(718) 548-4534",
    website: "Visit Website",
    description:
      "An artisanal haven showcasing exquisite dishes and drinks crafted with a modern twist, perfect for food connoisseurs.",
  },
  {
    id: 7,
    title: "Sunset Grill",
    image: "https://i.ibb.co/wBCwrWw/image-4.png",
    address: "552 W 235th St (Johnson Ave), Bronx, NY 10463",
    phone: "(718) 548-4534",
    website: "Visit Website",
    description:
      "A coastal-inspired eatery with a cozy vibe. Enjoy a menu brimming with fresh seafood and tropical cocktails.",
  },
];

const RestaurantList = () => {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  return (
    <div className={styles.container}>
      <Row gutter={[16, 16]}>
        {data.slice(0, visibleCount).map((item, index) => (
          <Col key={item.id} xs={24} sm={12} lg={12}>
            <div className={styles.card}>
              <h4 className={styles.title}>{`${index + 1}. ${item.title}`}</h4>
              <img alt={item.title} src={item.image} className={styles.image} />
              <div className={styles.infoSection}>
                <p className={styles.info}>
                  <EnvironmentOutlined className={styles.icon} /> {item.address}
                </p>
                <p className={styles.info}>
                  <PhoneOutlined className={styles.icon} /> {item.phone} {" "}
                  <span className={styles.global}>
                  <GlobalOutlined className={styles.icon} />{" "}
                  <a href="#" className={styles.link}>
                    {item.website}
                  </a>
                  </span>
                </p>
              </div>
              <p className={styles.description}>{item.description}</p>
            </div>
          </Col>
        ))}
      </Row>
      {visibleCount < data.length && (
        <div className={styles.seeMore}>
          <Button onClick={handleSeeMore}>See More</Button>
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
