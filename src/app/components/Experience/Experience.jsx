"use client";
import React from "react";
import { Row, Col, Skeleton } from "antd";
import style from "./Experience.module.css";

const Experience = ({ loading, fullDescription, highlights, includes, meetingPoint }) => {
  return (
    <div className={style.container}>
      <h2 className={style.title}>
        {loading ? <Skeleton.Button active style={{ width: "50%", height: 30 }} /> : "The Original Experience"}
      </h2>

      {/* Highlight Section */}
      <Row className={style.section}>
        <Col span={4} className={style.label}>
          {loading ? <Skeleton.Input active style={{ width: 80 }} /> : "Highlight"}
        </Col>
        <Col span={20}>
          {loading ? (
            <Skeleton active paragraph={{ rows: 3 }} />
          ) : (
            <ul className={`${style.list} ${style.highlightList}`}>
              {highlights?.length > 0 ? (
                highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))
              ) : (
                <li>No highlights available</li>
              )}
            </ul>
          )}
        </Col>
      </Row>

      {/* Full description Section */}
      <Row className={style.section}>
        <Col span={4} className={style.label}>
          {loading ? <Skeleton.Input active style={{ width: 120 }} /> : "Full description"}
        </Col>
        <Col span={20}>
          {loading ? (
            <Skeleton active paragraph={{ rows: 2 }} />
          ) : (
            <p className={style.para}>
              {fullDescription || "No description available."}
              <br />
              <span className={style.link}>Read more</span>
            </p>
          )}
        </Col>
      </Row>

      {/* Includes Section */}
      <Row className={style.section}>
        <Col span={4} className={style.label}>
          {loading ? <Skeleton.Input active style={{ width: 80 }} /> : "Includes"}
        </Col>
        <Col span={20}>
          {loading ? (
            <Skeleton active paragraph={{ rows: 3 }} />
          ) : (
            <ul className={`${style.list} ${style.includesList}`}>
              {includes?.length > 0 ? (
                includes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <li>No included items available</li>
              )}
            </ul>
          )}
        </Col>
      </Row>

      {/* Meeting point Section */}
      <Row className={style.section}>
        <Col span={4} className={style.label}>
          {loading ? <Skeleton.Input active style={{ width: 120 }} /> : "Meeting point"}
        </Col>
        <Col span={20}>
          {loading ? (
            <Skeleton active paragraph={{ rows: 2 }} />
          ) : (
            <p className={style.para}>
              {meetingPoint || "No meeting point available."}
              <br />
              <span className={style.link}>Google Maps</span>
            </p>
          )}
        </Col>
      </Row>

      {/* Important information Section */}
      <Row className={`${style.section} ${style.sectionImportantInfo}`}>
        <Col span={4} className={style.label}>
          {loading ? <Skeleton.Input active style={{ width: 180 }} /> : "Important information"}
        </Col>
        <Col span={20}>
          {loading ? (
            <Skeleton active paragraph={{ rows: 4 }} />
          ) : (
            <Row>
              <Col span={20} className={style.infosec}>
                <h4 className={style.subtitle}>What to bring</h4>
                <ul className={`${style.list} ${style.impList}`}>
                  <li>Comfortable shoes</li>
                  <li>Warm clothing</li>
                </ul>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Experience;
