import React from 'react'
import {Button, Row,Col} from 'antd'
import './Product.css'
function Product() {
  return (
    <div>
        <Row>
            <Col>
            <h2 className='product-heading1'>Niagara Falls Tour from NYC</h2>
            <p className='product-paragraph1'>Embark on a full-day guided tour along the stunning south coast of the Land of Fire and Ice, starting from either Vik or Reykjavik.</p>
            <Button className='direction-btn'>Direction <img src="https://i.ibb.co/R9gCr2g/Group-48101358.png" alt="Logo" className="btn-icon" />
            </Button>
            </Col>
        </Row>
    </div>
  )
}

export default Product;