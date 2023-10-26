import { useEffect, useState, useContext, useMemo } from 'react';
import { Button, Container, Form, Card } from 'react-bootstrap';
import { Navigate, useLocation, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useValue } from '../UserContext';

export const CartCheckout = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const { productProp, quantity, selectedAddOn } = location.state ?? '';

    const { _id, name, description, stocks, price, productPhoto } = productProp ?? '';

    const [newQuantity, setNewQuantity] = useState(quantity);
    const { setIsCartOpen, setCartCounter, getCart, cart, addOns, fetchAddOns, setAddOnToCheckOut, fetchData, productsData } = useValue();




    const buyCartItems = () => {
        let token = localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}/users/cartCheckout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    Swal.fire({
                        title: "Purchase Successful",
                        icon: "success",
                        text: "Please check your orders list to track your orders"
                    })
                    setCartCounter(0);
                    navigate('/products');
                }
            }).catch(error => console.log(error.message))
    }

    let totalAmount = 0
    if (cart) {
        cart.forEach((item) => {
            totalAmount = totalAmount + item.subTotal;
        })
    }

    const checkIfLoggedin = () => {
        let token = localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data) {
                    //if the token is not an admin, redirect to /courses page
                    navigate("/login")
                }

            }).catch(error => console.log(error.message))
    }





    useEffect(() => {
        fetchData();
        productsData.forEach((product) => {

        })
        fetchAddOns();
        getCart();
        checkIfLoggedin();
        if (typeof cart === "undefined") {
            navigate('/products');
        }

    }, [])



    return (
        <Container className='my-5'>
            <Card>
                <Card.Body>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <p className='fs-5 fw-bold'>Selected Product(s)</p>
                            {
                                cart.map((item) => {
                                    return (
                                        <div className='row px-3 mb-5' key={item._id}>
                                            <div className='col-3 p-0 bg-dark d-flex justify-content-center align-items-center text-white' style={{ minHeight: "100px" }}>
                                                {
                                                    productsData.map((data) => {
                                                        if (item.productId === data._id) {
                                                            if (data.productPhoto) {
                                                                return (<img src={data.productPhoto} className='img-fluid h-100 w-100' style={{ objectFit: "cover" }} />)
                                                            } else {
                                                                return (<p>Product Image</p>)
                                                            }

                                                        }
                                                    })
                                                }
                                                
                                            </div>
                                            <div className='col-9'>
                                                <div className='p-3'>
                                                    <p className='fw-bold mb-0 text-capitalize'>{item.productName}</p>

                                                </div>
                                            </div>
                                        </div>

                                    )
                                })


                            }


                        </div>
                        <div className='col-lg-6'>
                            <div className='p-3 bg-light rounded-3'>
                                {
                                    cart.map((item) => {
                                        return (
                                            <div className='py-3 border-bottom' key={item._id}>
                                                <h3 className='fs-4 fw-bold text-capitalize'>({item.quantity}x) {item.productName} </h3>
                                                {(item.addOns.length > 0) ?
                                                    <div className='p-3 my-2 border-start border-3'>
                                                        <h5 className='fs-5 mb-0 fw-bold'>Add Ons:</h5>
                                                        {item.addOns.map((addOn => {
                                                            return (
                                                                <div key={addOn._id}>

                                                                    <p className='fs-5 mb-0 text-capitalize'>{addOn.name} - ₱{addOn.price}</p>
                                                                   
                                                                </div>
                                                            )
                                                        }))}
                                                    </div>
                                                    : null}
                                                <h3 className='mb-0 fs-4 fw-bold'>Subtotal</h3>
                                                <h3 className='mb-0 fs-4'> ₱{item.subTotal}</h3>



                                            </div>

                                        )
                                    })


                                }

                                <h3 className='mb-0 mt-3 fs-2 fw-bold'>Total Amount</h3>
                                <p className='fs-2'>₱{totalAmount}</p>

                            </div>
                        </div>
                    </div>


                </Card.Body>
            </Card>


            {/*  {(selectedAddOn) ?
                <>
                    <h3>Add Ons:</h3>
                    {selectedAddOn.map((addOn) => {
                        return (
                            <div key={addOn._id}>
                                <p>{addOn.name}</p>
                                <p>P{addOn.price}</p>
                            </div>
                        )
                    })}
                </> :
                null

            } */}
            <div className='d-flex justify-content-center gap-1 mt-3'>
                <Button variant='secondary' onClick={() => { setIsCartOpen(true) }}>Edit Cart</Button>

                <Button variant='success' onClick={() => { buyCartItems() }}>Buy Now</Button>

            </div>

        </Container>

    )
}
