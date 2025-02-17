import React, { useState, useEffect } from "react";
import { Skeleton, Select, InputNumber, Slider } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "antd/dist/reset.css";
import styles from "./Sidebar.module.css";

const { Option } = Select;

const Sidebar = ({ filters, onFiltersChange }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call with a timeout
    const timer = setTimeout(() => setLoading(false), 1000); // Minimum 2s skeleton display
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const handleCategoryChange = (value) => {
    onFiltersChange({ ...filters, category: value });
  };

  const handleDateChange = (date) => {
    onFiltersChange({ ...filters, date });
  };

  const handlePeopleChange = (value) => {
    onFiltersChange({ ...filters, people: value === 0 ? "any" : value });
  };

  const handlePriceChange = (value) => {
    onFiltersChange({ ...filters, priceRange: value });
  };

  const options = [
    { value: "neighborhoods", label: "Neighborhoods" },
    { value: "broadway", label: "Broadway Shows" },
    { value: "museum", label: "Museums" },
    { value: "restaurants", label: "Restaurants" },
    { value: "bars", label: "Bars" },
    { value: "music", label: "Music" },
    { value: "tourist_routes", label: "Tourist Routes" },
  ]; 

  const renderOption = (option) => {
    const isChecked = filters.category.includes(option.value);
    return (
      <label className={styles.categoryoption} key={option.value}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => {
            const newCategories = isChecked
              ? filters.category.filter((cat) => cat !== option.value)
              : [...filters.category, option.value];
            handleCategoryChange(newCategories);
          }}
        />
        {option.label}
      </label>
    );
  };

  const priceRangeString = `$${filters.priceRange[0]}- $${filters.priceRange[1]}`;

  // Custom Skeleton for Sidebar
  const renderSkeleton = () => (
    <div className={styles.sidebar}>
      <h3>
        <Skeleton.Input style={{ width: "150px", height: "24px" }} active />
      </h3>
      <Skeleton.Input
        style={{ width: "100%", height: "40px", marginBottom: "20px" }}
        active
      />

      <h3>
        <Skeleton.Input style={{ width: "200px", height: "24px" }} active />
      </h3>
      <Skeleton.Input
        style={{ width: "100%", height: "40px", marginBottom: "20px" }}
        active
      />

      <h3>
        <Skeleton.Input style={{ width: "150px", height: "24px" }} active />
      </h3>
      <Skeleton.Input
        style={{ width: "100%", height: "40px", marginBottom: "20px" }}
        active
      />

      <h3>
        <Skeleton.Input style={{ width: "80px", height: "24px" }} active />
      </h3>
      <Skeleton.Input
        style={{ width: "100%", height: "40px", marginBottom: "10px" }}
        active
      />
      <Skeleton
        title={false}
        paragraph={{ rows: 1, width: "100%" }}
        active
        style={{ marginBottom: "20px" }}
      />
    </div>
  );

  if (loading) {
    return renderSkeleton();
  }

  // Render actual Sidebar content once loading is complete
  return (
    <div className={styles.sidebar}>
      <h3>Category</h3>
      <Select
        mode="multiple"
        value={filters.category}
        style={{ width: "100%" }}
        onChange={handleCategoryChange}
        placeholder="Select Categories"
        className={styles.customselect}
        dropdownRender={() => <div>{options.map((option) => renderOption(option))}</div>}
      >
        {options.map((option) => (
          <Option key={option.value} value={option.value} style={{ display: "none" }}>
            {option.label}
          </Option>
        ))}
      </Select>

      <h3>When are you going?</h3>
      <DatePicker
        selected={filters.date}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select Date"
        className={styles.customdatepicker}
      />

      <h3>How many people</h3>
      <InputNumber
        min={0}
        value={filters.people}
        onChange={handlePeopleChange}
        style={{ width: "100%" }}
      />

      <h3>Price</h3>
      <div className={styles.priceInputWrapper}>
        <InputNumber
          value={priceRangeString}
          readOnly
          style={{
            width: "100%",
            borderRadius: "4px",
            textAlign: "center",
          }}
        />
      </div>
      <Slider
        range
        min={0}
        max={2000}
        value={filters.priceRange}
        onChange={handlePriceChange}
        tooltip={{
          formatter: (value) => `$${value}`,
        }}
        step={50}
        style={{ marginTop: "20px" }}
      />
    </div>
  );
};

export default Sidebar;
