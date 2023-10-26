import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export const ActivateProduct = ({productIdProp, fetchData}) => {

    const activateProduct = (e,productIdProp) => {
        e.preventDefault();
        let token = localStorage.getItem("token");

        fetch(`${process.env.REACT_APP_API_URL}/products/${productIdProp}/activate`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data === true) {
                    Swal.fire({
                        title: 'Success!',
                        icon: "success",
                        text: "Product Sucessfully Activated"
                    }) 
                    fetchData();
                } else {
                    Swal.fire({
                        title: 'Error!',
                        icon: "error",
                        text: "Please try again"
                    })
                }

            }).catch(error => { console.log(error.message) })
    }
  return (
    <Button variant="success" sizes="sm" onClick={(e) => activateProduct(e,productIdProp)}>Activate</Button>
  )
}
