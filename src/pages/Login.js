import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Form, Button, Container, FloatingLabel } from 'react-bootstrap';
import { useValue } from '../UserContext';
import Swal from 'sweetalert2';

export const Login = () => {
    /* const navigate = useNavigate(); */

    //allows us to consune the user context object and it's properties to use for user validation
    const { user, setUser, setIsLoggedin } = useValue();

    // State hooks to store the values of the input fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(true);


    // Handler function for registering our user 
    function authenticate(e) {

        // Prevents page reload everytime we submit in the form
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (typeof data.access !== "undefined") {
                    console.log(data);
                    //set the global state "user" to the token received from logging in

                    //set the token of the authenticated user in the local storage
                    //localStorage.set('propertyName',value)
                    localStorage.setItem('token', data.access)
                    /* setUser({
                        token: localStorage.getItem('token')
                    }) */
                    retrieveUserDetails(data.access)
                    setIsLoggedin(true);

                    Swal.fire({
                        title: "Login Successful",
                        icon: "success",
                        text: "Welcome to Zuitt"
                    })
                } else {
                    Swal.fire({
                        title: "Authentication Failed",
                        icon: "error",
                        text: "check your login details and try again"
                    })
                }
            }).catch(error => console.log(error.message))
    }

    const retrieveUserDetails = (token) => {
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                let newData = {
                    id: data._id,
                    isAdmin: data.isAdmin
                }

                setUser({
                    ...newData
                });

            }).catch(error => console.log(error.message))
    }

    useEffect(() => {
        if ((email !== "") && (password !== "")) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }

        // Dependency Array
    }, [email, password]);


    return (
        <Container>
            <div className='row justify-content-center py-5'>
                <div className='col-lg-7 bg-light border-radius-3 border'>
                    <div className='p-lg-5 p-3'>
                        {(user.id !== null) ?
                            <Navigate to="/products" />
                            :
                            <Form onSubmit={(e) => authenticate(e)} >
                                <h1 className='text-center'>Login</h1>
                                <FloatingLabel controlId="email" label="Email" className="my-4">
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter Email"
                                        required
                                        value={email}
                                        onChange={e => { setEmail(e.target.value) }}
                                    />
                                </FloatingLabel>

                                <FloatingLabel controlId="password" label="Password" className="my-4">
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter Password."
                                        required
                                        value={password}
                                        onChange={e => { setPassword(e.target.value) }}
                                    />
                                </FloatingLabel>

                                {/* conditionally render submit button based on isActive state */}

                                <div className='d-flex justify-content-center'>
                                    {isActive ?
                                        <Button variant="primary" type="submit" >Login</Button>
                                        :
                                        <Button variant="danger" type="submit" disabled>Login</Button>
                                    }

                                </div>

                            </Form>
                        }

                    </div>


                </div>
            </div>

        </Container>
    )
}

