import React, { useContext, useState } from "react";
import { MdClose } from "react-icons/md";
import "./Search.scss";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../utils/context";

const Search = ({ setSearchModal }) => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const {homeProducts} = useContext(Context);
    
    const onChange = (e) => {
        setQuery(e.target.value);
    };

   const filterProducts = (products, query) => {
    if (!query) return products; // Return all products if query is empty
    return products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  let data = filterProducts(homeProducts, query);

    if (!query.length) {
        data = null;
    }
    console.log(data);
    console.log(query);



    return (
        <div className="search-modal">
            <div className="form-field">
                <input
                    autoFocus
                    type="text"
                    placeholder="Search for products"
                    value={query}
                    onChange={onChange}
                />
                <MdClose
                    className="close-btn"
                    onClick={() => setSearchModal(false)}
                />
            </div>
            <div className="search-result-content">
                {!data?.length && (
                    <div className="start-msg">
                        Start typing to see products you are looking for.
                    </div>
                )}
                <div className="search-results">
                    {data?.map((item) => (
                        <div
                            className="search-result-item"
                            key={item.id}
                            onClick={() => {
                                navigate("/product/" + item.title);
                                setSearchModal(false);
                            }}
                        >
                            <div className="image-container">
                                <img
                                    src={
                                        item.image
                                    }
                                />
                            </div>
                            <div className="prod-details">
                                <span className="name">
                                    {item.title}
                                </span>
                                <span className="desc">
                                    {item.desc}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;
