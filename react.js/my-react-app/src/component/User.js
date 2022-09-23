import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

function User1() {
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [id, setId] = useState("")
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        getUserList()
    }, [])

    const getUserList = () => {
        axios.get('http://localhost:3002/api/user').then(res => {
            console.log(res);
            setUserList(res.data)
        }).catch(error => {
            console.log("ERROR:", error)
        })
    }
    const deleteUser = (user) => {
        if (window.confirm("Are you sure to delete this user?")) {
            axios.delete(`http://localhost:3002/api/user/${user._id}`).then(res => {
                console.log(res);
                getUserList();
                alert("Deleted successfully.")
            }).catch(error => {
                console.log("ERROR:", error)
            })

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(
            `http://localhost:3002/api/user`,
            {
                name,
                age
            }
        ).then(res => {
            console.log(res);
            getUserList()
            console.log(res.data);
            alert("User added successfully")
            setName("")
            setAge("")
        })
            .catch(error => {
                console.log("ERROR: ", error)
                alert(`ERROR: ${error.message}`)
            })
    }

    const handleUpdate = (e) => {
        e.preventDefault();

        axios.put(
            `http://localhost:3002/api/user/${id}`,
            {
                name,
                age
            }
        ).then(res => {
            console.log(res);
            console.log(res.data);
            alert("User updated successfully")
            setName("")
            setAge("")
            setId("")
            getUserList()
        })
            .catch(error => {
                console.log("ERROR: ", error)
                alert(`ERROR: ${error.message}`)
            })
    }


    const handleEdit = (user) => {
        setName(user.name)
        setAge(user.age)
        setId(user._id)
        
    }

    const reset = () => {
        setName("")
        setAge("")
        setId("")
    }

    return (
        <>
        
            <div className='container py-5'>
                <div className='row'><center><h1 style={{"color":"DodgerBlue"}}>User Data</h1></center>
                    <div className='col-md-2'></div>
                    <div className='col-md-8'>
                        <form onSubmit={id ? handleUpdate : handleSubmit}>
                            <div className='mb-2'>
                                <label htmlFor='User name' className='form-lable'>User Name</label>
                                <input type="text" className='form-control' value={name} onChange={(e) => setName(e.target.value)} id="" />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='Age' className='form-lable'>Age</label>
                                <input type="text" className='form-control' value={age} onChange={(e) => setAge(e.target.value)} id="" />
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
                                    <th>Age</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userList?.map((user, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{user.name}</td>
                                                <td>{user.age}</td>
                                                <td>
                                                    <button className='btn btn-primary' onClick={(e) => handleEdit(user)}> Edit </button>
                                                    &nbsp;
                                                    <button className='btn btn-danger' onClick={(e) => deleteUser(user)}> Delete </button>
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
export default User1;
