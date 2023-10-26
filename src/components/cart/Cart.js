import { useEffect, useState, useContext, useMemo } from "react"
import { Button, Modal, Form, } from "react-bootstrap"
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useValue } from "../../UserContext";
import { DeleteCartItem } from "./DeleteCartItem";

export const Cart = ({ productId, quantity, setQuantity }) => {
    const { cart, setCart, getCart, isLoggedin, setCartCounter, productInCartStatus, addOns, fetchAddOns, selectedAddOn, addOnToCheckout, setAddOnToCheckOut } = useValue();

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        stocks: 0,
        inCart: false
    })
    const { name, description, price } = productData;
    const [inCart, setInCart] = useState(false);

    const [productLoading, setProductLoading] = useState(true);

    //const [inCart, setInCart] = useState(false);


    const fillCart = () => {


        let token = localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}/users/addToCart`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                products: [
                    {
                        productId: productId,
                        quantity: quantity === 0 ? quantity + 1 : quantity,
                        addOns: selectedAddOn
                    }
                ]
            })
        })
            .then(res => res.json())
            .then(data => {
                /*  if(data) {
                     setInCart(true);
                 } */
                //set  as productId state
                //getCart();
                //setShowCart(true);
                //setInCart(true)
                if (data) {
                    //setInCart(true);
                    //fetchData();
                    fetchAddOns();
                    productInCartStatus(productId, setInCart)
                    //fetchCardData(productId, productData, setProductData, setProductLoading); 
                    setCartCounter((prev) => {
                        return prev + 1;
                    })
                }

            })



    }

    /* useEffect(() => {
      const productIndex = cart.findIndex((product) => product.productId == productId);
        if (productIndex >= 0) {
            setInCart(true)
        }

       
    }, [cart]) */

    useEffect(() => {
        productInCartStatus(productId, setInCart)
        //fetchCardData(productId, productData, setProductData,setProductLoading); 
    }, [cart])




    return (
        (isLoggedin) ?
            <>
                {(inCart) ? <DeleteCartItem setCart={setCart} cart={cart} quantity={quantity} productId={productId} getCart={getCart} /> :

                    <Button variant="primary" sizes="sm" onClick={() => { fillCart(); }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z" />
                    </svg> Add to Cart</Button>}


            </> : null
    )
}
