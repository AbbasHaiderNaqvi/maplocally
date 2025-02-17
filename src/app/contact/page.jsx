"use client";
import React from 'react';
import { Button, Col, Row, Input, Form, message } from 'antd';
import styles from './contact.module.css';
import { useRouter } from 'next/navigation';
import api from '../axiosInterceptor/axiosInterceptor';

const Contact = () => {
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      const response = await api.post('/api/contact', values);

      console.log('Server Response:', response.data);
      message.success('Thank you! We will contact you soon');
      router.push('/');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
      <div>
        <div className={styles.contact_heading_main}>Contact Us</div>
        <div className={styles.contact_container}>
          <Form
            name="contactForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Name"
                  name="name"
                  className={styles.Row1}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your name',
                      pattern: /^[A-Za-z ]+$/,
                    },
                  ]}
                >
                  <Input
                    placeholder="Your Name"
                    autoComplete="off"
                    className={styles.Input1}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Email Address"
                  name="email"
                  className={styles.Row}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your email',
                      type: 'email',
                    },
                  ]}
                >
                  <Input
                    placeholder="Your Email Address"
                    autoComplete="off"
                    className={styles.Input2}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Company"
                  name="Company"
                  className={styles.Row2}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your company',
                    },
                  ]}
                >
                  <Input
                    placeholder="Your Company"
                    autoComplete="off"
                    className={styles.Input1}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Subject"
                  name="subject"
                  className={styles.Row2}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your subject',
                    },
                  ]}
                >
                 <Input 
                    placeholder="Your Subject"
                    autoComplete="off"
                    className={styles.Input1}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
                <Form.Item
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Message"
                  name="message"
                  className={styles.TextArea}
                  rules={[
                    {
                      required: true,
                      message: 'Enter Your Message',
                    },
                  ]}
                >
                      <Input.TextArea rows={6} placeholder="Enter Your Message" maxLength={6} className={styles.InputTextArea}/>
                </Form.Item>
            </Row>
            <Row justify="center">
              <Col>
                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button
                    className={styles.Submit_Button}
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
  );
};

export default Contact;
