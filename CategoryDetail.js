import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from 'react';
import constants from '../common/constants'
import axios from 'axios';

const CategoryDetail = () => {

    const [productList, setProductList] = useState([])
    const [brandList, setCategoryList] = useState([])

    useEffect(() => {
        getProductList()
        getCategoryList()
    }, [])

    const getProductList = () => {
        axios.get(constants.API_BASE_URL + 'product').then(res => {
            console.log(res);
            setProductList(res.data)
        }).catch(error => {
            console.log("ERROR:", error)
        })
    }

    const getCategoryList = () => {
        axios.get(constants.API_BASE_URL + 'category').then(res => {
            console.log(res);
            setCategoryList(res.data)
        }).catch(error => {
            console.log("ERROR:", error)
        })
    }

    return (
        <>
            <div className='container'>
                <div className='row'><center><h1 style={{ "color": "DodgerBlue" }}>Online Shoping</h1></center>
                    <center><h3 style={{ "color": "geray" }}>The new range of LG Refrigerators come with ConvertiblePLUS.</h3></center><hr />
                    <div>
                        <h2>Search by Brand</h2>
                        <div>
                            {
                                brandList?.map((item) => {
                                    return (
                                        <>
                                            <a href={"/category/" + item._id}> {item.name}</a> |
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='col-md-0'></div>

                    {
                        brandList.map((item, index) => {
                            return (
                                <div className='col-md-3'>
                                    <Card style={{ width: '19rem', height: '30rem' }}>
                                        <Card.Img variant="top" src={constants.API_ASSETS_URL + item.image} />
                                        <Card.Body>
                                            <Card.Title>{item?.name}</Card.Title>
                                            <Card.Text>
                                                {item?.brand?.name} {item?.category?.name}<br />
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
export default CategoryDetail;