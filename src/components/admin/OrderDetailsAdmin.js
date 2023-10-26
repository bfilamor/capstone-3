import { useEffect, useMemo, useState } from 'react';
import { Button, Container, Modal, CloseButton, Card, Table, Form } from 'react-bootstrap'
import {  Link } from 'react-router-dom';
import { useValue } from '../../UserContext';
import moment from 'moment';
import Swal from 'sweetalert2';

export const OrderDetailsAdmin = ({ orderId }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderData, setOrderData] = useState({})
    const [orderProducts, setOrderProducts] = useState([]);
    const [orderStatus, setOrderStatus] = useState('');

    const fetchOrderData = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/orders/admin/get/${orderId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })

            const data = await res.json();
            if (data) {
                setOrderData(data);
                // setOrderData(orderMap);
                //setIsModalOpen(true);
                setOrderProducts(data.products);
            }

        } catch (error) {
            console.log(error.message)
        }

    }

    const openModal = () => {
        setIsModalOpen(true);
        fetchOrderData();
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setOrderData({});
        fetchOrderData();
    }

    const handleOrderStatus = async(e) => {
        
        try {
           

            const res = await fetch(`${process.env.REACT_APP_API_URL}/orders/${orderId}/setOrderStatus`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    orderStatus : orderStatus
                })
            })

            const data = await res.json();

            if (data) {
                fetchOrderData();
                Swal.fire({
                    title: "Status Succesfully Changed",
                    icon: "success",
                    text: "This will reflect to the customer immediately"
                })
                setOrderStatus('');
            }

        } catch (error) {
            console.log(error.message)
        }
    }


 
    useEffect(() => {
        fetchOrderData();

    }, [orderId])
    return (
        <>
            <Button variant='primary' onClick={() => openModal()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
            </svg> View Details</Button>

            <Modal show={isModalOpen} fullscreen={true}>
                <Modal.Body className='p-0'>
                    <div className='fw-bold fs-4 pt-3 pe-3 d-flex justify-content-end'><CloseButton onClick={(e) => closeModal(e)} /></div>
                    <Container>
                        <Card key={orderData._id} className='p-lg-5 p-3'>
                            <Card.Body>
                                <div className='row'>
                                    <div className='col-lg-6'>

                                        <p className='mb-0 fs-4 fw-bold'>Order ID</p>
                                        <h2>{orderData._id}</h2>


                                        <p className='mb-0 fs-4 fw-bold'>Customer Details</p>
                                        <p className='fs-4 mb-0'>{orderData.customerName}</p>
                                        <p className='fs-4'>{orderData.customerEmail}</p>
                                        <p className='mb-0 fs-4 fw-bold'>Order Status</p>

                                       
                                        <p className={(orderData.status === "cancelled") ? "fs-4 mt-0 text-danger" : "fs-4 mt-0 text-success"}>{orderData.status} </p>

                                        <Form onSubmit={(e) => {
                                             e.preventDefault();
                                            handleOrderStatus();
                                        }} className='mb-5'>
                                            <Form.Select aria-label="Default select example" className='mb-3' onChange={(e) => {
                                                setOrderStatus(e.target.value)
                                            }}>
                                                <option value="active">Active</option>
                                                <option value="cancelled">Cancelled</option>
                                                <option value="completed">Completed</option>
                                            </Form.Select>
                                            <Button  type="submit" variant='primary'>Set Order Status</Button>
                                        </Form>

                                        <p className='mb-0 fs-4 fw-bold'>Purchase Date</p>
                                        <p className='fs-4'>{moment(orderData.purchasedOn).format("MMM D, YYYY")} </p>


                                    </div>
                                    <div className='col-lg-6'>
                                        <p className='fs-4 fw-bold'>Product(s)</p>
                                        <div className='p-3 bg-light rounded-3'>
                                            {orderProducts.map(product => (
                                                <div className='border-bottom py-2' key={product.productId}>
                                                    <p className='mb-0 fs-4 fw-bold text-capitalize'>({product.quantity}x) {product.productName}</p>
                                                    {(product.addOns.length > 0) ?
                                                        <>
                                                            <div className='p-3 my-2 border-start border-3 '>
                                                                <p className='mb-0 fs-5 fw-bold'>Add Ons:</p>
                                                                {product.addOns.map(addOn => (
                                                                    <p key={addOn._id} className='fs-5 mb-0'>{addOn.name} - P{addOn.price}</p>
                                                                ))}

                                                            </div>

                                                        </>

                                                        : null}

                                                    {
                                                        (product.prescription !== undefined) ?
                                                            <>
                                                                <p className='mb-0 fs-4 fw-bold'>Vision Type</p>
                                                                <p className='mt-0 fs-4'>{product.prescription.visionType}</p>

                                                                <p className='mb-0 fs-4 fw-bold'>Lens Type</p>
                                                                <p className='mt-0 fs-4'>{product.prescription.lensUpgrade.lensType} -  P{product.prescription.lensUpgrade.lensPrice}</p>

                                                            </>
                                                            : null
                                                    }
                                                    <p className='mb-0 fs-4 fw-bold'>Subtotal</p>
                                                    <p className='fs-4'>P{product.subTotal} </p>

                                                </div>


                                            ))}
                                            <p className='mb-0 fs-2 fw-bold'>Total Amount</p>
                                            <p className='fs-2'>P{orderData.totalAmount} </p>



                                        </div>




                                    </div>
                                </div>

                                {orderProducts.map(product => (

                                    ((product.prescription !== undefined) && (product.prescription.visionType !== "Non Prescription")) ?
                                        <>
                                            <p className='mt-5 fs-4 fw-bold text-center' key={product.productId}>Prescription Details</p>
                                            <Table striped hover responsive className='text-center' key={product._id}>
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>SPH</th>
                                                        <th>CYL</th>
                                                        <th>AXIS</th>
                                                        <th>ADD</th>
                                                        <th>IPD</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>OD Right Eye</td>
                                                        <td>
                                                            {product.prescription.odRightEye.SPH}
                                                        </td>
                                                        <td>
                                                            {product.prescription.odRightEye.CYL}
                                                        </td>
                                                        <td>
                                                            {product.prescription.odRightEye.AXIS}
                                                        </td>
                                                        <td>
                                                            {product.prescription.odRightEye.ADD}
                                                        </td>
                                                        <td>
                                                            {product.prescription.odRightEye.IPD}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>OD Left Eye</td>
                                                        <td>
                                                            {product.prescription.odLeftEye.SPH}
                                                        </td>
                                                        <td>
                                                            {product.prescription.odLeftEye.CYL}
                                                        </td>
                                                        <td>
                                                            {product.prescription.odLeftEye.AXIS}
                                                        </td>
                                                        <td>
                                                            {product.prescription.odLeftEye.ADD}
                                                        </td>
                                                        <td>
                                                            {product.prescription.odLeftEye.IPD}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>

                                        </>
                                        : null

                                ))}



                            </Card.Body>

                        </Card>

                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}



