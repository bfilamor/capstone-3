import { useEffect, useState } from "react"
import { Button, Modal, Form, FloatingLabel, CloseButton } from "react-bootstrap"
import Swal from "sweetalert2";
import { useValue } from "../../UserContext";

export const AddAdminUser = ({ fetchAllAdmin }) => {
    //got fetchData by props drilling. this function came from the Products component then was passed into its child components

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [emailExists, setEmailExists] = useState(false);
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(true);

    const [showModal, setShowModal] = useState(false);

    const { productsData } = useValue();

    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = (e) => {
        e.preventDefault();
        setShowModal(false);
        // To reset the form field after registration
        setFirstName("");
        setLastName("");
        setEmail("");
        setMobileNo("");
        setPassword("");
        setConfirmPassword("");
    }

    function addNewAdmin(e) {
        // Prevents page reload everytime we submit in the form
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/users/admin/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNo: mobileNo,
                password: password
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data) {
                    // To reset the form field after registration
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setMobileNo("");
                    setPassword("");
                    setConfirmPassword("");
                    Swal.fire({
                        title: "Registration Successful",
                        icon: "success",
                        text: "Welcome to Zuitt"
                    })
                   setShowModal(false);
                   fetchAllAdmin();
                } else {
                    Swal.fire({
                        title: "Authentication Failed",
                        icon: "error",
                        text: "Registration failed"
                    })
                }
            })
    }

    function checkEmailExists(emailInput) {

        fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emailInput
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setEmailExists(true);
                    setIsActive(false);
                } else {
                    setEmailExists(false);
                    setIsActive(true);
                }
            })
    }

    useEffect(() => {
        // Check if the fields are filled properly, checks if the password matches the confirm password, and checks if the length of mobileNo is 11.
        if (
            (firstName !== "" &&
                lastName !== "" &&
                email !== "" &&
                mobileNo !== "" &&
                password !== "" &&
                confirmPassword !== "") &&
            (password === confirmPassword) &&
            (mobileNo.length === 11)
        ) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }

        // Dependency Array
    }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

    useEffect(() => {
        if (password === confirmPassword) {
            setPasswordError(false);
        } else {
            setPasswordError(true)
        }
    }, [password, confirmPassword])

    return (
        <>

            <div className="p-5">
                <Button variant="success" size="lg" onClick={() => openModal()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                </svg> Create New Admin User</Button>

            </div>

            <Modal show={showModal}>
                <Form onSubmit={e => addNewAdmin(e)}>
                    <div className='fw-bold fs-4 pt-3 pe-3 d-flex justify-content-end'><CloseButton onClick={(e) => closeModal(e)} /></div>
                    <Modal.Header>
                        <Modal.Title>Create New Admin User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FloatingLabel label="First Name" className='my-3'>
                            <Form.Control
                                type="text"
                                placeholder="Enter First Name"
                                required
                                value={firstName}
                                onChange={e => { setFirstName(e.target.value) }}
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Last Name" className='my-3'>
                            <Form.Control
                                type="text"
                                placeholder="Enter Last Name"
                                required
                                value={lastName}
                                onChange={e => { setLastName(e.target.value) }}
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Email" className='my-3'>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                required
                                value={email}
                                onMouseLeave={e => { checkEmailExists(e.target.value) }}
                                onChange={e => { setEmail(e.target.value); }}
                                className={emailExists ? "border-danger" : null}
                            />
                            {emailExists ? <p className='text-danger mt-3'>Email Already Exists</p> : null}
                        </FloatingLabel>
                        <FloatingLabel label="Mobile Number" className='my-3'>
                            <Form.Control
                                type="number"
                                placeholder="Enter 11 Digit No."
                                required
                                value={mobileNo}
                                onChange={e => { setMobileNo(e.target.value) }}
                            />
                        </FloatingLabel>
                        
                        <FloatingLabel label="Password" className='my-3'>
                            <Form.Control
                                type="password"
                                placeholder="Enter Password."
                                required
                                value={password}
                                onChange={e => { setPassword(e.target.value) }}
                                className={passwordError ? "border-danger" : null}
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Confirm Password" className='my-3'>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password."
                                required
                                value={confirmPassword}
                                onChange={e => { setConfirmPassword(e.target.value) }}
                                className={passwordError ? "border-danger" : null}
                            />
                            {passwordError ? <p className='text-danger mt-3'>Passwords Don't Match</p> : null}
                        </FloatingLabel>

                        {/* conditionally render submit button based on isActive state */}


                    </Modal.Body>
                    <Modal.Footer>
                        {isActive && !emailExists ?
                            <Button variant="primary" type="submit" >Submit</Button>
                            :
                            <Button variant="danger" type="submit" disabled>Submit</Button>
                        }
                    </Modal.Footer>
                </Form>
            </Modal>

        </>

    )
}
