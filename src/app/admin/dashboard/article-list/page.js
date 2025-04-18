"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Sidebar from "../../Sidebar/Sidebar";
import Productform from "../create-article/page"; 
import { Pagination } from "antd"; 
import styles from "./ArticleList.module.css";
import api from '../../../axiosInterceptor/axiosInterceptor';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editProduct, setEditProduct] = useState(null); // State to hold the product being edited
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const [pageSize, setPageSize] = useState(10); // State for the page size
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://maplocally-be.vercel.app/api/get-articles", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setProducts(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddNew = () => {
    router.push("/admin/dashboard/create-article");
  };

  const handleEdit = (productId) => {
    router.push(`/admin/dashboard/create-article?id=${productId}`);
  };
  const handleView = (productId) => {
    router.push(`/admin/dashboard/view-article/${productId}`);
  };
  
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`https://maplocally-be.vercel.app/api/delete-article/${productId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
        alert("Product deleted successfully.");
      } else {
        alert("Failed to delete the product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while trying to delete the product.");
    }
  };

  const filteredProducts = products.filter((product) => {
    return product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Paginate the filtered products
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const onChangePage = (page) => {
    setCurrentPage(page); // Update the current page
  };

  if (editProduct) {
    return (
      <Productform
        product={editProduct} // Pass the selected product to the form
        onClose={() => setEditProduct(null)} // Callback to return to the list view
      />
    );
  }

  return (
    <div className={styles.mainLayout}>
      <Sidebar />
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Articles List</h1>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <button className={styles.addNewBtn} onClick={handleAddNew}>
            Add New
          </button>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.productTable}>
            <thead>
              <tr className={styles.tableRow}>
                <th className={styles.tableHeader}>Product</th>
                <th className={styles.tableHeader}>UserName</th>
                <th className={styles.tableHeader}>Article ID</th>
                <th className={styles.tableHeader}>User Image</th>
                <th className={styles.tableHeader}>Created At</th>
                <th className={styles.tableHeader}>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <tr className={styles.tableRow} key={product._id}>
                    <td className={styles.tableCell}>
                      <div className={styles.productInfo}>
                        <img
                          src={product.
                            articleImage?.[0] || "/placeholder.png"}
                          alt={product.title}
                          className={styles.productImage}
                        />
                        <span>{product.title}</span>
                      </div>
                    </td>
                    <td className={styles.tableCell}>{product.userName || "N/A"}</td>
                    <td className={styles.tableCell}>{product._id}</td>
                    <td className={styles.tableCell}>
                      <div>
                      <img
                          src={product.
                            userImage?.[0] || "/placeholder.png"}
                          alt={product.title}
                          className={styles.productImage}
                        />
                      </div>
                    </td>
                    <td className={styles.tableCell}>{product.date || "N/A"}</td>
                    <td className={styles.tableCell}>
                      <div className={styles.actionBtns}>
                        <button className={styles.viewBtn} onClick={() => handleView(product._id)}>
                          View
                        </button>
                        <button className={styles.editBtn} onClick={() => handleEdit(product._id)}>
                          Edit
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className={styles.noProductFound}>
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={styles.pagination}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredProducts.length}
            onChange={onChangePage}
            showSizeChanger
            pageSizeOptions={["10", "20", "30"]}
            onShowSizeChange={(current, size) => setPageSize(size)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;