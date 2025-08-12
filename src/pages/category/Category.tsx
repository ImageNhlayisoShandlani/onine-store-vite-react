import { Link, NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./../home/Home.css"
import { useEffect } from "react";
import axios from "axios";
import { addToCart, setProducts } from "../../app/store";
import  { toast } from "react-toastify";
import type CartType from "../../models/cartType";
import ProductCard from "../../components/product/ProductItem";
import type ProductType from "../../models/productType";
export default function Category() {
    const { category } = useParams();
    const products = useSelector((state: any) => state.products);
    const cart = useSelector((state: any) => state.cart);
    const user = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    const getProducts = () => {
        axios.get("https://fakestoreapi.com/products")
            .then((response) => {
                dispatch(setProducts(response.data));
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }
    useEffect(() => {

        getProducts();
        //dispatch(setProducts(products));

    }, []);
    const filteredProducts = products.filter((product: any) => product.category === category);

    return (
        <div className="content--body">
            <div className="container-fluid">
                <h1 className="site--title">Category: {category}</h1>
                <div className="row products--row">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product: ProductType) => (
                            <ProductCard product={product}/>
                        ))
                    ) : (
                        <p>No products found in this category.</p>
                    )}
                </div>
            </div>
        </div>
    );
}