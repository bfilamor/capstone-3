import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const PreviewProducts = ({ data, breakPoint }) => {
    const { name, description, price, _id, productPhoto } = data;
    return (
        <div className='col-lg-3 my-3'>
            <Card className='bg-light cardHighlight h-100'>

                <div className='img-box overflow-hidden'>
                    {productPhoto ? <img src={productPhoto} className='img-fluid d-block w-100' /> : <Card.Img variant="top" src="https://placehold.co/200" />}
                </div>

                <Card.Body>

                    <Card.Title>
                        <Link style={{ textDecoration: "none" }} className='fw-bold fs-4 text-dark text-capitalize' to={`/products/single/${_id}`}>{name}</Link>

                    </Card.Title>
                    <p className='fs-5 fw-light'>{description}</p>
                    <h5 className='fs-4'>₱{price}</h5>
                </Card.Body>
                <Card.Footer>

                    <Link to={`/products/single/${_id}`} className='btn btn-dark d-block'>Details</Link>
                </Card.Footer>
            </Card>

        </div>

    )
}
