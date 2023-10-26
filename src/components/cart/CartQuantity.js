import React, { useEffect, useState, useMemo } from 'react'
import { Button } from 'react-bootstrap';
import { useValue } from '../../UserContext';

export const CartQuantity = ({ quantity, productId }) => {

    const { getCart, setCartCounter,  addOns, fetchAddOns, addOnToCheckout, setAddOnToCheckOut, selectedAddOn } = useValue();
    const [newQuantity, setNewQuantity] = useState(1);
    const [newProductId, setNewProductId] = useState(productId);


    const addQuantity = async () => {
        try {
            let token = localStorage.getItem("token");
            const res = await fetch(`${process.env.REACT_APP_API_URL}/users/addToCart`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    products: [
                        {
                            productId: productId,
                            quantity: 1,
                            addOns: selectedAddOn.length > 0 ? selectedAddOn : []
                           // addOns:selectedAddOn
                        }
                    ]
                })
            })

            const data = await res.json();

            if (data === true) {
                getCart();
                setNewQuantity(prev => {
                    return prev + 1
                })
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    const subtractQuantity = async () => {
        try {
            let token = localStorage.getItem("token");
            const res = await fetch(`${process.env.REACT_APP_API_URL}/users/deleteCartItem`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId: productId,
                    quantity: 1,
                    addOns: selectedAddOn.length > 0 ? selectedAddOn : []
                })
            })

            const data = await res.json();
            if (data === true) {
                getCart();
                setNewQuantity(prev => {
                    return prev - 1
                })
                if (newQuantity <= 1) {
                    setCartCounter(0);
                }
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        setNewProductId(productId);
        getCart();
        setNewQuantity(quantity);
        //fetchAddOns();
    }, [])


    return (
        <div className='d-flex gap-1 text-center'>
            <Button variant='primary' onClick={() => { subtractQuantity() }}>-</Button>
            <input className='form-control p-0 text-center' value={newQuantity} disabled />
            <Button variant='primary' onClick={() => { addQuantity() }}>+</Button>
        </div>
    )
}
