import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import constants from './../common/constants';

function Product() {
    const [name, setName] = useState("")
    const [sku, setSku] = useState("")
    const [price, setPrice] = useState("")
    const [sale_price, setSale_Price] = useState("")
    const [productList, setProductList] = useState([])
    const [brandList, setBrandList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState(null)
    const [id, setId] = useState("")
    const [filterByBrand, setFilterByBrand] = useState("")
    const [filterByCategory, setFilterByCategory] = useState("")

    useEffect(() => {
        if (filterByBrand == "") {
            getProductList()
        } else {
            getProductListByBrand()
        }

    }, [filterByBrand])

    useEffect(() => {
        if (filterByCategory =="") {
            getProductList()
        } else {
            getProductListByCategroy()
        }
    }, [filterByCategory])

    useEffect(() => {
        getProductList()
    }, [])
    useEffect(() => {
        getBrandList()
    }, [])
    useEffect(() => {
        getCategoryList()
    }, [])


    const getBrandList = () => {
        axios.get(constants.API_BASE_URL + 'brand').then(res => {
            console.log(res);
            setBrandList(res.data)
        }).catch(error => {
            console.log("ERROR:", error)
        })
    }

    const getProductListByBrand = () => {
        axios.get(constants.API_BASE_URL + 'productByBrand/' + filterByBrand).then(res => {
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

    const getProductListByCategroy = () => {
        axios.get(constants.API_BASE_URL + 'productByCategory/' + filterByCategory).then(res => {
            console.log(res);
            setProductList(res.data)
        }).catch(error => {
            console.log("ERROR:", error)
        })
    }
    const getProductList = () => {
        axios.get(constants.API_BASE_URL + 'product').then(res => {
            console.log(res);
            setProductList(res.data)
        }).catch(error => {
            console.log("ERROR:", error)
        })
    }
    const deleteproduct = (Product) => {
        if (window.confirm("Are you sure to delete this product?")) {
            axios.delete(constants.API_BASE_URL + `product/${Product._id}`).then(res => {
                console.log(res);
                getProductList();
                alert("Deleted successfully.")
            }).catch(error => {
                console.log("ERROR:", error)
            })

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("name", name);
        formData.append("sku", sku);
        formData.append("price", price);
        formData.append("sale_price", sale_price);
        formData.append("brand", brand);
        formData.append("category", category);
        formData.append("image", image);
        axios.post(
            constants.API_BASE_URL + 'product',
            formData
        ).then(res => {
            console.log(res);
            getProductList()
            console.log(res.data);
            alert("product added successfully")
            setName("")
            setSku("")
            setPrice("")
            setSale_Price("")

            setImage(null)
        })
            .catch(error => {
                console.log("ERROR: ", error)
                alert(`ERROR: ${error.message}`)
            })
    }

    const handleUpdate = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("name", name);
        formData.append("sku", sku);
        formData.append("price", price);
        formData.append("sale_price", sale_price);
        formData.append("brand", brand);
        formData.append("category", category);
        formData.append("image", image);
        axios.put(
            constants.API_BASE_URL + `product/${id}`,
            formData
        ).then(res => {
            console.log(res);
            console.log(res.data);
            alert("product updated successfully")
            setName("")
            setSku("")
            setPrice("")
            setSale_Price("")
            setBrand("")
            setCategory("")
            setImage(null)
            setId("")
            getProductList()
        })
            .catch(error => {
                console.log("ERROR: ", error)
                alert(`ERROR: ${error.message}`)
            })
    }


    const handleEdit = (product) => {
        setName(product.name)
        setSku(product.sku)
        setPrice(product.price)
        setSale_Price(product.sale_price)
        setImage(product.image)
        setId(product._id)

        setBrand(product?.brand?._id ? product.brand._id : "")
        setCategory(product?.category?._id ? product.category._id : "")
    }

    const reset = () => {
        setName("")
        setSku("")
        setPrice("")
        setSale_Price("")
        setBrand("")
        setCategory("")
        setImage(null)
        setId("")
    }

    return (
        <>
            <div className='container py-5'>
                <div className='row'><center><h1 style={{"color":"DodgerBlue"}}>Product Data</h1></center>
                    <div className='col-md-2'></div>
                    <div className='col-md-8'>
                        <form onSubmit={id ? handleUpdate : handleSubmit}>
                            <div className='mb-2'>
                                <label htmlFor='product name' className='form-lable'>product Name</label>
                                <input type="text" className='form-control' value={name} onChange={(e) => setName(e.target.value)} id="" />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='product sku' className='form-lable'>product Sku</label>
                                <input type="text" className='form-control' value={sku} onChange={(e) => setSku(e.target.value)} id="" />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='product price' className='form-lable'>product Price</label>
                                <input type="number" className='form-control' value={price} onChange={(e) => setPrice(e.target.value)} id="" />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='product sale_prace' className='form-lable'>product Sale_Prace</label>
                                <input type="number" className='form-control' value={sale_price} onChange={(e) => setSale_Price(e.target.value)} id="" />
                            </div>
                            <div>
                                <label htmlFor="Brand Product">Brand:</label>
                                <select name="Brand Product" id="root" value={brand} onChange={(e) => setBrand(e.target.value)}>
                                    <option value="" style={{"color":"green"}}>--select brand--</option>
                                    {
                                        brandList.map((item, index) => {
                                            return <option key={index} value={item._id}>{item.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <br />
                            <div>
                                <label htmlFor="Category Product" >Category:</label>
                                <select name="Category Product" id="root" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="" style={{"color":"green"}}>--select category--</option>
                                    {

                                        categoryList.map((item, index) => {
                                            return <option key={index} value={item._id}>{item.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='image' className='form-lable'>Image</label>
                                <input type="file" className='form-control' onChange={(e) => setImage(e.target.files[0])} id="" />
                                {image && (
                                    <div>
                                        <img alt="not fount" width={"250px"} src={id ? "http://localhost:3002/images/" + image : URL.createObjectURL(image)} />
                                        <br />
                                        <button onClick={() => setImage(null)}>Remove</button>
                                    </div>
                                )}
                            </div>
                            <div className='py-3'>
                                <center>
                                    <button onClick={reset} type="reset" className='btn btn-danger'>Reset</button>
                                    &nbsp;
                                    {
                                        id && (
                                            <button type="submit" className='btn btn-warning'>Update</button>
                                        )
                                    }
                                    &nbsp;
                                    {
                                        !id && (
                                            <button type="submit" className='btn btn-success'>Submit</button>
                                        )
                                    }
                                </center>
                            </div>
                            <div>
                                <label htmlFor="Brand Filter Product">Filter By Brand:</label>
                                <select name="Brand Filter Product" id="root" value={filterByBrand} onChange={(e) => setFilterByBrand(e.target.value)}>
                                    <option value="" style={{"color":"green"}}>--select brand--</option>
                                    {
                                        brandList.map((item, index) => {
                                            return <option key={index} value={item._id}>{item.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <br />
                            <div>
                                <label htmlFor="Category Filter Product">Filter By Category :</label>
                                <select name="Category Filter Product" id="root" value={filterByCategory} onChange={(e) => setFilterByCategory(e.target.value)}>
                                    <option value="" style={{"color":"green"}}>--select category--</option>
                                    {

                                        categoryList.map((item, index) => {
                                            return <option key={index} value={item._id}>{item.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className='col-md-2'></div>
                </div>
            </div>

            <div className='container'>
                <div className='row'>

                    <div className='col md-8'>
                        <Table striped bordered hover>
                            <thead>
                                <tr >
                                    <th>S.no</th>
                                    <th>Name</th>
                                    <th>Sku</th>
                                    <th>Price</th>
                                    <th>Sale_Prace</th>
                                    <th>Brand</th>
                                    <th>Category</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productList?.map((product, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{product.name}</td>
                                                <td>{product.sku}</td>
                                                <td>{product.price}</td>
                                                <td>{product.sale_price}</td>
                                                <td>{product?.brand?.name}</td>
                                                <td>{product?.category?.name}</td>

                                                <td><img width={100} src={"http://localhost:3002/images/" + product.image} alt="" /></td>

                                                <td>
                                                    <button className='btn btn-primary' onClick={(e) => handleEdit(product)}> Edit </button>
                                                    &nbsp;
                                                    <button className='btn btn-danger' onClick={(e) => deleteproduct(product)}> Delete </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                        <div className='col md-2'></div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Product;
