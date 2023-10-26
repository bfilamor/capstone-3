import { useContext, useEffect, useState } from 'react';
import { Button, Table, Form, InputGroup } from 'react-bootstrap'
import { useValue } from '../../UserContext';
import { AdminLoader } from './AdminLoader';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { OrderDetailsAdmin } from './OrderDetailsAdmin';

export const ManageOrders = () => {

    const navigate = useNavigate();
    const { user } = useValue();

    const [ordersData, setOrdersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    //got fetchData from props drilling from Producs Component 

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
                    if (data.isAdmin !== true || data.isAdmin === null) {
                        console.log(data.isAdmin)
                        navigate("/products")
                    }

                } else {
                    navigate("/products")
                }
            }).catch(error => console.log(error.message))
    }

    const fetchOrders = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/orders/admin/all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`

                }
            })
            const data = await res.json();

            if (data) {
                setLoading(false)
                setOrdersData(data.reverse());
            }

        } catch (error) {
            console.log(error.message);
        }

    }



    const ordersRow = ordersData.map((order) => {
        return (
            <tr key={order._id} style={{ verticalAlign: "middle" }}>
                <td> {order._id}</td>
                <td> {moment(order.purchasedOn).format("MMM D, YYYY")}</td>
                <td> {order.customerEmail}</td>
                <td> {order.customerName}</td>
                <td className={order.status === "cancelled" ? "text-danger" : "text-success"}>{order.status}</td>
                <td>P{order.totalAmount}</td>
                <td className='text-center'>
                    <OrderDetailsAdmin orderId={order._id} />
                </td>
            </tr>
        )
    })


    useEffect(() => {
        fetchOrders();
        getProfile();
       
    }, [])
    return (
        (loading) ? <AdminLoader /> :
            <>
                {error ? <p className='fs-4 text-center py-5'>No Orders Found</p> :
                    <>
                        <Table striped hover responsive bordered className='mt-5' >
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Order Date</th>
                                    <th>Customer Email</th>
                                    <th>Customer Name</th>
                                    <th>Status</th>
                                    <th>Total Amount</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersRow}
                            </tbody>
                        </Table>
                    </>

                }





            </>
    )
}
