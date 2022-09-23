import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import User from "./component/User";
import Category from "./component/category";
import Brand from "./component/Brand";
import Product from "./component/Product";
import Shop from "./component/Shop";
import ProductDetail from "./component/ProductDetail";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CategoryDetail from "./component/CategoryDetail";
import BrandDetail from "./component/BrandDetail";
import ShopByCategory from "./component/ShopByCategory";
import ShopByBrand from "./component/ShopByBrand";


function app() {
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/" style={{"color":"DodgerBlue"}}>Home</Nav.Link>
                  <Nav.Link href="/brand" style={{"color":"DodgerBlue"}}>Brand</Nav.Link>
                  <Nav.Link href="/category" style={{"color":"DodgerBlue"}}>Category</Nav.Link>
                  <Nav.Link href="/product" style={{"color":"DodgerBlue"}}>Product</Nav.Link>
                  <Nav.Link href="/shop" style={{"color":"DodgerBlue"}}>Shop</Nav.Link>
                  <Nav.Link href="/CategoryDetail" style={{"color":"DodgerBlue"}}>CategoryDetail</Nav.Link>
                  <Nav.Link href="/branddetail" style={{"color":"DodgerBlue"}}>BrandDetail</Nav.Link>

                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/category" element={<Category />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/product" element={<Product/>} />
          <Route path="/product-detail/:id" element={<ProductDetail/>} />
          <Route path="/shop" element={<Shop/>}/>
          <Route path="/categoryDetail" element={<CategoryDetail/>}/>
          <Route path="/branddetail" element={<BrandDetail/>}/>
          <Route path="/shop-by-category/:categoryName/:id" element={<ShopByCategory/>}/>
          <Route path="/shop-by-brand/:brandName/:id" element={<ShopByBrand/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default app;