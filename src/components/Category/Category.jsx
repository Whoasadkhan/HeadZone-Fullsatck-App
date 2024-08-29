import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Context } from "../../utils/context";
import Products from "../Products/Products";
import "./Category.scss";
const Category = () => {
    const { id } = useParams();
    console.log(id)
    const { categoryProducts, fetchProducts } = useContext(Context);

    useEffect(() => {
        fetchProducts({ type: "category", id }
        );
        console.log("cat"+id)
    }, []);



    return (
        <div className="category-main-content">
        <div className="layout">
            <div className="category-title">{id}</div>
            <Products innerPage={true} products={categoryProducts} />
        </div>
    </div>
    );
};

export default Category;
