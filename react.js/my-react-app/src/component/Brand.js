import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

function Brand() {
    const [name, setName] = useState("")
    const [image, setImage] = useState(null)
    const [id, setId] = useState("")
    const [brandList, setBrandList] = useState([]);
    const [parent, setParent] = useState("")

    useEffect(() => {
        getBrandList()
    }, [])

    const getBrandList = () => {
        axios.get('http://localhost:3002/api/brand').then(res => {
            console.log(res);
            setBrandList(res.data)
        }).catch(error => {
            console.log("ERROR:", error)
        })
    }
    const deletebrand = (Brand) => {
        if (window.confirm("Are you sure to delete this brand?")) {
            axios.delete(`http://localhost:3002/api/brand/${Brand._id}`).then(res => {
                console.log(res);
                getBrandList();
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
        formData.append("image", image);
        formData.append("parent", parent);

        axios.post(
            'http://localhost:3002/api/brand',
            formData
        ).then(res => {
            console.log(res);
            getBrandList()
            console.log(res.data);
            alert("brand added successfully")
            setName("")
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
        formData.append("image", image);
        axios.put(
            `http://localhost:3002/api/brand/${id}`,
            formData
        ).then(res => {
            console.log(res);
            console.log(res.data);
            alert("brand updated successfully")
            setName("")
            setImage(null)
            setId("")
            getBrandList()
        })
            .catch(error => {
                console.log("ERROR: ", error)
                alert(`ERROR: ${error.message}`)
            })
    }


    const handleEdit = (brand) => {
        setName(brand.name)
        setImage(brand.image)
        setId(brand._id)
        setParent(brand?.parent?._id ? brand.parent._id: "")

    }

    const reset = () => {
        setName("")
        setImage(null)
        setId("")
    }

    return (
        <>
            <div className='container py-5'>
                <div className='row'><center><h1 style={{"color":"DodgerBlue"}}>Brand Data</h1></center>
                    <div className='col-md-2'></div>
                    <div className='col-md-8'>
                        <form onSubmit={id ? handleUpdate : handleSubmit}>
                            <div className='mb-2'>
                                <label htmlFor='brand name' className='form-lable'>Brand Name</label>
                                <input type="text" className='form-control' value={name} onChange={(e) => setName(e.target.value)} id="" />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='image' className='form-lable'>Image</label>
                                <input type="file" className='form-control' onChange={(e) => setImage(e.target.files[0])} id="" />
                                {image && (
                                    <div>
                                        <img alt="not fount" width={"250px"} src={id ? "http://localhost:3002/images/"+image: URL.createObjectURL(image)} />
                                        <br />
                                        <button onClick={() => setImage(null)}>Remove</button>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label htmlFor="Parent Brand">Parent Brand:</label>
                                <select name="Parent Brand" id="root" value={parent} onChange={ (e) => setParent(e.target.value)}>
                                    <option value="" style={{"color":"green"}}>--SELECT BRAND--</option>
                                    {
                                        brandList.map( (item, index) => {
                                            return <option key={index} value={item._id}>{item.name}</option>
                                        })
                                    }
                                </select>
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
                        </form>
                    </div>
                    <div className='col-md-2'></div>
                </div>

            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col md-12'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th> Name</th>
                                    <th>Image</th>
                                    <th>Parent</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    brandList?.map((brand, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{brand.name}</td>
                                                <td><img width={100} src={"http://localhost:3002/images/" + brand.image} alt="" /></td>
                                                <td>{brand?.parent?.name}</td>
                                                <td>
                                                    <button className='btn btn-primary' onClick={(e) => handleEdit(brand)}> Edit </button>
                                                    &nbsp;
                                                    <button className='btn btn-danger' onClick={(e) => deletebrand(brand)}> Delete </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Brand;
