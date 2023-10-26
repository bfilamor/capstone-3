import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { useValue } from '../../UserContext';
import { Cart } from '../cart/Cart';
//import Proptypes from 'prop-types'

//compoments receives an object called "props", then we destructure the props object
export const ProductCard = ({ productProp }) => {
    const { isLoggedin, fetchCardData, productInCartStatus } = useValue();
    const { _id, name, description, price, isPrescription, productPhoto } = productProp;

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        stocks: 0,
        inCart: false
    })
    const [inCart, setInCart] = useState(false);

    const [quantity, setQuantity] = useState(0);
    const [productLoading, setProductLoading] = useState(true);


    useEffect(() => {
        //fetchData();
        productInCartStatus(_id, setInCart)
        //fetchCardData(_id, productData, setProductData, setProductLoading);
    }, [])

    return (
        <div className='col-lg-3 mb-3 mt-3'>
            <Card className='h-100 bg-light'>

                {productPhoto ? <img src={productPhoto} /> : <Card.Img variant="top" src="https://placehold.co/100" />}


                <Card.Body className='d-flex flex-column justify-content-between'>
                    <div>
                        <p className='fs-4 mb-0 fw-bold text-capitalize'>
                            {name}
                        </p>
                        <p className='fs-5 fw-light'>
                            {description}
                        </p>

                        <p className='fs-5 fw-bold'>₱{price}</p>

                    </div>

                    <div className='d-flex gap-1 justify-content-center flex-column'>

                        {isPrescription ?
                            <Link className='btn btn-dark d-block w-100' to={`/products/single/${_id}`}>View Lenses</Link> :
                            <>
                                <Link className='btn btn-dark d-block' to={`/products/single/${_id}`}>View Details</Link>
                                {(isLoggedin) ?
                                    <>
                                        <Cart productId={_id} quantity={quantity} inCart={inCart} setQuantity={setQuantity} />
                                    </>
                                    : null}

                            </>
                        }


                    </div>

                </Card.Body>
            </Card>


        </div>

    )
}

//check if the ProductCard component is getting the correct prop types
/* ProductCard.propTypes = {
    //the "shape" method is used to check if a prop object conforms to a specific shape
    productProp: Proptypes.shape({
        //Define the properties and their expected types
        name: Proptypes.string.isRequired,
        description: Proptypes.string.isRequired,
        price: Proptypes.number.isRequired
    })
}
 */