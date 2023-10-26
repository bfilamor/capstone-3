import { useContext, useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap'
import { EditProduct } from './EditProduct'
import { ArchiveProduct } from './ArchiveProduct'
import { ActivateProduct } from './ActivateProduct';
import { useValue } from '../../UserContext';
import { FeatureProduct } from './FeatureProduct';
import { UnfeatureProduct } from './UnfeatureProduct';
import { AddProduct } from './AddProduct';
import { AddAdminUser } from './AddAdminUser';

export const AdminTools = () => {

    const { productsData, fetchData } = useValue();
    //got fetchData from props drilling from Producs Component 
    const [adminUsers, setAdminUsers] = useState([]);

    const fetchAllAdmin = () => {
        fetch(`${process.env.REACT_APP_API_URL}/users/admin/all`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if(data) {
                    setAdminUsers(data.reverse());
                }


            }).catch(error => console.log(error.message))

    }

    useEffect(() => {
        fetchAllAdmin();
    }, [])
    return (
        <>
            <AddAdminUser fetchAllAdmin={fetchAllAdmin}/>

            <Table className='text-center' responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>                     
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        adminUsers.map((admin) => {
                            return (
                                <tr key={admin._id}>
                                    <td>{admin._id}</td>
                                    <td>{admin.firstName}</td>
                                    <td>{admin.lastName}</td>
                                    <td>{admin.email}</td>
                                    
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>



        </>
    )
}
