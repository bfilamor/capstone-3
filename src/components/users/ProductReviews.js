import { useEffect, useState } from 'react';
import { Nav, Tab } from 'react-bootstrap'
import { ReviewsList } from './ReviewsList'
import { AddReview } from './AddReview';
import { Rating } from 'react-simple-star-rating';
import moment from 'moment';

export const ProductReviews = ({ productId, isLoggedin }) => {

    const [reviews, setReviews] = useState([]);
    const [message, setMessage] = useState(false);
    const [isReviewLoading, setIsReviewLoading] = useState(true);

    const getProductReviews = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/reviews`, {
                method: "GET"
            })
            const data = await res.json();

            if (data) {
                const reviewData = data.reviews.reverse().map((review) => {
                    return (
                        <div key={review._id} className='p-3 border-bottom' >
                            <Rating initialValue={review.rating} readonly={true} size={20} className='mb-2' />

                            <p className='fw-lighter mb-0'><small>{review.userName}</small></p>
                            <p className='fs-5 mb-1'>{review.comment}</p>
                            <p className='fw-light'><small>Posted {moment(review.reviewDate).fromNow()}</small></p>
                        </div>
                    )
                })
                setReviews(reviewData);
                setMessage(false);
                setIsReviewLoading(false)
            }


        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getProductReviews();
    }, [productId])

    return (
        <>
            <Tab.Container defaultActiveKey="reviews">
                <Nav variant="underline">
                    <Nav.Item>
                        <Nav.Link className='fs-5' eventKey={'reviews'} onClick={() => { getProductReviews(); }}>Product Reviews</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className='fs-5' eventKey="add-review">Add Review</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content>
                    <Tab.Pane eventKey="reviews">
                        {isReviewLoading ? <p>...Loading All Reviews</p> : <ReviewsList productId={productId} isLoggedin={isLoggedin} reviews={reviews} />}

                    </Tab.Pane>
                    <Tab.Pane eventKey="add-review">
                        <AddReview productId={productId} isLoggedIn={isLoggedin} getProductReviews={getProductReviews} message={message} setMessage={setMessage} />
                    </Tab.Pane>
                </Tab.Content>

            </Tab.Container>

        </>
    )
}
