import { useContext, useEffect, useState, useMemo } from 'react';
import { useValue } from '../../UserContext';
import { Container, Card, Button, Row, Col, Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

export const AddOns = () => {
    const { isLoggedin, getCart, cart, fetchCardData, fetchAddOns, addOns, setAddOns, addOnToCheckout, setAddOnToCheckOut, fetchData, selectedAddOn, setSelectedAddOn } = useValue();


    /* const addOnHandlerFunction = () => {
        let checkoutAddons = [];
        addOns.forEach((addOn) => {
            selectedAddOn.forEach((selected) => {
                if (selected === addOn._id) {
                    checkoutAddons.push(addOn);
                }
            })
        })
        setAddOnToCheckOut(checkoutAddons);   
    } */


    useEffect(() => {
        fetchAddOns();
    }, [])

    /* useEffect(() => {
        addOnHandlerFunction();
    }, []) */

    const addOnBox = addOns.map((item) => {
        return (
            <ToggleButton variant='light' className='border d-block' key={item._id} id={item._id} value={item}>
                <div className='row'>
                    <div className='col-3 bg-dark  d-flex align-items-center justify-content-center text-white'>
                        <p>Image to be placed here</p>
                    </div>
                    <div className='col-9 text-start'>
                        <p className='m-0 fw-bold text-capitalize'>{item.name}</p>
                        <p className='m-0 fw-light'>{item.description}</p>
                        <p>₱{item.price}</p>
                    </div>
                </div>

            </ToggleButton>
        )
    })
    return (
        <>
            <h3 className='fw-bold fs-5'>Select your Add-Ons:</h3>
            <ToggleButtonGroup className='w-100 my-3' vertical type="checkbox" onChange={(e) => { setSelectedAddOn(e); }}>
                {addOnBox}
                {/* {selectedAddOn.map(item => { return (<p key={item._id}>{item.name}</p>)})} */}
            </ToggleButtonGroup>
        </>

    )
}
