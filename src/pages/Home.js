import React from 'react'
import { Banner } from '../components/Banner';
//import { Highlights } from '../components/Highlights';
import { FeaturedProducts } from '../components/products/FeaturedProducts';

export const Home = () => {
    const data = {
        title: "Your Vision is Our Mission.",
        content:"Explore Our Spectacular Collection of Stylish Eyeglasses and Sunglasses at Unbeatable Prices!",
        destination: "/products",
        label: "Visit Site",
        bannerClass:"bg-dark text-white"
    }
    return (
        <>
            
            <Banner data={data} />
            <FeaturedProducts />
           {/*  <Highlights /> */}
          
          
        </>
    )
}
