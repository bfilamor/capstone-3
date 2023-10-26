import { useContext, useEffect, useState } from 'react';
import { Button, Table, Form, InputGroup } from 'react-bootstrap'
import { EditProduct } from './EditProduct'
import { ArchiveProduct } from './ArchiveProduct'
import { ActivateProduct } from './ActivateProduct';
import { useValue } from '../../UserContext';
import { FeatureProduct } from './FeatureProduct';
import { UnfeatureProduct } from './UnfeatureProduct';
import { AddProduct } from './AddProduct';
import { AdminLoader } from './AdminLoader';
import { useNavigate } from 'react-router-dom';

export const AdminView = () => {

    const navigate = useNavigate();
    const { user } = useValue();

    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    //got fetchData from props drilling from Producs Component 

    const getProfile = () => {
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    if (data.isAdmin !== true || data.isAdmin === null) {
                        console.log(data.isAdmin)
                        navigate("/products")
                    } 
                   
                } else {
                    navigate("/products")
                }
            }).catch(error => console.log(error.message))
    }

    const fetchData = async () => {
        try {
            if (user.isAdmin === false || user.isAdmin === null) {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const prodData = await res.json();

                if (prodData) {
                    setLoading(false)
                    setProductsData(prodData.reverse());
                }

            } else {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/products/all`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const data = await res.json();

                if (data) {
                    setLoading(false)
                    setProductsData(data.reverse())
                }
            }


        } catch (error) {
            console.log(error.message);
        }

    }

    const searchProduct = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/products/search/all?searchTerm=${searchTerm}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const prodData = await res.json();

            if (prodData) {
                setError(false);
                setLoading(false)
                setProductsData(prodData.reverse());
                setSearchTerm('');
            } else {
                setError(true);
            }


        } catch (error) {
            console.log(error.message);
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        searchProduct();
    }


    useEffect(() => {
        getProfile();
        fetchData();
    }, [])
    return (
        (loading) ? <AdminLoader/> :
        <>
            <AddProduct fetchData={fetchData} />

            <section className='mb-3' style={{ backgroundColor: "#eee" }}>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-6'>
                            <Form className='py-3' onSubmit={(e) => { handleSearch(e) }}>
                                <InputGroup>
                                    <Form.Control className='border-3'
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value)

                                            if (e.target.value.trim().length === 0) {
                                                setError(false);
                                                fetchData();

                                            }
                                        }} />
                                    <Button variant="outline-secondary" type='submit'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </Button>
                                </InputGroup>

                            </Form>

                        </div>
                    </div>

                </div>


            </section>

            {error ? <p className='fs-4 text-center py-5'>No Product Found</p> :
                <>
                    <Table className='text-center' responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Availability</th>
                                <th colSpan={3}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productsData.map((product) => {
                                    return (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td>{product.category}</td>
                                            <td>{
                                                (product.isActive) ? <p className='text-success'>Available</p> :
                                                    <p className="text-danger">Unavailable</p>
                                            }</td>
                                            <td><EditProduct productIdProp={product._id} fetchData={fetchData} /></td>
                                            <td>
                                                {
                                                    (product.isActive) ?
                                                        <ArchiveProduct
                                                            productIdProp={product._id}
                                                            fetchData={fetchData} />
                                                        :
                                                        <ActivateProduct
                                                            productIdProp={product._id}
                                                            fetchData={fetchData} />
                                                }

                                            </td>
                                            <td>
                                                {
                                                    (product.isFeatured) ?
                                                        <UnfeatureProduct isFeatured={product.isFeatured} fetchData={fetchData} productIdProp={product._id} /> :

                                                        <FeatureProduct isFeatured={product.isFeatured} fetchData={fetchData} productIdProp={product._id} />

                                                }

                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </>

            }





        </>
    )
}
