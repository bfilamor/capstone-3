import React, { useEffect, useState } from 'react'
import { Container, Card, Table, Button } from 'react-bootstrap';
import moment from 'moment';
import { OrderDetails } from '../components/users/OrderDetails';
import { useNavigate } from 'react-router-dom';

export const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserOrders = async () => {
    try {
      let token = localStorage.getItem("token");
      const res = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      const data = await res.json();
      if (data) {
        setOrders(data.reverse());
        setLoading(false);
      } 

    } catch (error) {
      console.log(error.message)
    }
  }
  

  const ordersRow = orders.map((order) => {
    return (
      <tr key={order._id} style={{ verticalAlign: "middle" }}>
        <td> {order._id}</td>
        <td> {moment(order.purchasedOn).format("MMM D, YYYY")}</td>
        <td className={order.status === "cancelled" ? "text-danger" : "text-success"}>{order.status}</td>
        <td>P{order.totalAmount}</td>
        <td className='text-center'>
        <OrderDetails productId={order._id}/>
       </td>
      </tr>
    )
  })

  const checkIfLoggedin = () => {
    let token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            if (!data) {
                //if the token is not an admin, redirect to /courses page
                navigate("/products")
            }

        }).catch(error => console.log(error.message))
}

  useEffect(() => {
    getUserOrders();
    checkIfLoggedin();
  }, [])
  return (
    <>
      <Container className='py-5'>
        <h2 className='text-center mb-3'>My Recent Orders</h2>

        {(loading) ? <p>...Loading Order History</p> :
          <Table striped hover responsive >
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Total Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ordersRow}
            </tbody>
          </Table>

        }


      </Container>
    </>
  )
}
