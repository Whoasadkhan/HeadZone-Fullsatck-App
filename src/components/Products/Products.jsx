import { useContext, useEffect, useState } from "react";
import "./Products.scss";
import Product from "./Product/Product";
import SkeletonProduct from "./SkeletonProd/SkeletonProduct";
import { Context } from "../../utils/context";

const Products = ({ innerPage, headingText }) => {
    const { homeProducts } = useContext(Context); // Use homeProducts instead of products
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (homeProducts.length > 0) {
            setLoading(false);
        }
    }, [homeProducts]); // Update dependency to homeProducts

    return (
        <div className="products-container">
            {!innerPage && <div className="sec-heading">{headingText}</div>}
            <div className={`products ${innerPage ? "innerPage" : ""}`}>
                {loading ? (
                    // Display skeletons while loading
                    Array.from({ length: homeProducts.length || 8 }).map((_, index) => (
                        <SkeletonProduct key={index} />
                    ))
                ) : (
                    homeProducts?.map((item) => (
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
