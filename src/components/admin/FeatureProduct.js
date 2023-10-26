import React from 'react';
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export const FeatureProduct = ({productIdProp, fetchData}) => {
    
    const featureProductHandler = (e,productIdProp) => {
        e.preventDefault();
        let token = localStorage.getItem("token");

        fetch(`${process.env.REACT_APP_API_URL}/products/${productIdProp}/feature`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data === true) {
                    Swal.fire({
                        title: 'Success!',
                        icon: "success",
                        text: "Product Is Now Featured in the Home Page"
                    }) 
                    fetchData();
                } else {
                    Swal.fire({
                        title: 'Error!',
                        icon: "error",
                        text: "Please try again"
                    })
                }

            }).catch(error => { console.log(error.message) })
    }

    return (
        <>
            <Button variant='info' onClick={(e) => featureProductHandler(e,productIdProp)}>Feature </Button>
        </>
    )
}
