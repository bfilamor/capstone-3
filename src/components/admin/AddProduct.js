import { useEffect, useState } from "react"
import { Button, Modal, Form, FloatingLabel, CloseButton } from "react-bootstrap"
import Swal from "sweetalert2";
import { useValue } from "../../UserContext";
import FileBase from 'react-file-base64';

export const AddProduct = ({ productIdProp, fetchData }) => {
    //got fetchData by props drilling. this function came from the Products component then was passed into its child components

    const [productId, setProductId] = useState('');

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [stocks, setStocks] = useState(1);
    const [categoriesArray, setCategoriesArray] = useState([]);
    const [productPhoto, setProductPhoto] = useState('');

    const [showModal, setShowModal] = useState(false);

    const { productsData } = useValue();

    const openModal = () => {
        fetchData();
        const categoryMap = productsData.map((product) => {
            return product.category;
        })

        const filteredCategories = [...new Set(categoryMap)];
        setCategoriesArray(filteredCategories);
        setShowModal(true)
    }

    const closeModal = (e) => {
        e.preventDefault();
        setShowModal(false);
        setName('');
        setDescription('');
        setPrice(0);
        setCategory("");
        setBrand("")
        setStocks(1)
        setProductPhoto("");
    }

    const addProduct = (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price,
                category: category,
                isPrescription: category === "prescription" ? true : false,
                stocks: stocks,
                brand: brand,
                productPhoto: productPhoto
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data === true) {
                    Swal.fire({
                        title: 'Success!',
                        icon: "success",
                        text: "Product Sucessfully Added"
                    })

                    closeModal(e);
                    //reload products data every after product update
                    fetchData();
                } else {
                    Swal.fire({
                        title: 'Error!',
                        icon: "error",
                        text: "Please try again"
                    })

                    closeModal(e);
                }


            }).catch(error => { console.log(error.message) })

    }

    useEffect(() => {
        const categoryMap = productsData.map((product) => {
            return product.category;
        })

        const filteredCategories = [...new Set(categoryMap)];
        setCategoriesArray(filteredCategories);
    }, [])

    return (
        <>

            <div className="p-4">
                <Button variant="success" size="lg" onClick={() => openModal(productIdProp)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                </svg> Add Product</Button>

            </div>

            <Modal show={showModal}>
                <Form onSubmit={e => addProduct(e)}>
                    <div className='fw-bold fs-4 pt-3 pe-3 d-flex justify-content-end'><CloseButton onClick={(e) => closeModal(e)} /></div>
                    <Modal.Header>
                        <Modal.Title>Add Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        <FloatingLabel controlId="productName" label="Name" className="my-3">

                            <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} required />
                        </FloatingLabel>


                        <FloatingLabel controlId="productDescription" label="Description" className="my-3">

                            <Form.Control type="text" value={description} onChange={e => setDescription(e.target.value)} required />
                        </FloatingLabel>


                        <div className="card image-upload-card">
                            {productPhoto ? <img src={productPhoto} className="img-fluid" /> : null}
                            <div className="card-img-overlay d-flex align-items-center justify-content-center">
                                <div style={{ position: "relative", zIndex: 2 }}>
                                    <h3 className="text-center text-white">Upload Product Photo</h3>
                                </div>
                                <FileBase style={{ opacity: 0 }}
                                    type="file"
                                    multiple={false}
                                    onDone={({ base64 }) => { setProductPhoto(base64) }} />
                            </div>
                        </div>



                        <FloatingLabel controlId="productCategory" label="Category" className="my-3">

                            <Form.Select onChange={(e) => { setCategory(e.target.value); }}>
                                {categoriesArray.map((item) => {
                                    return (
                                        <option value={item} key={item} selected={item === category ? true : false}>{item}</option>
                                    )
                                })}
                            </Form.Select>
                        </FloatingLabel>

                        <FloatingLabel controlId="productBrand" label="Brand" className="my-3">

                            <Form.Control type="text" value={brand} onChange={e => setBrand(e.target.value)} required />
                        </FloatingLabel>

                        <FloatingLabel controlId="productStocks" label="Stocks" className="my-3">

                            <Form.Control type="number" value={stocks} onChange={e => setStocks(e.target.value)} required />
                        </FloatingLabel>

                        <FloatingLabel controlId="productPrice" label="Price" className="my-3">
                            <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} required />
                        </FloatingLabel>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={(e) => closeModal(e)}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </>

    )
}
