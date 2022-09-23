import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import constants from '../common/constants';
import product from "./Product";

const ProductDetail = () => {

    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProduct();
        return () => { }
    }, []);

    const getProduct = () => {

        axios.get(constants.API_BASE_URL + 'product-detail/' + id).then(res => {
            console.log(res);
            setProduct(res.data)
        }).catch(error => {
            console.log("ERROR:", error)
        })
    };
    return (
        <>
            {
                product && (
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 py-12">
                                <div className="container"><br /><br />
                                    <h1 className="product">{product.name}</h1><hr/>
                       <h2>{product.brand.name},{product.category.name}<br /></h2><br />
                                    MRP:₹,{product.sale_price} of MRP:₹,<del>{product.price} </del><br /><span style={{"color":"green"}}></span><br />

                                    <img variant="top" className="imag" src={constants.API_ASSETS_URL + product.image} /><br />
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                )
            },
            {
                !product && (
                    <h2 style={{"color":"green"}}>Loading...</h2>

                )
            }

        </>
    )
}

export default ProductDetail;