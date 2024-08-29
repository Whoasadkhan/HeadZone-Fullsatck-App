import React from "react";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../utils/context";

import Products from "../../Products/Products";

const RelatedProducts = ({ categoryId }) => {
    const { products,  fetchProductsByCategoryId } = useContext(Context);
    
    useEffect(() => {
        fetchProductsByCategoryId(categoryId);
    }, [categoryId, fetchProductsByCategoryId]);

    return (
        <div className="related-products">
            <Products headingText="Related Products" products={products} />
        </div>
    );
};

export default RelatedProducts;
