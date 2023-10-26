import { useEffect, useState, useMemo } from 'react';
import { Badge, Button, Modal, Offcanvas, CloseButton } from 'react-bootstrap';
import { useValue } from '../../UserContext';
import { Link } from 'react-router-dom';
import { DeleteInCart } from './DeleteInCart';
import { CartQuantity } from './CartQuantity';

export const CartToggler = () => {
    const { setIsCartOpen, getCart, isCartOpen, cart, cartCounter, setCart, setCartCounter, fetchAddOns, selectedAddOn } = useValue();
    const [totalAmount, setTotalAmount] = useState(0);



    const openCart = () => {
        setIsCartOpen(true);
        getCart();
    }

    const closeCart = (e) => {
        e.preventDefault();
        setIsCartOpen(false);
    }

    const clearCart = () => {
        let token = localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}/users/clearCart`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setCart([]);
                    setCartCounter(0);
                    getCart();
                }
            })

    }


    useEffect(() => {
        getCart();
        // fetchAddOns();
    }, [])

    useMemo(() => {
        let totalAmount = 0;
        cart.forEach(item => {
            totalAmount += item.subTotal
        })
        setTotalAmount(totalAmount);
    }, [getCart])


    return (
        <>
            <Button variant='outlined-secondary' className='position-relative' onClick={() => openCart()}><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 576 512"><path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"/></svg> <Badge bg='danger'>{cartCounter}</Badge></Button>
            <Offcanvas show={isCartOpen} placement='end' >
                <div className='fs-4 d-flex justify-content-end p-3'>
                    <CloseButton onClick={(e) => closeCart(e)} />
                </div>
                <Offcanvas.Body>
                    {cart.length > 0 ?
                        cart.map((item) => {
                            return (
                                <>
                                    <div className='row py-3' key={item.productId}>
                                        <div className='col-9'>
                                            <div className='row'>
                                                <div className='col-6'>
                                                    <CartQuantity
                                                        quantity={item.quantity}
                                                        productId={item.productId}
                                                    />
                                                </div>
                                                <div className='col-6'>
                                                    <p>{item.productName}</p>
                                                    {item.addOns.length > 0 ?
                                                        <>
                                                            <p className='mb-1 border-bottom'><small><strong>Add Ons:</strong></small></p>
                                                            {
                                                                item.addOns.map((addOn) => {
                                                                    return (
                                                                        <>
                                                                            <div key={addOn._id}>
                                                                                <p className='mb-0'>{addOn.name}</p>
                                                                                <p>P{addOn.price}</p>

                                                                            </div>

                                                                        </>
                                                                    )
                                                                })
                                                            }

                                                        </> : null}

                                                </div>

                                            </div>



                                        </div>
                                        <div className='col-3 d-flex justify-content-end'>
                                            <DeleteInCart
                                                cartItem={item} />
                                        </div>


                                    </div>
                                    <div className='my-3 border-bottom'>
                                        <h4>Subtotal: P{item.subTotal}</h4>
                                    </div>

                                </>
                            )
                        })

                        : <p>No Products in Cart</p>
                    }

                    {(cart.length > 0) ? <h3 className='my-2'>Total Amount: P{totalAmount}</h3> : null}

                    <div className='d-flex justify-content-center py-3 gap-2'>
                        {(cart.length > 0) ?
                            <>
                                <Button onClick={() => { clearCart() }} variant='danger'>Clear Cart</Button>
                                <Link className="btn btn-success" to="/cart-checkout" state={{ cart, selectedAddOn }}>Checkout</Link>
                            </>

                            : null
                        }
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
