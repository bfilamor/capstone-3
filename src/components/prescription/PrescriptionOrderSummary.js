import React from 'react'
import { Table, Card } from 'react-bootstrap';

export const PrescriptionOrderSummary = ({ prescriptionOrderValues }) => {

    const { page, leftADD, leftAXIS, leftCYL, leftIPD, leftSPH, rightADD, rightAXIS, rightCYL, rightIPD, rightSPH, visionType, lensUpgrade, lensUpgradePrice, subTotal, selectedAddOn, description, name, price, productPhoto } = prescriptionOrderValues

    return (
        <Card className='bg-light'>
            <Card.Body>

                <div className='px-lg-5 px-2 pb-3'>
                    <h2 className='text-center py-3 fs-1 fw-bold'>Summary</h2>
                    <div className='row'>
                        {(productPhoto) ?
                            <div className='col-lg-5 pb-5 pe-lg-5'>
                                {<img src={productPhoto} className='img-fluid d-block mx-auto' />}
                            </div>
                            :
                            null}

                        <div className='col'>

                            <p className='mb-0 fs-4 fw-bold'>Frame</p>
                            <p className='fs-4 mb-0 text-capitalize'>{name} </p>
                            <p className='fs-4 fw-light mt-0 fst-italic'>{description} </p>

                            <p className='mb-0 fs-4 fw-bold'>Price</p>
                            <p className='fs-4 fw-light'>P{price} </p>

                            <p className='mb-0 fs-4 fw-bold'>Vision Type </p>
                            <p className='fs-4 fw-light'>{visionType} </p>
                            <p className='mb-0 fs-4 fw-bold'>Lens Upgrade </p>
                            <p className='fs-4 fw-light'>{lensUpgrade} ({lensUpgradePrice === 0 ? 'Free' : `P${lensUpgradePrice}`}) </p>

                            {
                                (selectedAddOn.length > 0) ?
                                    <>
                                        <p className='mb-0 fs-4 fw-bold'>Add Ons</p>

                                        {selectedAddOn.map((addOn) => {
                                            return (<p key={addOn._id} className='fs-4 fw-light mb-0 text-capitalize'>{addOn.name} - P{addOn.price}</p>)
                                        })}
                                    </>


                                    : null
                            }

                        </div>
                    </div>



                    {(visionType !== 'Non Prescription') ?
                        <>
                            <p className=' fs-4 fw-bold text-center'>Prescription Details </p>
                            <Table striped hover responsive className='text-center'>
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
                                            {rightSPH}
                                        </td>
                                        <td>
                                            {rightCYL}
                                        </td>
                                        <td>
                                            {rightAXIS}
                                        </td>
                                        <td>
                                            {rightADD}
                                        </td>
                                        <td>
                                            {rightIPD}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>OD Left Eye</td>
                                        <td>
                                            {leftSPH}
                                        </td>
                                        <td>
                                            {leftCYL}
                                        </td>
                                        <td>
                                            {leftAXIS}
                                        </td>
                                        <td>
                                            {leftADD}
                                        </td>
                                        <td>
                                            {leftIPD}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </>

                        : null}



                </div>

            </Card.Body>
        </Card>

    )
}
