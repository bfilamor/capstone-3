import React from "react";

//Creates a context object
// a context object as the name states, is a data type of an object that can be used to store information that can be shared to other components within the app
const ProductContext = React.createContext();


//the "Provider" component allows other components to consume/use the context object and supply the necessary information needed to the context object
export const ProductProvider = ProductContext.Provider;

export default ProductContext;