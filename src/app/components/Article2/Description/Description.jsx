"use client"
import { Card, Row, Col } from 'antd';
import style from './Description.module.css';

const Description = ({ title, sections }) => {
  return (
    <Card
      className={style.mainsection}
    >
      <Row gutter={[16, 16]}>
        {sections.map((section, index) => (
          <Col span={24} key={index}>
            <p className={style.description}>{section}</p>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default Description;
