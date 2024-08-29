import React from "react";
import { useNavigate } from "react-router-dom";
import "./Product.scss";
import { TbH1 } from "react-icons/tb";

const Product = ({ data, id }) => {
    const navigate = useNavigate();
    return (

        
        <div
            className="product-card"
            onClick={() => navigate("/product/" + data.title)}
        >
            <div className="thumbnail">
                <img
                    src={
                       data.image
                    }
                />
            </div>
            <div className="prod-details">
                <span className="name">{data.title}</span>
                <span className="price">&#8377;{data.price}</span>
            </div>
        </div>
        
    );
};

export default Product;
