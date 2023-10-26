import React from 'react'
import { Card, Placeholder } from 'react-bootstrap'

export const ProductViewLoader = () => {
    return (
        <>
            <div className='row py-5 px-5'>
                <div className='col-lg-6'>
                    <Placeholder as="div" animation="glow" >
                        <Placeholder xs={12} style={{ height: "400px" }} />
                    </Placeholder>
                </div>
                <div className='col-lg-6'>
                    <Placeholder as="h3" animation="glow" >
                        <Placeholder xs={10}  />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" >
                        <Placeholder xs={6}  className="mb-3" />
                    </Placeholder>
                    <Card>
                        <Card.Body >
                            <Placeholder animation="glow" >
                                <Placeholder xs={12} />
                            </Placeholder>
                            <Placeholder  as="p"  animation="glow" >
                                <Placeholder xs={6} />
                            </Placeholder>

                            <Placeholder animation="glow" >
                                <Placeholder xs={12} />
                            </Placeholder>
                            <Placeholder  as="p"  animation="glow" >
                                <Placeholder xs={6} />
                            </Placeholder>

                        </Card.Body>

                    </Card>
                </div>
            </div>
        </>
    )
}
