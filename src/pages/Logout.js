import {  useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { useValue } from '../UserContext';


export const Logout = () => {

    const { unsetUser, setUser, setIsLoggedin } = useValue();
    //clear our local storage
    unsetUser();

    //this will allow the logout page to render first before triggering the useEffect which changes the value of the "user" state
    useEffect(() => {
        setUser({
            id: null,
            isAdmin: null
        });
        setIsLoggedin(false);
    }, [])
    //redirect back to login
    return (
        <Navigate to="/login" />
    )
}
