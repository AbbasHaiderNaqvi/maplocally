'use client';
import React, { useState } from 'react';
import styles from './ArticleHero.module.css';
import { Row, Col } from 'antd';
import { CiSearch } from 'react-icons/ci';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchValue);
    // Add your search logic here
  };

  return (
    <div className={styles.searchbar}>
      <input
        type="text"
        placeholder="Search for any destination"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={styles.input}
      />
      <button className={styles.searchButton} onClick={handleSearch}>
        <CiSearch style={{ fontSize: '20px', color: 'white' }} />
      </button>
    </div>
  );
};

const ArticleHero = () => {
  return (
    <div className={styles.main}>
      <div className={styles.herosection}>
        <img
          src="https://i.ibb.co/jhpn6wS/Group-2-1.png"
          alt="Hero Background"
          className={styles.heroImage}
        />

        <div className={styles.content}>
          <Row justify="center" align="middle">
            <Col
              xs={22}
              sm={20}
              md={16}
              lg={12}

            >
              <SearchBar />
            </Col>
          </Row>
          <Row justify="center" align="middle">
            <Col
              xs={22}
              sm={20}
              md={18}
              lg={16}

            >
              <h1 className={styles.heading}>
                <ul className={styles.hashtagList}>
                  <li>#Trending News</li>
                  <li>#Social media</li>
                  <li>#Mailing</li>
                  <li>#Manusipi</li>
                </ul>
              </h1>


            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ArticleHero;
