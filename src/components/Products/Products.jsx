import { useContext, useEffect, useState } from "react";
import "./Products.scss";
import Product from "./Product/Product";
import SkeletonProduct from "./SkeletonProd/SkeletonProduct";
import { Context } from "../../utils/context";

const Products = ({ innerPage, headingText, products }) => {  // Pass products as a prop
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (products.length > 0) {
            setLoading(false);
        }
    }, [products]); // Update dependency to products

    return (
        <div className="products-container">
            {!innerPage && <div className="sec-heading">{headingText}</div>}
            <div className={`products ${innerPage ? "innerPage" : ""}`}>
                {loading ? (
                    // Display skeletons while loading
                    Array.from({ length: products.length || 8 }).map((_, index) => (
                        <SkeletonProduct key={index} />
                    ))
                ) : (
                    products?.map((item) => (
                        <Product
                            key={item.id}
                            id={item.id}
                            data={item}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Products;
