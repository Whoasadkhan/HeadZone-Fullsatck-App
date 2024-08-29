import { useContext, useEffect, useState } from "react";
import { Context } from "../../utils/context";
import { useParams } from "react-router-dom";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaPinterest,
    FaCartPlus,
} from "react-icons/fa";
import "./SingleProduct.scss";
import { type } from "@testing-library/user-event/dist/type";

const SingleProduct = () => {
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const { fetchProducts, singleProduct, handleAddToCart } = useContext(Context);

    useEffect(() => {
        fetchProducts({type:"single"}, id);
    }, [id]);

    const decrement = () => {
        setQuantity((prevState) => (prevState === 1 ? 1 : prevState - 1));
    };

    const increment = () => {
        setQuantity((prevState) => prevState + 1);
    };


    return (
        <div className="single-product-main-content">
            <div className="layout">
                <div className="single-product-page">
                    <div className="left">
                        <img src={singleProduct[0].image} alt={singleProduct.title} />
                    </div>
                    <div className="right">
                        <span className="name">{singleProduct[0].title}</span>
                        <span className="price">&#8377;{singleProduct[0].price}</span>
                        <span className="desc">{singleProduct[0].description}</span>

                        <div className="cart-buttons">
                            <div className="quantity-buttons">
                                <span onClick={decrement}>-</span>
                                <span>{quantity}</span>
                                <span onClick={increment}>+</span>
                            </div>
                            <button
                                className="add-to-cart-button"
                                onClick={() => {
                                    handleAddToCart(singleProduct[0], quantity);
                                    setQuantity(1);
                                }}
                            >
                                <FaCartPlus size={20} />
                                ADD TO CART
                            </button>
                        </div>

                        <span className="divider" />
                        <div className="info-item">
                            <span className="text-bold">
                                Category:{" "}
                                <span>{singleProduct[0].categories}</span>
                            </span>
                            <span className="text-bold">
                                Share:
                                <span className="social-icons">
                                    <FaFacebookF size={16} />
                                    <FaTwitter size={16} />
                                    <FaInstagram size={16} />
                                    <FaLinkedinIn size={16} />
                                    <FaPinterest size={16} />
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                <RelatedProducts
                    categoryId={singleProduct[0].categories}
                />
            </div>
        </div>
    );
};

export default SingleProduct;
