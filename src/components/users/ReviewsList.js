import React, { useEffect, useState } from 'react'
import { useValue } from '../../UserContext';
import { Rating } from 'react-simple-star-rating';
import moment from 'moment';


export const ReviewsList = ({ productId, reviews }) => {
    const { getUserDetails, getCart } = useValue();


    return (
        <>
            <div>
                {(reviews.length > 0) ?
                    <div>
                        {reviews}
                    </div>

                    : <p className='pt-3'>No Product Reviews Available yet.</p>}


            </div>

        </>
    )
}
