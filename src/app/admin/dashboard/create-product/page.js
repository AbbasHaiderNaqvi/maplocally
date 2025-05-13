"use client";
import React, { useEffect, useState } from "react";
import { UploadOutlined, CheckOutlined,CloseOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  message,
  Select,
  Space,
  Switch,
  Upload,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import styles from "./product.module.css";
import Sidebar from "../../Sidebar/Sidebar";

const { TextArea } = Input;
const { Option } = Select;

const Productform = () => {
  const [form] = Form.useForm();
  const [productImages, setProductImages] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [includes, setIncludes] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [mapeLink, setMapeLink] = useState("");
  const [longitude, setLongitude] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tourDate, setTourDate] = useState(null);
  const [isFeatured, setIsFeatured] = useState(false);

  const API_KEY = "8e847b93a52f4c9ee3af71bb7f3462da";

  const [productId, setProductId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure this runs only on the client-side
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      if (id) {
        setProductId(id);
        fetchProductDetails(id);
      }
    }
  }, []);

  const handleImageUpload = async (file) => {
    if (productImages.length >= 5) {
      message.warning("You can upload a maximum of 5 images.");
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
      setProductImages([...productImages, imageUrl]);
      message.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      message.error("Failed to upload image.");
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = productImages.filter((_, i) => i !== index);
    setProductImages(updatedImages);
  };

  // useEffect(() => {
  //   const id = searchParams.get("id"); // Use `useSearchParams` to access query params in Next.js app directory
  //   if (id) {
  //     setProductId(id);
  //     fetchProductDetails(id);
  //   }
  // }, [searchParams]);

  const fetchProductDetails = async (id) => {
    try {
      const response = await axios.get(
        `https://maplocally-be.vercel.app/api/get-product/${id}`
      );
      const product = response.data.data;

      form.setFieldsValue({
        title: product.title || "",
        subTitle: product.subTitle || "",
        tags: product.tags.join(", ") || "",
        briefDescription: product.briefDescription || "",
        price: product.price || "",
        tourDuration: product.tourDuration || "",
        tourLanguage: product.tourLanguage || "",
        pickupOption: product.pickupOption || "",
        groupSize: product.groupSize || "",
        fullDescription: product.fullDescription || "",
        meetingPoint: product.meetingPoint || "",
        mapeLink: product?.mapeLink || "",
      });

      setProductImages(product.productImages || []);
      setHighlights(product.highlights || []);
      setIncludes(product.includes || []);
      setSelectedCategory(product.category || "");
      setLatitude(product.latitude || "");
      setMapeLink(product.mapeLink || "");

      setLongitude(product.longitude || "");
      setTourDate(product.tourDate ? dayjs(product.tourDate) : null);

      console.log("Fetched product details:", product);
    } catch (error) {
      console.error("Error fetching product details:", error);
      message.error("Failed to fetch product details.");
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (productId) {
        // Update product
        await axios.put(
          `https://maplocally-be.vercel.app/api/update-product/${productId}`,
          {
            title: values.title,
            subTitle: values.subTitle,
            tags: values.tags || [],
            briefDescription: values.briefDescription,
            fullDescription: values.fullDescription,
            price: values.price,
            highlights,
            mapeLink,
            includes,
            // latitude,
            mapeLink,
            longitude,
            category: selectedCategory,
            tourDate: tourDate ? dayjs(tourDate).format("YYYY-MM-DD") : null,
            productImages,
            tourDuration: values.tourDuration ? values.tourDuration : "",
            tourLanguage: values.tourLanguage,
            pickupOption: values.pickupOption,
            groupSize: values.groupSize ? values.groupSize : "",
            meetingPoint: values.meetingPoint,
          }
        );
        message.success("Product updated successfully!");
        router.push("/admin/dashboard/product-list");
      } else {
        const apiUrl = isFeatured
          ? `https://maplocally-be.vercel.app/api/create-featured-product`
          : `https://maplocally-be.vercel.app/api/create-product`;
        await axios.post(apiUrl, {
          title: values.title,
          subTitle: values.subTitle,
          tags: values.tags || [],
          briefDescription: values.briefDescription,
          fullDescription: values.fullDescription,
          price: values.price,
          highlights,
          includes,
          // latitude,
          // longitude,
          mapeLink,
          category: selectedCategory,
          tourDate: tourDate ? dayjs(tourDate).format("YYYY-MM-DD") : null,
          productImages,
          tourDuration: values.tourDuration,
          tourLanguage: values.tourLanguage,
          pickupOption: values.pickupOption,
          groupSize: values.groupSize,
          meetingPoint: values.meetingPoint,
        });
        message.success("Product created successfully!");
        router.push("/admin/dashboard/product-list");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Failed to submit form.");
    }
  };

  return (
    <div>
      <Sidebar />
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className={styles.mainContent}
        style={{
          paddingTop: '90px',
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      >
        <div
          style={{
            position: 'fixed',
            zIndex: 2,
            width: '100%',
            background: 'white',
            padding: '16px 0',
            top: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <h1
            className={styles.title}
            style={{ margin: 0 }}
          >
            {productId ? 'Edit Product' : 'Create Product'}
          </h1>

          <Button
            htmlType="submit"
            style={{ margin: '0', background: 'rgb(10 129 157)', color: "white" }}
            className={styles.submitButton}
            icon={<CheckOutlined />}
          >
            Save
          </Button>
        </div>


        {/* Basic Information */}
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the Title" }]}
        >
          <Input placeholder="Enter product title" className={styles.input} />
        </Form.Item>
        <Form.Item label="Subtitle" name="subTitle"
          rules={[{ required: true, message: "Please enter the Subtitle" }]}
        >
          <Input
            className={styles.input}
            placeholder="Enter product subtitle"
          />
        </Form.Item>
        <Form.Item name="tags" label="Tags (Max 3)" >
          <Select
            mode="tags"
            maxTagCount={3}
            placeholder="Enter up to 3 tags"
          />
        </Form.Item>
        <Form.Item label="Brief Description" name="briefDescription"
          rules={[{ required: true, message: "Please enter the Brief Description" }]}
        >
          <TextArea
            rows={4}
            placeholder="Enter brief description"
            className={styles.textarea}
          />
        </Form.Item>

        <Form.Item label="Full Description" name="fullDescription"
          rules={[{ required: true, message: "Please enter the Full Description" }]}
        >
          <TextArea
            rows={6}
            placeholder="Enter full description"
            className={styles.textarea}
          />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
        // rules={[{ required: true, message: "Please enter the price" }]}
        >
          <Input
            type="number"
            placeholder="Enter price"
            className={styles.input}
          />
        </Form.Item>

        <Form.Item label="Highlights"  name="highlightInput">
          <Space direction="vertical">
            <Input
              placeholder="Add highlight"
              onPressEnter={(e) => {
                if (e.target.value.trim() !== "") {
                  setHighlights([...highlights, e.target.value.trim()]);
                  form.resetFields(["highlightInput"]);
                  e.target.value = "";
                }
              }}
              suffix={<Button onClick={() => setHighlights([])}  icon={<CloseOutlined />} disabled={!highlights.length}>Clear All</Button>}
            />
            
            <ul>
              {highlights.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Space>
        </Form.Item>

        <Form.Item label="Includes" name="IncludeInput">
          <Space direction="vertical">
            <Input
              placeholder="Add include"
              onPressEnter={(e) => {
                if (e.target.value.trim() !== "") {
                  setIncludes([...includes, e.target.value.trim()]);
                  e.target.value = "";
                  form.resetFields(["IncludeInput"]);

                }
              }}
              suffix={ <Button onClick={() => setIncludes([])} icon={<CloseOutlined />} disabled={!includes.length}>Clear All</Button>}
            />
           
            <ul>
              {includes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Space>
        </Form.Item>

        <Form.Item
          label="Tour Duration"
          name="tourDuration"
        // rules={[{ required: true }]}
        >
          <Select placeholder="Select duration" allowClear>
            {Array.from({ length: 24 }, (_, i) => (
              <Option key={i + 1} value={`${i + 1} hours`}>
                {i + 1} hours
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Tour Language" name="tourLanguage">
          <Input placeholder="Enter tour language" className={styles.input} />
        </Form.Item>
        <Form.Item label="Pickup Option" name="pickupOption">
          <Input placeholder="Enter pickup option" className={styles.input} />
        </Form.Item>
        <Form.Item
          label="Group Size"
          name="groupSize"
        // rules={[{ required: true }]}
        >
          <Select placeholder="Select group size" allowClear>
            {Array.from({ length: 10 }, (_, i) => (
              <Option key={(i + 1) * 5} value={(i + 1) * 5}>
                {(i + 1) * 5}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Meeting Point"
          name="meetingPoint"
          rules={[
          ]}
        >
          <Input placeholder="Enter meeting point" className={styles.input} />
        </Form.Item>

        <Form.Item
          label="Google Map Link"
          name="mapeLink"
          rules={[
            {
              message: "Please enter a Google Maps URL",
            },
            {
              validator: (_, value) =>
                value && (!value.includes(".com"))
                  ? Promise.reject("URL must be a Google Maps link")
                  : Promise.resolve(),
            },
          ]}
        >
          <Input
            placeholder="Enter Google Maps link"
            value={mapeLink}
            onChange={(e) => setMapeLink(e.target.value)}
            className={styles.input}
          />
        </Form.Item>

        {/* <Form.Item label="Longitude">
            <Input
              placeholder="Enter longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className={styles.input}
            />
          </Form.Item> */}

        <Form.Item label="Category">
          <Select
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value)}
            placeholder="Select category"
            className={styles.select}
          >
            <Option value="guide">Your Local Guide</Option>
            <Option value="neighborhoods">Neighborhoods</Option>
            <Option value="restaurants_bars">Restaurants + Bars</Option>
            <Option value="entertainment">Entertainment</Option> {/* was Broadway Shows */}
            <Option value="events">Events</Option>
            <Option value="music">Music</Option>
            <Option value="sites_museums">Sites + Museums</Option> {/* was Museums */}
          </Select>
        </Form.Item>


        <Form.Item label="Tour Date">
          <Input
            type="date"
            value={tourDate ? tourDate.format("YYYY-MM-DD") : ""}
            onChange={(e) => setTourDate(dayjs(e.target.value))}
          />
        </Form.Item>
        <Form.Item
          label="Image Upload"
          rules={[
            { required: true, message: "Please upload at least one image" },
          ]}
        >
          <Upload
            customRequest={({ file }) => handleImageUpload(file)}
            listType="picture"
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />} className={styles.uploadButton}>
              Upload Image
            </Button>
          </Upload>
          <div className={styles.imagePreview}>
            {productImages.map((url, index) => (
              <div key={index} className={styles.imageContainer}>
                <img
                  src={url}
                  alt={`Uploaded ${index}`}
                  className={styles.image}
                />
                <Button
                  danger
                  onClick={() => handleRemoveImage(index)}
                  className={styles.removeButton}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </Form.Item>

        <Form.Item label="Feature Product">
          <Switch
            checked={isFeatured}
            onChange={(checked) => setIsFeatured(checked)}
            checkedChildren="Yes"
            unCheckedChildren="No"
            className={styles.switch}
          />
        </Form.Item>


      </Form>
    </div>
  );
};

export default Productform;
