import { useState, useEffect, useContext } from 'react';
import { Button, Col, Container, Row, Form, InputGroup } from 'react-bootstrap';
import { AdminView } from '../components/admin/AdminView';
import { useValue } from '../UserContext';
import { UserView } from '../components/users/UserView';
import { Navigate } from 'react-router-dom';
import { ProductLoader } from '../components/products/ProductLoader';
import { useParams } from 'react-router-dom';
//import CourseSearch from '../components/CourseSearch';
//import CourseSearchByPrice from '../components/CourseSearchByPrice';

export const PrescriptionGlasses = () => {

    const { category } = useParams();

    const { user, fetchData, getCart, setSelectedAddOn } = useValue();

    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(false);



    const fetchDataByCategory = async (category) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/products/category/prescription`, {
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


        } catch (error) {
            console.log(error.message);
        }



    }

    const searchProduct = async (category) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/products/category/prescription/search?searchTerm=${searchTerm}`, {
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
        searchProduct(category)
    }



    useEffect(() => {
        //invoke on every reload
        getCart();
        setSelectedAddOn([]);
    }, [])

    useEffect(() => {
        //invoke on every reload
        setError(false);
        fetchDataByCategory(category);
    }, [category])



    return (
        <>


            {
                loading ? <ProductLoader /> :
                    (user.isAdmin === false || user.isAdmin === null) ?
                        <>
                            <section className='mb-3' style={{backgroundColor:"#eee"}}>
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
                                                                fetchDataByCategory(category)
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

                        </>
                        :
                        <Navigate to="/dashboard" />


            }


        </>
    )
}
