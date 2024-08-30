import React from "react";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../utils/context";

import Products from "../../Products/Products";
import { type } from "@testing-library/user-event/dist/type";

const RelatedProducts = () => {
    const { relatedProducts } = useContext(Context);
    console.log(relatedProducts)

    return (
        <div className="related-products">
            <Products headingText="Related Products" products={relatedProducts} />
        </div>
    );
};

export default RelatedProducts;
