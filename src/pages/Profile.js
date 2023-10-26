import { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useValue } from '../UserContext';
import ResetPassword from '../components/users/ResetPassword';
import { UpdateProfile } from '../components/users/UpdateProfile';

export const Profile = () => {
    const navigate = useNavigate();
    const { user, userSession } = useValue();
    const [profile, setProfile] = useState({});

    const getProfile = () => {
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    //console.log(data);
                    setProfile({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        mobileNo: data.mobileNo,
                        homeAddress:data.homeAddress
                    })

                    if (data.isAdmin === true) {
                        navigate("/dashboard")
                    }
                }
            }).catch(error => console.log(error.message))
    }

    useEffect(() => {
        //every page load retrieve profile details
        getProfile(); 
    }, [])


    const { firstName, lastName, email, mobileNo } = profile;

    return (
        (user.id !== null || userSession !== null) ?
            <>
            <section className="bg-dark text-white py-5">
                <Container>
                    <Row>
                        <Col>
                            <h1 className='mb-5'>Profile</h1>
                            <h2 className='mt-3'>{firstName} {lastName}</h2>
                            <hr />
                            <h4>Contacts</h4>
                            <ul>
                                <li>Email: {email}</li>
                                <li>Mobile No: {mobileNo}</li>
                            </ul>
                        </Col>

                    </Row>
                </Container>
            </section>
            <section className='py-5'>
                <Container>
                    <Row>
                        <Col className='col-lg-6 px-3'>
                        <ResetPassword />
                        </Col>
                        <Col className='col-lg-6 px-3'>
                            <UpdateProfile getProfile={getProfile} profileProp={profile}/>
                        </Col>
                    </Row>
                </Container>
            </section>
         
            </>
            :
            <Navigate to="/" />
    )
}
