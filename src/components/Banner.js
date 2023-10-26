import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Banner = ({data}) => {
	const {title, content, destination, label, bannerClass} = data;

    return (
        <section className={bannerClass}>
            <Container>
                <Row className='justify-content-center'>
                    <Col className="p-5 col-lg-8 text-center">
                        <h1 className='fw-bold'>{title}</h1>
                        <p className='fs-4 py-3'>{content}</p>
                        <Link className="btn btn-primary fs-4" to={destination} >{label}</Link>
                    </Col>
                </Row>

            </Container>
        </section>

    )
}



