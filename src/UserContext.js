import { createContext, useMemo, useState, useContext } from 'react'
const UserContext = createContext()
UserContext.displayName = 'UserContext';

export const useValue = () => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useValue must be used within a ValueProvider')
    }
    return context
}

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: null,
        isAdmin: null
    });
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    let userSession = localStorage.getItem("token");


    const unsetUser = () => {
        localStorage.clear();
    }

    const getUserDetails = () => {
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setIsLoggedin(true);
                }
                if (typeof data._id !== 'undefined') {
                    setUser({
                        id: data._id,
                        isAdmin: data.isAdmin
                    });
                    setIsAdmin(true);

                } else {
                    setUser({
                        id: null,
                        isAdmin: null
                    });
                    setIsAdmin(false);
                }


            }).catch(error => console.log(error.message))

    }

    //cart / product functions

    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [addOns, setAddOns] = useState([]);
    const [selectedAddOn, setSelectedAddOn] = useState([]);
    /* const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        stocks: 0,
        inCart:false
    }) */
    const [cartCounter, setCartCounter] = useState(0)
    const [productLoading, setProductLoading] = useState(true);
    const [addOnToCheckout, setAddOnToCheckOut] = useState([]);

    //this function will be used for props drilling for adminview component and its child components
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

    const fetchCardData = async(productId, productData, setProductData, setProductLoading ) => {
        try {
            const productDataRes = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
    
            const prodData = await productDataRes.json();
    
            
            let token = localStorage.getItem("token");
            const cartRes = await fetch(`${process.env.REACT_APP_API_URL}/users/cart`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            //if user has an existing cart
            const cartData = await cartRes.json();
            if (prodData) {
                setProductData({
                    name: prodData.name,
                    description: prodData.description,
                    price: prodData.price,
                    stocks: prodData.stocks,
                    _id: productId,
                    isPrescription: prodData.isPrescription,
                    productPhoto: prodData.productPhoto
                })
                if(setProductLoading) {
                    setProductLoading(false)
                }
              
            }
    
            if (cartData && prodData) {
                cartData.cart.cartProducts.forEach((cartProduct) => {
                    if (cartProduct.productId === productId) {
                        setProductData({
                            name: prodData.name,
                            description: prodData.description,
                            price: prodData.price,
                            stocks: prodData.stocks,
                            _id: productId,
                            inCart:true
                        })
    
                        if(setProductLoading) {
                            setProductLoading(false)
                        }
    
                    } 
                })
            }

        } catch(error) {
            console.log(error.message)
        }
       

    } 

    const productInCartStatus = async(productId, setInCart ) => {
        try {
            
            let token = localStorage.getItem("token");
            const cartRes = await fetch(`${process.env.REACT_APP_API_URL}/users/cart`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            const cartData = await cartRes.json();
            setInCart(false);
            if (cartData) {
                cartData.cart.cartProducts.forEach((cartProduct) => {
                    if (cartProduct.productId === productId) {
                        setInCart(true);
                    } 
                   
                })
            }

        } catch(error) {
            console.log(error.message)
        }
       

    } 
     
    const getCart = () => {
        let token = localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}/users/cart`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(data => {
                //set  as productId state
                if (data) {
                    setCart(data.cart.cartProducts);
                    setCartCounter(data.cart.cartProducts.length);  
                } else {
                    setCart([]);
                }

            })

    }
    

    const deleteCartItem = (productId, newQuantity, productData, setProductData,inCart, setInCart) => {

        let token = localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}/users/deleteCartItem`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                productId: productId,
                quantity: newQuantity
            })
        })
            .then(res => res.json())
            .then(data => {
                //fetchData();
                fetchCardData(productId, productData, setProductData);
                productInCartStatus(productId,inCart, setInCart )
                setCartCounter((prev) => {
                    return prev - 1;
                })  
                getCart(); 
            })
    }

    const fetchAddOns = async() => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/addons/all`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const data = await res.json();
            if (data) {
                setAddOns(data);
                //setSelectedAddOn(data);
            }

        } catch(error) {
            console.log(error.message);
        }
    }

    

    const valueObject = useMemo(() => {
        return { user, setUser, unsetUser, userSession, getUserDetails, isAdmin, isLoggedin, setIsLoggedin, isCartOpen, setIsCartOpen, fetchData, productsData, cart, getCart, setCart, loading, deleteCartItem, fetchCardData,  cartCounter, setCartCounter, productInCartStatus, fetchAddOns, addOns, setAddOns, selectedAddOn, setSelectedAddOn, addOnToCheckout, setAddOnToCheckOut }
    }, [user, setUser, unsetUser, userSession, getUserDetails, isAdmin, isLoggedin, setIsLoggedin, isCartOpen, setIsCartOpen, fetchData, productsData, cart, getCart, setCart, loading, deleteCartItem,fetchCardData, productInCartStatus, fetchAddOns, addOns, setAddOns, addOnToCheckout, setAddOnToCheckOut])

    return <UserContext.Provider value={valueObject}>{children}  </UserContext.Provider>
}
export default UserProvider