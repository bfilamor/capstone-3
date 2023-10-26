import React, { useState } from 'react'
import { Table, Form } from 'react-bootstrap'

export const Prescription = ({prescriptionFormValues}) => {

    const {setRightADD, setRightAXIS, setRightCYL, setRightIPD, setRightSPH, setLeftADD, setLeftAXIS, setLeftCYL, setLeftIPD, setLeftSPH,  rightADD, rightAXIS,rightCYL,rightIPD,rightSPH,leftADD,leftAXIS,leftCYL,leftIPD,leftSPH} = prescriptionFormValues;
 
    const SPHArray = [+10.00, +9.75, +9.50, +9.25, +9.00, +8.75, +8.50, +8.25, +8.00, +7.75, +7.50, +7.25, +7.00, +6.75, +6.50, +6.25, +6.00, +5.75, +5.50, +5.25, +5.00, +4.75, +4.50, +4.25, +4.00, +3.75, +3.50, +3.25, +3.00, +2.75, +2.50, +2.25, +2.00, +1.75, +1.50, +1.25, +1.00, +0.75, +0.50, +0.25, -0.25, -0.50, -0.75, -1.00, -1.25, -1.50, -1.75, -2.00, -2.25, -2.50, -2.75, -3.00, -3.25, -3.50, -3.75, -4.00, -4.25, -4.50, -4.75, -5.00, -5.25, -5.50, -5.75, -6.00, -6.25, -6.50, -6.75, -7.00, -7.25, -7.50, -7.75, -8.00, -8.25, -8.50, -8.75, -9.00, -9.25, -9.50, -9.75, -10.00, -10.25, -10.50, -10.75, -11.00, -11.25, -11.50, -11.75, -12.00];
    const CYLArray = [0.00, -0.25, -0.50, -0.75, -1.00, -1.25, -1.50, -1.75, -2.00, -2.25, -2.50, -2.75, -3.00, -3.25, -3.50, -3.75, -4.00, -4.25, -4.50, -4.75, -5.00, -5.25, -5.50, -5.75, -6.00];
    const ADDArray = [+3.00, +2.75, +2.50, +2.25, +2.00, +1.75, +1.50, +1.25, +1.00, +0.75, +0.50, +0.25, 0.00];
    const IPDArray = [40.0, 39.5, 39.0, 38.5, 38.0, 37.5, 37.0, 36.5, 36.0, 35.5, 35.0, 34.5, 34.0, 33.5, 33.0, 32.5, 32.0, 31.5, 31.0, 30.5, 30.0, 29.5, 29.0, 28.5, 28.0, 27.5, 27.0, 26.5, 26.0, 25.5, 25.0, 24.5, 24.0, 23.5, 23.0, 22.5, 22.0, 21.5, 21.0, 20.5, 20.0];
    const axisArray = Array.from({ length: 181 }, (value, index) => index);
    

   
    const AXISOptions = axisArray.map((value) => {
        return (<option key={value} value={value}>{value}</option>)
    })

    const SPHOptions = SPHArray.map((value) => {
        return (<option key={value} value={value}>{value}</option>)
    })

    const CYLOptions = CYLArray.map((value) => {
        return (<option key={value} value={value}>{value}</option>)
    })

    const ADDOptions = ADDArray.map((value) => {
        return (<option key={value} value={value}>{value}</option>)
    })

    const IPDOptions = IPDArray.map((value) => {
        return (<option key={value} value={value}>{value}</option>)
    })

    return (
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
                        <Form.Select onChange={(e) => { setRightSPH(e.target.value); }}>
                            {SPHOptions}
                        </Form.Select>
                    </td>
                    <td>
                        <Form.Select onChange={(e) => { setRightCYL(e.target.value); }} >
                            {CYLOptions}
                        </Form.Select>
                    </td>
                    <td>
                        <Form.Select onChange={(e) => { setRightAXIS(e.target.value); }} >
                            {AXISOptions}
                        </Form.Select>
                    </td>
                    <td>
                        <Form.Select onChange={(e) => { setRightADD(e.target.value); }} >
                            {ADDOptions}
                        </Form.Select>
                    </td>
                    <td>
                        <Form.Select onChange={(e) => { setRightIPD(e.target.value); }} >
                            {IPDOptions}
                        </Form.Select>
                    </td>
                </tr>
                <tr>
                    <td>OD Left Eye</td>
                    <td>
                        <Form.Select onChange={(e) => { setLeftSPH(e.target.value); }}>
                            {SPHOptions}
                        </Form.Select>
                    </td>
                    <td>
                        <Form.Select onChange={(e) => { setLeftCYL(e.target.value); }} >
                            {CYLOptions}
                        </Form.Select>
                    </td>
                    <td>
                        <Form.Select onChange={(e) => { setLeftAXIS(e.target.value); }} >
                            {AXISOptions}
                        </Form.Select>
                    </td>
                    <td>
                        <Form.Select onChange={(e) => { setLeftADD(e.target.value); }} >
                            {ADDOptions}
                        </Form.Select>
                    </td>
                    <td>
                        <Form.Select onChange={(e) => { setLeftIPD(e.target.value); }} >
                            {IPDOptions}
                        </Form.Select>
                    </td>
                </tr>
            </tbody>
        </Table>
    )
}
