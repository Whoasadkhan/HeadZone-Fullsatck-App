import { useEffect } from "react";
import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../FireBase/firebase"; // Import Firebase configuration
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  count,
} from "firebase/firestore";

export const Context = createContext();

const AppContext = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [homeProducts, setHomeProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [categoryTitle, setCategoryTitle] = useState("");

  const [cartSubTotal, setCartSubTotal] = useState(0);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  useEffect(() => {
    let count = 0;
    cartItems?.map((item) => (count += item.quantity));
    setCartCount(count);

    let subTotal = 0;
    cartItems.map(
      (item) => (subTotal += item.price * item.quantity)
    );
    setCartSubTotal(subTotal);
  }, [cartItems ]);
  
  // Fetch Categories from Firebase
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const q = query(collection(db, "category"));
        const querySnapshot = await getDocs(q);
        const categoriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched categories:", categoriesData); // Log data to check structure
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories from Firestore:", error);
      }
    };
    fetchCategories();
  }, []);
  
  // The main function that fetches products
  const fetchProducts = async ({ type, id, categoryId }) => {
    console.log(id);
    console.log(type);
    console.log(categoryId);
    try {
      let productsQuery;
      
      if (type === "home") {
        // Fetch all products for the home page
        productsQuery = query(collection(db, "products"));
      } else if (type === "category" && id) {
        // Fetch products by category
        productsQuery = query(
          collection(db, "products"),
          where("categories", "==", id)
        );
      } else if (type === "relatedProducts" && categoryId) {
        // Fetch products by relatedcategory
        console.log("Fetching related products for category:", categoryId);
        productsQuery = query(
          collection(db, "products"),
          where("categories", "==", categoryId)
        );
      } else if (type === "single" && id) {
        // Fetch a single product by its ID
        productsQuery = query(
          collection(db, "products"),
          where("title", "==", id)
        );
      }
      
      const querySnapshot = await getDocs(productsQuery);
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      // Update the correct state based on the type
      if (type === "home") {
        setHomeProducts(productsData);
      } else if (type === "category") {
        setCategoryProducts(productsData);
      } else if (type === "relatedProducts") {
        // Fetch products by related category
        const filteredProducts = productsData.filter(product => product.id !== id);
        setRelatedProducts(filteredProducts);
      } else if (type === "single") {
        setSingleProduct(productsData[0]); // Assuming there's only one product for this ID
        fetchProducts({
          type: "relatedProducts",
          categoryId: productsData[0].categories,
          id: productsData[0].id, // Pass the single product ID to exclude it
          
          
        } );
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  console.log(homeProducts);


  const handleAddToCart = (product, quantity) => {
    let items = [...cartItems];
    let index = items?.findIndex((p) => p.id === product?.id);
    if (index !== -1) {
      items[index].quantity += quantity;
    } else {
      product.quantity = quantity;
      items = [...items, product];
    }
    setCartItems(items);

    toast.success("Item added successfully!", {
      position: "bottom-right",
      autoClose: 3000, // 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored", // or "light" / "dark" for different themes
  });

  };

  const handleRemoveFromCart = (product) => {
    let items = [...cartItems];
    items = items?.filter((p) => p.id !== product?.id);
    setCartItems(items);
  };

  const handleCartProductQuantity = (type, product) => {
    let items = [...cartItems];
    let index = items?.findIndex((p) => p.id === product?.id);
    if (type === "inc") {
      items[index].quantity += 1;
    } else if (type === "dec") {
      if (items[index].quantity === 1) return;
      items[index].quantity -= 1;
    }
    setCartItems(items);
  };

  return (
    <Context.Provider
      value={{
        homeProducts,
        categoryProducts,
        singleProduct,
        categories,
        relatedProducts,
        fetchProducts,
        setCategories,
        categoryTitle,
        cartItems,
        setCartItems,
        handleAddToCart,
        cartCount,
        handleRemoveFromCart,
        showCart,
        setShowCart,
        handleCartProductQuantity,
        cartSubTotal,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
