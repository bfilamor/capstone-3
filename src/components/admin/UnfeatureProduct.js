import React from 'react';
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export const UnfeatureProduct = ({productIdProp, fetchData}) => {
    const unFeatureProductHandler = (e,productIdProp) => {
        e.preventDefault();
        let token = localStorage.getItem("token");

        fetch(`${process.env.REACT_APP_API_URL}/products/${productIdProp}/unfeature`, {
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
                        text: "Product Was Removed From Featured Products"
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
            <Button variant='warning' onClick={(e) => unFeatureProductHandler(e,productIdProp)}>Unfeature</Button>
        </>
    )
}
