import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../utils/context";
import SkeletonCategory from "./SkeletonCategory/SkeletonCategory";
import "./Category.scss";

const Category = () => {
    const { categories } = useContext(Context);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (categories.length > 0) {
            setLoading(false);
        }
    }, [categories]);

    const navigate = useNavigate();
    

    return (
        <div className="shop-by-category">
            <div className="categories">
                {loading ? (Array(4).fill(<SkeletonCategory />))
                :
                   ( categories.map((item) => (
                    <div
                        key={item.id}
                        className="category"
                        onClick={() => navigate(`/category/${item.title}`)}
                    >
                        <img
                            src={item.image} 
                            alt={item.title} 
                        />
                    </div>)
                ))}
            </div>
        </div>
    );
};

export default Category;
