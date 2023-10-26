import React from 'react'
import { Banner } from '../components/Banner'

export const Error = () => {
    const data = {
        title: "404 - Not found",
        content: "The page you are looking for cannot be found",
        destination: "/",
        label: "Back home",
        bannerClass:"bg-white"
    }
    return (
        <Banner data={data} />
    )
}
