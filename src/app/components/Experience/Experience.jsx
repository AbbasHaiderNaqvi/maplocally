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
      {(loading || (highlights && highlights.length > 0)) && (
        <Row className={style.section}>
          <Col span={4} className={style.label}>
            {loading ? <Skeleton.Input active style={{ width: 80 }} /> : "Highlight"}
          </Col>
          <Col span={20}>
            {loading ? (
              <Skeleton active paragraph={{ rows: 3 }} />
            ) : (
              <ul className={`${style.list} ${style.highlightList}`}>
                {highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            )}
          </Col>
        </Row>
      )}

      {/* Full Description Section */}
      {(loading || fullDescription) && (
        <Row className={style.section}>
          <Col span={4} className={style.label}>
            {loading ? <Skeleton.Input active style={{ width: 120 }} /> : "Full description"}
          </Col>
          <Col span={20}>
            {loading ? (
              <Skeleton active paragraph={{ rows: 2 }} />
            ) : (
              <p className={style.para}>
                {fullDescription}
                <br />
                {/* <span className={style.link}>Read more</span> */}
              </p>
            )}
          </Col>
        </Row>
      )}

      {/* Includes Section */}
      {(loading || (includes && includes.length > 0)) && (
        <Row className={style.section}>
          <Col span={4} className={style.label}>
            {loading ? <Skeleton.Input active style={{ width: 80 }} /> : "Includes"}
          </Col>
          <Col span={20}>
            {loading ? (
              <Skeleton active paragraph={{ rows: 3 }} />
            ) : (
              <ul className={`${style.list} ${style.includesList}`}>
                {includes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </Col>
        </Row>
      )}

      {/* Meeting Point Section */}
      {(loading || meetingPoint) && (
        <Row className={style.section}>
          <Col span={4} className={style.label}>
            {loading ? <Skeleton.Input active style={{ width: 120 }} /> : "Meeting point"}
          </Col>
          <Col span={20}>
            {loading ? (
              <Skeleton active paragraph={{ rows: 2 }} />
            ) : (
              <p className={style.para}>
                {meetingPoint}
                <br />
                {/* <span className={style.link}>Google Maps</span> */}
              </p>
            )}
          </Col>
        </Row>
      )}

      {/* Important Information Section - Always visible */}
      {/* <Row className={`${style.section} ${style.sectionImportantInfo}`}>
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
      </Row> */}
    </div>
  );
};

export default Experience;
