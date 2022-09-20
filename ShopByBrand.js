import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from 'react';
import constants from '../common/constants'
import axios from 'axios';
import { useParams } from "react-router-dom";

const ShopByBrand = () => {
    const { id, brandName } = useParams();
    const [productList, setProductList] = useState([])

    useEffect(() => {
        getProductList()
        return () => {}
    }, [])

    const getProductList = () => {
        axios.get(constants.API_BASE_URL + 'ProductByBrand/'+id).then(res => {
            console.log(res);
            setProductList(res.data)
        }).catch(error => {
            console.log("ERROR:", error)
        })
    }


    return (
        <>
            <div className='container'>
                <div className='row'><center><h1 style={{"color":"DodgerBlue"}}>Online Shoping</h1></center>
                    <center><h3 style={{"color":"geray"}}>Brand: {brandName}</h3></center><hr/>
                   
                    <div className='col-md-0'></div>

                    {
                        productList.map((item, index) => {
                            return (
                                <div className='col-md-3'>
                                    <Card style={{ width: '19rem', height: '30rem' }}>
                                        <Card.Img variant="top" src={constants.API_ASSETS_URL + item.image} />
                                        <Card.Body>
                                            <Card.Title>{item?.name}</Card.Title>
                                            <Card.Text>
                                                {item?.brand?.name} {item?.category?.name}<br />
                                                MRP: ₹,{item.sale_price} of MRP: ₹,<del>{item.price}</del>
                                                 </Card.Text>
                                            <Button variant="primary">Add to Cart</Button>{' '}
                                            <a href={'/product-detail/' + item._id} className='btn btn-success'>More Info</a>

                                        </Card.Body>
                                    </Card>
                                    &nbsp;
                                </div>
                            )
                        })

                    }
                </div>
            </div>
        </>
    )
}
export default ShopByBrand;