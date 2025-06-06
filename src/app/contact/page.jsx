"use client"
import { Button, Col, Row, Input, Form, message } from "antd"
import { useRouter } from "next/navigation"
import api from "../axiosInterceptor/axiosInterceptor"

const Contact = () => {
  const router = useRouter()

  const onFinish = async (values) => {
    try {
      const response = await api.post("/api/contact", values)

      console.log("Server Response:", response.data)
      message.success("Thank you! We will contact you soon")
      router.push("/")
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12" style={{padding:'4em', marginTop:'5rem'}}>
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800" >Contact Us</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <Form name="contactForm" onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical" size="large">
          <Row gutter={[24, 16]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                label={<span className="text-gray-700 font-medium">Name</span>}
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name",
                    pattern: /^[A-Za-z ]+$/,
                  },
                ]}
              >
                <Input
                  placeholder="Your Name"
                  autoComplete="off"
                  className="rounded-md border-gray-300 hover:border-blue-500 focus:border-blue-500"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                label={<span className="text-gray-700 font-medium">Email Address</span>}
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email",
                    type: "email",
                  },
                ]}
              >
                <Input
                  placeholder="Your Email Address"
                  autoComplete="off"
                  className="rounded-md border-gray-300 hover:border-blue-500 focus:border-blue-500"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]}>

            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                label={<span className="text-gray-700 font-medium">Subject</span>}
                name="subject"
                rules={[
                  {
                    required: true,
                    message: "Please enter your subject",
                  },
                ]}
              >
                <Input
                  placeholder="Your Subject"
                  autoComplete="off"
                  className="rounded-md border-gray-300 hover:border-blue-500 focus:border-blue-500"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={<span className="text-gray-700 font-medium">Message</span>}
            name="message"
            rules={[
              {
                required: true,
                message: "Enter Your Message",
              },
            ]}
          >
            <Input.TextArea
              rows={6}
              placeholder="Enter Your Message"
              maxLength={6}
              className="rounded-md border-gray-300 hover:border-blue-500 focus:border-blue-500"
            />
          </Form.Item>

          <Form.Item className="text-center mt-6">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{background:'black'}}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Contact
