import { useState, useEffect } from "react";
import { CardGroup } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { PreviewProducts } from "./PreviewProducts";
import { ProductLoader } from "./ProductLoader";

export const FeaturedProducts = () => {

  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeaturedProducts = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/products/featured`);
      const data = await res.json();

      if (data) {
        setPreviews(data)
        setLoading(false)
      }

    } catch (error) {
      console.log(error.message)
    }

  }

  useEffect(() => {

    fetchFeaturedProducts();

  }, [])

  return (
    <section className="py-5">
      {
        !loading ?
          <>
            {(previews.length < 0) ? <h2 className="text-center">No Products Added</h2> :

              <>
                <h2 className="text-center my-3 fw-bold">Featured Products</h2>
                <div className="container">
                  <div className="row justify-content-center">
                    {previews.map((preview) => {
                      return (
                        <PreviewProducts data={preview} breakPoint={2} key={preview._id} />
                      )

                    })}

                  </div>

                </div>

              </>
            }
          </>
          : <ProductLoader />

      }
    </section>



  )
}
