import React from 'react'
import { Card, Placeholder, Table } from 'react-bootstrap'

export const AdminLoader = () => {
    return (
        <>
            <Table striped responsive>
                <thead>
                    <tr>
                        <th> 
                        <Placeholder as="div" animation="glow" >
                            <Placeholder xs={6}  />
                        </Placeholder> 
                        </th>

                    </tr>

                </thead>
                <tbody>
                    <tr>
                        <td>
                        <Placeholder as="div" animation="glow" >
                            <Placeholder xs={12}  />
                        </Placeholder> 

                        </td>
                    </tr>
                    <tr>
                        <td>
                        <Placeholder as="div" animation="glow" >
                            <Placeholder xs={8}  />
                        </Placeholder> 

                        </td>
                    </tr>
                    <tr>
                        <td>
                        <Placeholder as="div" animation="glow" >
                            <Placeholder xs={6}  />
                        </Placeholder> 

                        </td>
                    </tr>
                </tbody>
            </Table>

        </>
    )
}
