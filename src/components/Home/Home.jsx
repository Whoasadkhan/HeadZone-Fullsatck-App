import React, { useEffect, useContext } from "react";
import "./Home.scss";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";
import { Context } from "../../utils/context";

const Home = () => {
    const { homeProducts, fetchProducts , categories } =
        useContext(Context);
    
    
        useEffect(() => {
            fetchProducts({ type: "home" });
        }, []);
    
    
    

    return (
        <div>
            <Banner />
            <div className="main-content">
                <div className="layout">
                    <Category categories={categories} />
                    <Products
                        headingText="Popular Products"
                        products={homeProducts}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
