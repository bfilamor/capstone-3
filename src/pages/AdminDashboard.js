import { useEffect } from 'react';
import { useValue } from '../UserContext';
import { Navigate } from 'react-router-dom';
import { AdminView } from '../components/admin/AdminView';
import { Container, Nav, Tab } from 'react-bootstrap';
import { AdminTools } from '../components/admin/AdminTools';
import { ManageOrders } from '../components/admin/ManageOrders';

export const AdminDashboard = () => {

    const { user, fetchData, getCart, loading, setSelectedAddOn } = useValue();

    useEffect(() => {
        //invoke on every reload
        fetchData();
    }, [])

    return (
        <>
            <Tab.Container defaultActiveKey="first">
                <div className='row m-0'>
                    <div className='col-lg-3 min-vh-100  bg-dark text-white' id="dashBoardSideBar">
                        <div className='py-4 p-3 position-sticky top-0'>
                            <h2 className='mb-5'>Admin Dashboard</h2>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link className='text-white fs-5' eventKey="first">Products</Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link className='text-white fs-5' eventKey="second">Manage Orders</Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link className='text-white fs-5' eventKey="third">Admin Tools</Nav.Link>
                                </Nav.Item>
                            </Nav>

                        </div>


                    </div>

                    <div className='col-lg-9'>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <AdminView />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <ManageOrders />
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <AdminTools />
                            </Tab.Pane>
                        </Tab.Content>
                    </div>
                </div>
            </Tab.Container>


        </>


    )
}
