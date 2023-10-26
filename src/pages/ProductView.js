import { useContext, useEffect, useState } from 'react';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Cart } from '../components/cart/Cart';
import { useValue } from '../UserContext';
import { AddOns } from '../components/addons/AddOns';
import { SelectLenses } from '../components/prescription/SelectLenses';
import { ProductReviews } from '../components/users/ProductReviews';
import { ProductLoader } from '../components/products/ProductLoader';
import { ProductViewLoader } from '../components/products/ProductViewLoader';

export const ProductView = () => {
    const { isLoggedin, getCart, cart, fetchCardData, selectedAddOn, addOnToCheckout, setSelectedAddOn } = useValue();
    const { productId } = useParams();
    const [quantity, setQuantity] = useState(1);

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        stocks: 0,
        inCart: false,
        isPrescription: false
    })

    const [productLoading, setProductLoading] = useState(true)
    const { inCart, name, description, price, stocks, isPrescription, productPhoto } = productData;

    useEffect(() => {
        fetchCardData(productId, productData, setProductData, setProductLoading);
        getCart();
        setSelectedAddOn([]);
    }, [productId])



    return (
        <>
            {(productLoading ? <ProductViewLoader /> :

                <>
                    <section className='py-5 px-3'>
                        <div className='container-fluid bg-white'>
                            <div className='row'>
                                <div className='col-lg-6 '>
                                    {productPhoto ? <div className='position-sticky top-0'>
                                        <img src={productPhoto} className='img-fluid' />
                                    </div> :

                                        <div className="bg-dark py-5 h-100 text-white justify-content-center align-items-center d-flex position-sticky top-0" style={{ maxHeight: "500px", minHeight: "300px" }}>

                                            <h3>Product Image to be placed here</h3>
                                        </div>
                                    }


                                </div>
                                <div className='col-lg-6'>
                                    <div className='p-3'>
                                        <div className='d-flex justify-content-between'>
                                            <div>
                                                <h3 className='fs-3 fw-bold text-capitalize'>{name}</h3>
                                                <p className='fw-light fw-4'>{description}</p>

                                            </div>
                                            <div>
                                                <h3 className='fs-3 fw-bold'>₱{price}</h3>

                                            </div>
                                        </div>

                                    </div>
                                    <Card>
                                        <Card.Body>
                                            <div>
                                                <AddOns />
                                            </div>
                                            <div className='d-flex gap-1 justify-content-center my-3'>
                                                {(isLoggedin) ?
                                                    <>
                                                        {(!isPrescription) ?
                                                            <>
                                                                <Form.Group>
                                                                    <Form.Control
                                                                        type="number"
                                                                        placeholder="Quantity"
                                                                        required
                                                                        value={quantity}
                                                                        min={0}
                                                                        max={stocks}
                                                                        onChange={e => { setQuantity(e.target.value) }}
                                                                    />
                                                                </Form.Group>
                                                                <Cart productId={productId} quantity={quantity} setQuantity={setQuantity} inCart={inCart} />

                                                                <Link className='btn btn-success' to="/checkout" state={{ productProp: productData, quantity, selectedAddOn }}>Checkout</Link>
                                                            </>
                                                            :

                                                            <SelectLenses price={price} name={name} _id={productId} description={description} quantity={quantity} isPrescription={isPrescription} productPhoto={productPhoto} />

                                                        }


                                                    </>
                                                    : <Link to="/login" className='btn btn-secondary'>Login to Purchase</Link>}

                                            </div>



                                        </Card.Body>
                                    </Card>

                                </div>
                            </div>

                        </div>

                    </section>

                    <section className='mt-3 bg-light py-3'>
                        <div className='container'>
                            <ProductReviews productId={productId} isLoggedin={isLoggedin} />
                        </div>
                    </section>
                </>
            )}


        </>



    )
}
