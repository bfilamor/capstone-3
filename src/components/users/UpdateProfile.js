import React, { useEffect, useState } from 'react'
import {  Form, Button } from 'react-bootstrap';

export const UpdateProfile = ({ getProfile, profileProp }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    //const [profile, setProfile] = useState(profileProp);


    const editProfile = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token"); // Replace with your actual JWT token
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    mobileNo: mobileNo
                }),
            });

            if (response.ok) {
                setMessage('Profile Updated');
                setError(false)
                //retrieve profile details on succesfull profile update
                getProfile();
            } else {
                const errorData = await response.json();
                setError(true)
                setMessage(errorData.message);

            }
        } catch (error) {
            setError(true)
            setMessage('An error occurred. Please try again.');
            console.error(error);
        }
    };

    useEffect(() => {
        //on every page load, populate the update fields with the user profile
        setFirstName(profileProp.firstName);
        setLastName(profileProp.lastName);
        setMobileNo(profileProp.mobileNo);
    }, [getProfile, profileProp])


    return (
        <>
        <h2 className='mb-3'>Update Profile</h2>
        <Form onSubmit={e => editProfile(e)}>
       {/*  ?? means that if the first arugment is not nullish , return the first argument, otherwise, return the second argument (''). this is to ensure that the value will not be undefined */}
            <Form.Group className='my-3'>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" value={firstName ?? ''} onChange={e => setFirstName(e.target.value)} required />
            </Form.Group>
            <Form.Group className='my-3'>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={lastName ?? ''} onChange={e => setLastName(e.target.value)} required />
            </Form.Group>
            <Form.Group className='my-3'>
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control type="text" value={mobileNo ?? ''} onChange={e => setMobileNo(e.target.value)} required />
            </Form.Group>

            {
                message && error === true ? <div className="alert alert-danger">{message}</div> : message && error === false ? <div className="alert alert-success">{message} </div> : null

            }
            <Button variant="dark" type="submit">Update Profile</Button>
        </Form>

        </>
        

    )
}
