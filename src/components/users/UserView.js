import { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { ProductCard } from '../products/ProductCard';
import { useValue } from '../../UserContext';

//compoments receives an object called "props", then we destructure the props object
export const UserView = ({productsData}) => {
    //const { productsData } = useValue();

    return (
        <Row>
            {
                productsData.map(product => {
                    return (
                        <ProductCard key={product._id} productProp={product} />
                    )
                })

            }
        </Row>

    )
}

