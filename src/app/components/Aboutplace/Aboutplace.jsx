"use client";
import { Card, Row, Col, Skeleton } from 'antd';
import style from './Aboutplace.module.css';

const Aboutplace = ({ title, sections, loading }) => {
  return (
    <Card className={style.mainsection}>
      {loading ? (
        // Skeleton for the title
        <Skeleton.Input active style={{ width: 200, height: 24, marginBottom: 16 }} />
      ) : (
        <h2 className={style.title}>{title}</h2>
      )}
      
      <Row gutter={[16, 16]}>
        {loading
          ? // Skeleton for descriptions
            Array(3) // Adjust the number of placeholders based on expected content
              .fill(null)
              .map((_, index) => (
                <Col span={24} key={index}>
                  <Skeleton active paragraph={{ rows: 1, width: '100%' }} />
                </Col>
              ))
          : sections.map((section, index) => (
              <Col span={24} key={index}>
                <p className={style.description}>{section}</p>
              </Col>
            ))}
      </Row>
    </Card>
  );
};

export default Aboutplace;
