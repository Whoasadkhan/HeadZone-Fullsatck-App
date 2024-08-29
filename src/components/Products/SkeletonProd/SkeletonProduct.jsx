
import React from "react";
import "./SkeletonProduct.scss";

const SkeletonProduct = () => {
    return (
        <div className="skeleton-card">
            <div className="skeleton-thumbnail"></div>
            <div className="skeleton-details">
                <div className="skeleton-line"></div>
                <div className="skeleton-line"></div>
            </div>
        </div>
    );
};

export default SkeletonProduct;
