"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Form, Input, Button, message, Select, Space, Upload, DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from 'dayjs'; // Use 'moment' if your project uses moment
import Sidebar from "../../Sidebar/Sidebar";
import styles from "./article.module.css";

const { TextArea } = Input;
const { Option } = Select;

const ArticleForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form] = Form.useForm();
  const [articleId, setArticleId] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [articleImage, setArticleImage] = useState(null);
  const [placesCount, setPlacesCount] = useState(1);
  const [placesDetails, setPlacesDetails] = useState([]);
  const API_KEY = "8e847b93a52f4c9ee3af71bb7f3462da";

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setArticleId(id);
      fetchArticleDetails(id);
    }
  }, [searchParams]);

  const fetchArticleDetails = async (id) => {
    try {
      const response = await axios.get(`https://maplocally-be.vercel.app/api/get-article/${id}`);
      const article = response.data.data;
      form.setFieldsValue({
        title: article.title,
        shortDescription: article.shortDescription,
        fullDescription: article.fullDescription,
        userName: article.userName,
        date: dayjs(article.date), 
        views: article.views,
      });
      setUserImage(article.userImage);
      setArticleImage(article.articleImage);
      setPlacesCount(article.places.length);
      setPlacesDetails(article.places);
    } catch (error) {
      message.error("Failed to fetch article details.");
    }
  };

  const handleImageUpload = async (file, setImage) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        formData
      );
      const imageUrl = response.data.data.url;
      setImage(imageUrl);
      message.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Image Upload Error:", error.response?.data || error.message);
      message.error("Failed to upload image.");
    }
  };

  const handlePlaceImageUpload = async (file, index) => {
    if (!placesDetails[index]) {
      message.error("Invalid place index. Please ensure the place details are initialized correctly.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        formData
      );
      const imageUrl = response.data.data.url;
      const updatedPlaces = [...placesDetails];
      updatedPlaces[index].image = imageUrl;
      setPlacesDetails(updatedPlaces);
      message.success("Image uploaded successfully!");
    } catch (error) {
      message.error("Failed to upload image.");
    }
  };

  const handlePlaceImageRemove = (index) => {
    if (!placesDetails[index]) {
      message.error("Invalid place index. Cannot remove image.");
      return;
    }

    const updatedPlaces = [...placesDetails];
    updatedPlaces[index].image = null;
    setPlacesDetails(updatedPlaces);
    message.success("Image removed successfully!");
  };

  const handleImageRemove = (setImage) => {
    setImage(null);
    message.success("Image removed successfully!");
  };

  const handlePlacesChange = (value) => {
    const updatedPlaces = Array.from({ length: value }, (_, index) => ({
      title: "",
      shortDescription: "",
      image: "",
      number: "",
      website: "",
      address: "",
      ...(placesDetails[index] || {}), // Preserve existing data if it exists
    }));
    setPlacesCount(value);
    setPlacesDetails(updatedPlaces);
  };

  const handlePlaceDetailChange = (index, field, value) => {
    if (!placesDetails[index]) {
      message.error("Invalid place index. Cannot update details.");
      return;
    }

    const updatedPlaces = [...placesDetails];
    updatedPlaces[index][field] = value;
    setPlacesDetails(updatedPlaces);
  };

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        userImage, // Send only the URL
        date: values.date.format('YYYY-MM-DD'),
        articleImage, // Send only the URL
        places: placesDetails, // Includes images for places
      };

      if (articleId) {
        await axios.put(`https://maplocally-be.vercel.app/api/update-article/${articleId}`, payload);
        message.success("Article updated successfully!");
      } else {
        await axios.post(`https://maplocally-be.vercel.app/api/create-article`, payload);
        message.success("Article created successfully!");
      }

      router.push("/admin/dashboard/article-list");
    } catch (error) {
      console.error("Submit Error:", error.response?.data || error.message);
      message.error("Failed to submit article.");
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar className={styles.sidebar} />
      <div className={styles.mainContent}>
        <h1 className={styles.title}>{articleId ? "Edit Article" : "Create Article"}</h1>
        <Form form={form} onFinish={handleSubmit} layout="vertical" className={styles.form}>
          <Form.Item label="Title" name="title" rules={[{ required: true, message: "Title is required" }]}>  
            <Input className={styles.input} placeholder="Enter title" />
          </Form.Item>

          <Form.Item label="Short Description" name="shortDescription" rules={[{ required: true }]}>  
            <TextArea className={styles.textarea} rows={3} placeholder="Enter short description" />
          </Form.Item>

          <Form.Item label="Full Description" name="fullDescription" rules={[{ required: true }]}>  
            <TextArea className={styles.textarea} rows={6} placeholder="Enter full description" />
          </Form.Item>

          <Form.Item label="User Name" name="userName" rules={[{ required: true }]}>  
            <Input className={styles.input} placeholder="Enter user name" />
          </Form.Item>

          <Form.Item label="Date" name="date" rules={[{ required: true }]}>  
            <DatePicker className={styles.input} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Views" name="views" rules={[{ required: true }]}>  
            <Select className={styles.select} placeholder="Select views">
              {["10k", "20k", "50k", "100k"].map((view) => (
                <Option key={view} value={view}>{view}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="User Image">
            <Upload
              customRequest={({ file }) => handleImageUpload(file, setUserImage)}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />} className={styles.uploadButton}>Upload User Image</Button>
            </Upload>
            {userImage && (
              <div className={styles.imagePreview}>
                <img src={userImage} alt="User" className={styles.image} />
                <Button danger onClick={() => handleImageRemove(setUserImage)} className={styles.removeButton}>
                  Remove Image
                </Button>
              </div>
            )}
          </Form.Item>

          <Form.Item label="Article Image">
            <Upload
              customRequest={({ file }) => handleImageUpload(file, setArticleImage)}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />} className={styles.uploadButton}>Upload Article Image</Button>
            </Upload>
            {articleImage && (
              <div className={styles.imagePreview}>
                <img src={articleImage} alt="Article" className={styles.image} />
                <Button danger onClick={() => handleImageRemove(setArticleImage)} className={styles.removeButton}>
                  Remove Image
                </Button>
              </div>
            )}
          </Form.Item>

          <Form.Item label="Number of Places">
            <Select className={styles.select} defaultValue={1} onChange={handlePlacesChange}>
              {Array.from({ length: 10 }, (_, i) => (
                <Option key={i + 1} value={i + 1}>{i + 1}</Option>
              ))}
            </Select>
          </Form.Item>

          {Array.from({ length: placesCount }, (_, index) => (
            <div key={index} className={styles.placesSection}>
              <h3>Place {index + 1}</h3>
              <Input
                className={styles.input1}
                placeholder="Title"
                onChange={(e) => handlePlaceDetailChange(index, "title", e.target.value)}
              />
              <TextArea
                className={styles.textarea1}
                rows={2}
                placeholder="Short Description"
                onChange={(e) => handlePlaceDetailChange(index, "shortDescription", e.target.value)}
              />
              <Input
                className={styles.input1}
                placeholder="Number"
                onChange={(e) => handlePlaceDetailChange(index, "number", e.target.value)}
              />
              <Input
                className={styles.input1}
                placeholder="Website URL"
                onChange={(e) => handlePlaceDetailChange(index, "website", e.target.value)}
              />
              <Input
                className={styles.input1}
                placeholder="Address"
                onChange={(e) => handlePlaceDetailChange(index, "address", e.target.value)}
              />
              <Upload
                customRequest={({ file }) => handlePlaceImageUpload(file, index)}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />} className={styles.uploadButton}>
                  Upload Place Image
                </Button>
              </Upload>
              {placesDetails[index]?.image && (
                <div className={styles.imagePreview}>
                  <img
                    src={placesDetails[index].image}
                    alt={`Place ${index + 1}`}
                    className={styles.image}
                  />
                  <Button
                    danger
                    onClick={() => handlePlaceImageRemove(index)}
                    className={styles.removeButton}
                  >
                    Remove Image
                  </Button>
                </div>
              )}
            </div>
          ))}

          <Button type="primary" htmlType="submit" className={styles.submitButton}>
            {articleId ? "Update Article" : "Create Article"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ArticleForm;
