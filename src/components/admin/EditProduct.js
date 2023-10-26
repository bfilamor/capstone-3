import { useEffect, useState } from "react"
import { Button, Modal, Form, FloatingLabel, CloseButton } from "react-bootstrap"
import Swal from "sweetalert2";
import { useValue } from "../../UserContext";
import FileBase from 'react-file-base64';

export const EditProduct = ({ productIdProp, fetchData }) => {
    //got fetchData by props drilling. this function came from the Products component then was passed into its child components

    const [productId, setProductId] = useState('');

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [stocks, setStocks] = useState(1);
    const [categoriesArray, setCategoriesArray] = useState([]);
    const [productPhoto, setProductPhoto] = useState("");

    const [showEdit, setShowEdit] = useState(false);

    const { productsData } = useValue();

    const openEdit = (productIdProp) => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${productIdProp}`)
            .then(res => res.json())
            .then(data => {
                //set productidProp as productId state 
                setProductId(productIdProp);
                setName(data.name);
                setDescription(data.description);
                setPrice(data.price);
                setBrand(data.brand);
                setStocks(data.stocks);
                setCategory(data.category);
                if (data.productPhoto) {
                    setProductPhoto(data.productPhoto);
                }

            })
        setShowEdit(true)
    }

    const closeEdit = (e) => {
        e.preventDefault();
        setShowEdit(false);
        setName('');
        setDescription('');
        setPrice(0);
        setCategory("");
        setBrand("")
        setStocks(1)
        setProductPhoto("");
    }

    const editProduct = (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
            method: "PUT",
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
                        text: "Product Sucessfully updated"
                    })

                    closeEdit(e);
                    //reload products data every after product update
                    fetchData();
                } else {
                    Swal.fire({
                        title: 'Error!',
                        icon: "error",
                        text: "Please try again"
                    })

                    closeEdit(e);
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
            <Button variant="primary" sizes="sm" onClick={() => openEdit(productIdProp)}>Edit</Button>
            <Modal show={showEdit}>
                <Form onSubmit={e => editProduct(e)}>
                    <div className='fw-bold fs-4 pt-3 pe-3 d-flex justify-content-end'><CloseButton onClick={(e) => closeEdit(e)} /></div>
                    <Modal.Header>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        <FloatingLabel controlId="productName" label="Name" className="my-3">

                            <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} required />
                        </FloatingLabel>


                        <div className="card image-upload-card bg-dark">
                            {productPhoto ? <img src={productPhoto} className="img-fluid" /> : null}
                            <div className="card-img-overlay d-flex align-items-center justify-content-center">
                                <div style={{ position: "relative", zIndex: 2 }}>
                                    <h3 className="text-center text-white">Update Product Photo</h3>
                                </div>
                                <FileBase style={{ opacity: 0 }}
                                    type="file"
                                    multiple={false}
                                    onDone={({ base64 }) => { setProductPhoto(base64) }} />
                            </div>
                        </div>

                        <FloatingLabel controlId="productDescription" label="Description" className="my-3">

                            <Form.Control type="text" value={description} onChange={e => setDescription(e.target.value)} required />
                        </FloatingLabel>


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
                        <Button variant="secondary" onClick={(e) => closeEdit(e)}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </>

    )
}
