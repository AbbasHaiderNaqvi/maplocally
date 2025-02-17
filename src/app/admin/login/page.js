"use client";
import React, { useState } from 'react';
import styles from '../login/Login.module.css';
import { Form, Input, Button, message,Row,Col } from 'antd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import api from '../../axiosInterceptor/axiosInterceptor';


const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log(values);
      const response = await api.post('/api/login', values);
      const { Token } = response.data;

      if (Token) {
        localStorage.setItem('token', Token);
        message.success('Login successful');
        console.log(Token);
        router.push('/admin/dashboard/product-list');
      } else {
        message.error('Invalid login details');
      }
    } catch (error) {
      console.error(error);
      message.error('Invalid login details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <Row justify="center" align="middle">
        <Col
          xs={0}
          sm={0}
          md={12}
          lg={12}

        >
          <div className={styles.image_section}>
            <Image 
            src={"https://i.ibb.co/Vt1k2NN/Group-1000003420.png"}
            alt='admin-image'
            width={450}
            height={450}
            className={styles.admin_image}
            />
            <h4 className={styles.heading}>People Dont take trips, trips take people</h4>
            <h6 className={styles.paragraph}>To get the best of your adventure you just need to Leave and go where you like. We are waiting for you!</h6>
          
          </div>
        </Col>
        <Col
          xs={0}
          sm={0}
          md={12}
          lg={12}

        >
          <div className={styles.login_container}>
             
            <Form name="login" onFinish={onFinish} className={styles.login_form}>
              <h3 className={styles.login_heading}> Login to your Admin Account</h3>
              <Form.Item name="email" rules={[{ required: true, message: 'Please enter your username!' }]}>
                <Input placeholder="Email" className={styles.input1}/>
              </Form.Item>

              <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password!' }]}>
                <Input.Password placeholder="Password"  className={styles.input2}/>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} className={styles.login_button}>
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>

    </div>
  );
};

export default Login;
