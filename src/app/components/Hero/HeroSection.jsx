'use client';
import React, { useState } from 'react';
import styles from './Hero.module.css';
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

const Hero = () => {
  return (
    <div className={styles.main}>
      <div className={styles.herosection}>
        <img
          src="https://i.ibb.co/cJgB1ky/Group-1000003434.png"
          alt="Hero Background"
          className={styles.heroImage}
        />

        <div className={styles.content}>
          <Row justify="center" align="middle">
            <Col
              xs={22} 
              sm={20}  
              md={18}  
              lg={16} 
          
            >
              <h1 className={styles.heading}>
                Discover dreams in New York&apos;s Iconic Spots
              </h1>
              <p className={styles.paragraph}>
                like the Empire State Building, Guggenheim Museum, and Michelin-starred Jean Georges
              </p>
            </Col>
          </Row>
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
        </div>
      </div>
    </div>
  );
};

export default Hero;
