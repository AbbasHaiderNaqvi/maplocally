"use client";
import React, { useState } from 'react';
import { Collapse } from 'antd';
import styles from './faq.module.css';  // CSS for custom styling

const { Panel } = Collapse;

const faqs = [
  {
    question: 'What is React?',
    answer: 'React is a JavaScript library for building user interfaces.'
  },
  {
    question: 'What is Ant Design?',
    answer: 'Ant Design is a React UI framework that offers various components.'
  },
  {
    question: 'What is Ant Design?',
    answer: 'Ant Design is a React UI framework that offers various components.'
  },

];

const FaqSection = () => {
  const [activeKey, setActiveKey] = useState(null);

  const handleCollapseChange = (key) => {
    setActiveKey(key);
  };

  return (
    <div className={styles.faqsection}>
      <h2 className={styles.faqheading}><span>FAQs</span> about New York</h2>
      <Collapse
        accordion
        activeKey={activeKey}
        className='faq-dropdown'
        onChange={handleCollapseChange}
        expandIconPosition="right"
        expandIcon={({ isActive }) => (
          <img
            src="https://i.ibb.co/T4cKJSw/Group-48101001-1.png" // Replace with your icon URL or path
            alt="dropdown-icon"
            style={{
              width: '25px',
              height: '25px',
              transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease'
            }}  // Rotates icon if needed
          />
        )}
      >
        {faqs.map((faq, index) => (

        <Panel className={styles.panel} header={<span className={styles.question}>{faq.question}</span>} key={index}>
          <p>{faq.answer}</p>
        </Panel>

        ))}
      </Collapse>
    </div>
  );
};

export default FaqSection;
