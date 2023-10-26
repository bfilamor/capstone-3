import React, { useEffect, useState } from 'react'
import { useValue } from '../../UserContext';
import { Rating } from 'react-simple-star-rating';
import { Form, FloatingLabel } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export const AddReview = ({ productId, message, setMessage }) => {
    const { getUserDetails, getCart, isLoggedin } = useValue();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [error, setError] = useState(false);

    const handleRating = (rate) => {
        setRating(rate)
    }

    const submitReview = (e) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/addReview`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                rating: rating,
                comment: comment
            })
        })
            .then(res => res.json())
            .then(data => {
                setMessage(true)
                if (data) {
                    setError(false);
                    setComment('');
                    setRating(0);
                } else {
                    setError(true)
                }
            }).catch(error => console.log(error.message))
    }



    return (
        (isLoggedin) ?
            <>
                <div className='p-3 border-bottom' >
                    <Form onSubmit={(e) => { submitReview(e) }}>
                        <Rating onClick={handleRating} size={20} className='mb-3' />
                        <div className='row'>
                            <div className='col-lg-8 col'>
                                <FloatingLabel controlId="floatingTextarea2" label="Add Review" className='mb-3'>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Leave your review here"
                                        style={{ height: '100px' }}
                                        onChange={(e) => { setComment(e.target.value) }}
                                        value={comment}
                                        required
                                    />
                                </FloatingLabel>
                                <Button variant='secondary' type='submit'>Post Review</Button>

                                {(message) ? 
                                    (!error) ?
                                    <>
                                    <div className="alert alert-success mt-3"><p className='m-0'><small>Review Succesfully Posted.</small></p> </div>

                                    </>  : 
                                    <>
                                    <div className="alert alert-danger mt-3"><p className='m-0'><small>You already posted a review for this product.</small></p> </div>
                                    </>
                                
                                 : null}

                            </div>
                        </div>

                    </Form>
                </div>
            </>

            : <p className='mt-3'>Please login to add a review</p>
    )
}
