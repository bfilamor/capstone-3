import { useEffect, useMemo, useState } from 'react';
import { Button, Container, Modal, ToggleButton, ToggleButtonGroup, ProgressBar, CloseButton } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { Prescription } from './Prescription';
import { PrescriptionOrderSummary } from './PrescriptionOrderSummary';
import { useValue } from '../../UserContext';

export const SelectLenses = ({ _id, price, name, description, quantity, isPrescription, productPhoto }) => {

    const [visionType, setVisionType] = useState('');
    const [lensUpgrade, setLensUpgrade] = useState('Multi Coated Lens');
    const [page, setPage] = useState(1)
    const [lensUpgradePrice, setLensUpgradePrice] = useState(0);
    const [subTotal, setSubtotal] = useState(price);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rightSPH, setRightSPH] = useState(10);
    const [rightCYL, setRightCYL] = useState(0);
    const [rightAXIS, setRightAXIS] = useState(0);
    const [rightADD, setRightADD] = useState(3);
    const [rightIPD, setRightIPD] = useState(40);
    const [leftSPH, setLeftSPH] = useState(10);
    const [leftCYL, setLeftCYL] = useState(0);
    const [leftAXIS, setLeftAXIS] = useState(0);
    const [leftADD, setLeftADD] = useState(3);
    const [leftIPD, setLeftIPD] = useState(40);
    const [initialSubtotal, setInitialSubtotal] = useState(0);
    const [orderSummary, setOrderSummary] = useState({
        visionType: visionType,
        lensUpgrade: lensUpgrade,
        prescription: {
            odRightEye: {
                SPH: rightSPH,
                CYL: rightCYL,
                AXIS: rightAXIS,
                ADD: rightADD,
                IPD: rightIPD
            },
            odLeftEye: {
                SPH: leftSPH,
                CYL: leftCYL,
                AXIS: leftAXIS,
                ADD: leftADD,
                IPD: leftIPD
            }
        },
    })

    const { fetchAddOns, setSelectedAddOn, selectedAddOn } = useValue();
    const prescriptionOrderValues = {
        page, leftADD, leftAXIS, leftCYL, leftIPD, leftSPH, rightADD, rightAXIS, rightCYL, rightIPD, rightSPH, visionType, lensUpgrade, lensUpgradePrice, subTotal, selectedAddOn, _id, price, name, description, quantity, isPrescription, subTotal, productPhoto
    }
    const prescriptionFormValues = {
        setRightADD, setRightAXIS, setRightCYL, setRightIPD, setRightSPH, setLeftADD, setLeftAXIS, setLeftCYL, setLeftIPD, setLeftSPH, rightADD, rightAXIS,rightCYL,rightIPD,rightSPH,leftADD,leftAXIS,leftCYL,leftIPD,leftSPH
    }

    const handleVisionType = (val) => setVisionType(val);

    let addOnPrices = 0;
    const openModal = () => {
        setIsModalOpen(true);
        if (selectedAddOn.length > 0) {
            selectedAddOn.forEach((addOn) => {
                addOnPrices += addOn.price
            })
            setInitialSubtotal(addOnPrices)
            setSubtotal(addOnPrices + price)
        }

    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSubtotal(price);
        setSelectedAddOn([]);
        setInitialSubtotal(0);
        setPage(1);
        setVisionType('');
    }



    const handleLensUpgrade = (val) => {
        setLensUpgrade(val)
        let initialValue = 0;

        if (val === 'Multi Coated Lens') {
            initialValue = 0;
        } else if (val === 'Photochromic') {
            initialValue = 1500
        } else if (val === 'Blue Light') {
            initialValue = 1500
        } else if (val === 'Photochromic + Blue Light') {
            initialValue = 4500
        } else if (val === 'Blue Light Blocker') {
            initialValue = 1500

        }

        setLensUpgradePrice(initialValue);
        //setInitialSubtotal(initialValue + price)
        setSubtotal(initialSubtotal + initialValue + price);
    };

    /* useEffect(() => {
        setOrderSummary({
            visionType: visionType,
            lensUpgrade: lensUpgrade,
            prescription: {
                odRightEye: {
                    SPH: rightSPH,
                    CYL: rightCYL,
                    AXIS: rightAXIS,
                    ADD: rightADD,
                    IPD: rightIPD
                },
                odLeftEye: {
                    SPH: leftSPH,
                    CYL: leftCYL,
                    AXIS: leftAXIS,
                    ADD: leftADD,
                    IPD: leftIPD
                }
            },
        })
    },[]) */
    return (

        <>
            <Button variant='dark' onClick={() => openModal()}>Select Lenses (Starts at ₱{price})</Button>

            <Modal show={isModalOpen} fullscreen={true}>

                <Modal.Body className='p-0'>
                    <Container fluid>
                        <div className='row min-vh-100'>
                            {((page < 3 && visionType === "Non Prescription") || (page < 4 && visionType !== "Non Prescription")) ?

                                <div className='col-lg-4 d-none d-lg-block bg-light border-end border-2 p-2 p-lg-5 text-start' >
                                    <div className='position-sticky top-0'>
                                        <h2 className='text-center py-3 fw-bold'>Summary</h2>
                                        {(productPhoto) ? <img src={productPhoto} className='mx-auto my-3 d-block img-fluid' style={{maxWidth:"300px"}} /> : null}
                                        <p className='mb-0 fs-5 fw-bold'>Frame</p>
                                        <p className='fs-5 mb-0'>{name} </p>
                                        <p className='fs-5 fw-light mt-0 fst-italic'>{description} </p>

                                        <p className='mb-0 fs-5 fw-bold'>Price</p>
                                        <p className='fs-5 fw-light'>P{price} </p>
                                        {(visionType !== '') ?

                                            <>
                                                <p className='mb-0 fs-5 fw-bold'>Vision Type </p>
                                                <p className='fs-5 fw-light'>{visionType} </p>
                                                <p className='mb-0 fs-5 fw-bold'>Lens Upgrade </p>
                                                <p className='fs-5 fw-light'>{lensUpgrade} ({lensUpgradePrice === 0 ? 'Free' : `P${lensUpgradePrice}`}) </p>
                                            </>
                                            : null}

                                        {
                                            (selectedAddOn.length > 0) ?
                                                <>
                                                    <p className='mb-0 fs-5 fw-bold'>Add Ons</p>

                                                    {selectedAddOn.map((addOn) => {
                                                        return (<p key={addOn._id} className='fs-5 fw-light mb-0'>{addOn.name} - P{addOn.price}</p>)
                                                    })}
                                                </>


                                                : null
                                        }


                                    </div>


                                </div>
                                : null

                            }

                            <div className='col'>
                                <div className='fw-bold fs-4 pt-3 pe-3 d-flex justify-content-end'><CloseButton onClick={(e) => closeModal(e)} /></div>
                                {(page === 1 ?
                                    <div className='p-2 p-lg-5'>
                                        <h2 className='text-center py-3 fw-bold'>Select Vision Type</h2>
                                        <div className='d-flex justify-content-center pt-3'>

                                            <ToggleButtonGroup size='lg' vertical type="radio" name="options" value={visionType} onChange={handleVisionType}>
                                                <ToggleButton id="tbg-btn-1" value={'Single Vision'}>
                                                    <div className='p-3 border-bottom'>
                                                        <h3>Single Vision</h3>
                                                        <p>Near-sighted or far-sighted? These lenses can help you see better at either distances</p>
                                                    </div>
                                                </ToggleButton>
                                                <ToggleButton id="tbg-btn-2" value={'Non Prescription'}>
                                                    <div className='p-3 '>
                                                        <h3>Non Prescription</h3>
                                                        <p>Style and protection without prescription</p>
                                                    </div>

                                                </ToggleButton>

                                            </ToggleButtonGroup>

                                        </div>

                                    </div>

                                    : null)}

                                {(page === 2 ?
                                    <div className='p-2 p-lg-5'>
                                        <h2 className='text-center py-3 fw-bold'>Select your Lens Upgrade</h2>
                                        <ToggleButtonGroup size='lg' vertical type="radio" name="options2" value={lensUpgrade} onChange={handleLensUpgrade}>
                                            <ToggleButton value={'Multi Coated Lens'} id="tbg-btn-3">
                                                <div className='p-3 border-bottom'>
                                                    <h3>Multi Coated Lens</h3>
                                                    <p>Standard glasses multicoated with scratch resistant, anti-glare and UV protection lenses.</p>
                                                    <h4>Free</h4>
                                                </div>
                                            </ToggleButton>
                                            <ToggleButton value={'Photochromic'} id="tbg-btn-4">
                                                <div className='p-3 border-bottom'>
                                                    <h3>Photochromic</h3>
                                                    <p>Photochromic lenses are a type of lens coated with a chemical that causes them to darken in bright light and become normal when in normal surroundings.</p>
                                                    <h4>₱1500</h4>
                                                </div>

                                            </ToggleButton>

                                            <ToggleButton value={'Blue Light'} id="tbg-btn-5">
                                                <div className='p-3 border-bottom'>
                                                    <h3>Blue Light</h3>
                                                    <p>Get blue light protection to reduce eye strain and other screen-related problems.</p>
                                                    <h4>₱1500</h4>
                                                </div>

                                            </ToggleButton>
                                            <ToggleButton value={'Photochromic + Blue Light'} id="tbg-btn-6">
                                                <div className='p-3 border-bottom'>
                                                    <h3>Photochromic + Blue Light</h3>
                                                    <p>Get blue light protection to reduce eye strain and other screen-related problems.</p>
                                                    <h4>₱4500</h4>
                                                </div>

                                            </ToggleButton>
                                            <ToggleButton value={'Blue Light Blocker'} id="tbg-btn-7">
                                                <div className='p-3'>
                                                    <h3>Blue Light Blocker</h3>
                                                    <p>Blue light blocking glasses have filters in their lenses that block or absorb blue light, and in some cases UV light, from getting through. </p>
                                                    <h4>₱1500</h4>
                                                </div>

                                            </ToggleButton>

                                        </ToggleButtonGroup>

                                    </div>

                                    : null)}

                                {(page === 3 ?
                                    <div>
                                        {visionType === 'Non Prescription' ?
                                            <>
                                                <div className='p-2 p-lg-5'>

                                                    <PrescriptionOrderSummary prescriptionOrderValues={prescriptionOrderValues} />

                                                </div>

                                            </>
                                            :
                                            <div className='p-2 p-lg-5'>
                                                <h2 className='text-center py-3 fw-bold'>Add Prescription</h2>
                                                <Prescription prescriptionFormValues={prescriptionFormValues} description={description} name={name} price={price} />
                                            </div>


                                        }

                                    </div>

                                    : null)}

                                {(page === 4 ?
                                    <>
                                        <div className='p-2 p-lg-5'>

                                            <PrescriptionOrderSummary prescriptionOrderValues={prescriptionOrderValues} />

                                        </div>


                                    </>

                                    : null
                                )}

                                {(visionType !== "" ?
                                    <>
                                        <div className='d-flex gap-2 justify-content-center py-5'>
                                            {(page > 1 || page === 4) ? <Button size='lg' variant='secondary' onClick={() => { setPage((prev) => prev - 1) }}>Go Back</Button> : null}

                                            {((page < 3 && visionType === "Non Prescription") || (page < 4 && visionType !== "Non Prescription")) ? <Button size='lg' variant='secondary' onClick={() => { setPage((prev) => prev + 1) }}>Next</Button> : null}

                                            {((page === 3  && visionType === "Non Prescription") || (page === 4)) ? <Link className='btn btn-success btn-lg' to="/prescription-checkout" state={{ productProp: prescriptionOrderValues, selectedAddOn, quantity }}>Checkout</Link> : null}
                                        </div>

                                    </>


                                    : null)}

                            </div>
                        </div>

                    </Container>

                </Modal.Body>
                <ProgressBar now={page === 1 ? 25 : page === 2 ? 50 : page === 3 && visionType === "Non Prescription" ? 100 : page === 3 ? 75 : page === 4 ? 100 : 0} style={{ height: "10px", borderRadius: 0 }} />
                <Modal.Footer>

                    <div className='d-flex w-100 justify-content-between'>
                        <h2 className='fw-bold'>Subtotal: ₱{subTotal}</h2>

                        <Button variant="danger" onClick={(e) => closeModal(e)}>Close</Button>
                    </div>
                </Modal.Footer>

            </Modal>
        </>
    )
}
