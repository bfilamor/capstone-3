import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useValue } from '../../UserContext';

export const DeleteInCart = ({ cartItem }) => {
    const { productId, quantity } = cartItem;
    const [newQuantity, setNewQuantity] = useState(quantity === 0 ? 1 : quantity);
    const { getCart, cart, setCart, deleteCartItem } = useValue();
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        stocks: 0,
        inCart: false
    })
    const { name, description, price } = productData;
    const [inCart, setInCart] = useState(false);

    //const [productId, setProductId] = useState(_id);

    /*  useEffect(() => {
         getCart();
     }, []) */

    return (
        <>
            <div>
                <Button variant='danger' onClick={() => { deleteCartItem(productId, quantity, productData, setProductData, setInCart) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </Button>

            </div>


        </>
    )
}
