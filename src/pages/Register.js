import { useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Form, Button, Container, FloatingLabel } from 'react-bootstrap';
import { useValue } from '../UserContext';
import Swal from 'sweetalert2';


export default function Register() {

    const { user } = useValue();

    const navigate = useNavigate();
    // State hooks to store the values of the input fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [emailExists, setEmailExists] = useState(false);
    const [mobileNo, setMobileNo] = useState("");
    const [homeAddress, setHomeAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(true);

    // Check if values are successfully binded
    /* console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(mobileNo);
    console.log(password);
    console.log(confirmPassword); */

    // Handler function for registering our user 
    function registerUser(e) {
        // Prevents page reload everytime we submit in the form
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNo: mobileNo,
                password: password,
                homeAddress: homeAddress
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
                    setHomeAddress("");
                    setPassword("");
                    setConfirmPassword("");
                    Swal.fire({
                        title: "Registration Successful",
                        icon: "success",
                        text: "Welcome to Zuitt"
                    })
                    navigate('/login');
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



    // useEffect is used to create "side effects" or execute a codeblock everytime the component renders or if there are changes in the state that is listed in the dependecy array
    useEffect(() => {
        // Check if the fields are filled properly, checks if the password matches the confirm password, and checks if the length of mobileNo is 11.
        if (
            (firstName !== "" &&
                lastName !== "" &&
                email !== "" &&
                mobileNo !== "" &&
                homeAddress !== "" &&
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
    }, [firstName, lastName, email, mobileNo, password, homeAddress, confirmPassword]);

    useEffect(() => {
        if (password === confirmPassword) {
            setPasswordError(false);
        } else {
            setPasswordError(true)
        }
    }, [password, confirmPassword])

    return (
        (user.id !== null) ?
            <Navigate to="/courses" />
            :

            <div className='row justify-content-center py-5'>
                <div className='col-lg-7 bg-light border-radius-3 border'>
                    <div className='p-5'>
                        <Form onSubmit={(e) => registerUser(e)} >

                            <h1 className='text-center my-3'>Register</h1>
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
                            <FloatingLabel label="Home Address" className='my-3'>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Home Address."
                                    required
                                    value={homeAddress}
                                    onChange={e => { setHomeAddress(e.target.value) }}
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

                            {isActive && !emailExists ?
                                <Button variant="primary" type="submit" >Submit</Button>
                                :
                                <Button variant="danger" type="submit" disabled>Submit</Button>
                            }


                        </Form>

                    </div>
                </div>
            </div>
    )
}