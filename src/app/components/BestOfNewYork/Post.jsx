"use client"
import { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import PostSection from "./PostSection"
import { Layout, Skeleton, Button } from "antd"
import { FilterOutlined, CloseOutlined } from "@ant-design/icons"
import styles from "./Post.module.css"

const { Sider, Content } = Layout

function Post({ search }) {
  const [filters, setFilters] = useState({
    category: [],
    date: null,
    people: "",
    priceRange: [0, 2000],
    search: ""
  })

  const [loading, setLoading] = useState(true)
  const [collapsed, setCollapsed] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  const handleFiltersChange = (updatedFilters) => {
    setFilters(updatedFilters)
    setLoading(true)
  }

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: search || "",
    }))
    console.log(search)
  }, [search])

  useEffect(() => {
    const fetchData = async () => {
      const MIN_DISPLAY_TIME = 2000
      const startTime = Date.now()
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, MIN_DISPLAY_TIME - elapsedTime)
      setTimeout(() => setLoading(false), remainingTime)
    }
    fetchData()
  }, [filters])

  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth < 1200)
      setIsMobile(window.innerWidth < 1200)
    }

    // Initial check on mount
    handleResize()

    window.addEventListener("resize", handleResize)
    // return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <Layout className={styles.mainSection}>
      <Sider
        width={350}
        collapsedWidth="0"
        collapsible
        collapsed={isMobile && collapsed}
        trigger={null}
        style={{ background: "#fff", padding: "20px" }}
        breakpoint="lg"
        
      >
        <Sidebar filters={filters} onFiltersChange={handleFiltersChange} />
      </Sider>

      <Layout className={styles.contentSection}>
        {/* Mobile Filter Button */}
        {isMobile && (
          <Button
            className={styles.menuButton}
            style={{ background: "#007e9b", color: "white", margin: "10px" }}
            icon={<FilterOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        )}

        <Content>
          <PostSection loading={loading} filters={filters} />
        </Content>
      </Layout>
    </Layout>
  )
}

export default Post
