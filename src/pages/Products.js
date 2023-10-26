import { useState, useEffect, useContext } from 'react';
import { Col, Container, Row, Button, Form, InputGroup } from 'react-bootstrap';
import { AdminView } from '../components/admin/AdminView';
import { useValue } from '../UserContext';
import { UserView } from '../components/users/UserView';
import { Navigate } from 'react-router-dom';
import { ProductLoader } from '../components/products/ProductLoader';
//import CourseSearch from '../components/CourseSearch';
//import CourseSearchByPrice from '../components/CourseSearchByPrice';

export const Products = () => {
    const { user, getCart, setSelectedAddOn } = useValue();

    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(false);
    const [productsData, setProductsData] = useState([]);
    const [loading,setLoading] = useState(true);

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

                /* let token = localStorage.getItem("token");
                const cartRes = await fetch(`${process.env.REACT_APP_API_URL}/users/cart`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });
                //if user has an existing cart
                const cartData = await cartRes.json();
                let newProductsData = [...prodData]
                if (cartData && prodData) {
                    cartData.cart.cartProducts.forEach((cartProduct) => {
                        newProductsData.forEach((product) => {
                            if (cartProduct.productId === product._id) {
                                product.inCart = true;
                            }
                        })
                    })

                    setProductsData(newProductsData);
                } */

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
        //invoke on every reload
        fetchData();
        getCart();
        setSelectedAddOn([]);
    }, [])



    return (
        <>
            {
                loading ? <ProductLoader /> :
                    (user.isAdmin === false || user.isAdmin === null) ? <>
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
                        <Container>
                            {error ? <p className='fs-4 text-center py-5'>No Product Found</p> :
                                <UserView productsData={productsData} />
                            }
                        </Container>
                    </> :
                        <Navigate to="/dashboard" />
            }


        </>
    )
}
