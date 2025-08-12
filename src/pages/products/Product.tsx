import { useDispatch, useSelector } from "react-redux";
import type ProductType from "../../models/productType";
import { Link, useParams } from "react-router-dom";

import './Product.css';
import { toast } from "react-toastify";
import { addToCart } from "../../app/store";
import type CartType from "../../models/cartType";

export default function Product() {
    const { id } = useParams();
    const products = useSelector((state: ProductType) => state.products);
    const product = products.find((data: ProductType) => data.id === Number(id));
    const cart = useSelector((state: any) => state.cart);
    const dispatch = useDispatch();
    if (!product) {
        return <p>Product not found</p>;
    }
    return <>

        <div className="content--body">

            <div className="container-fluid">
                <div className="breadcrumbs">
                    <Link to="/">Home</Link> &gt; <Link to="/products">Products</Link> &gt; {product.title}
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <img src={product.image} alt={product.title} className="img-fluid" loading="lazy" />
                    </div>
                    <div className="col-md-6">
                        <h1>{product.title}</h1>
                        <p className="category--text">Category: {product.category}</p>
                        <p>Price: R{product.price.toFixed(2)}</p>
                        <p>"
                            {product.description}
                            "</p>
                        <div className="product--detail__badge" style={{ backgroundColor: 'white', marginBottom: '1.5rem', fontWeight: 'bolder' }}>
                            <span className="" >{product?.rating?.rate} <i className="fa-solid fa-star" style={{ color: '#fdb912', fontSize: 22 }}></i> </span>
                            <p> <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>{product?.rating?.count} Reviews </a></p>
                        </div>
                        <button className="btn btn-secondary" onClick={(e) => {
                            e.preventDefault();

                            // if (!user){
                            //   toast.error("Please login to add items to the cart.");

                            //   //setTimeout(() => window.location.href = "/login", 3000);

                            //   return;
                            // }
                            const alreadyInCart = cart.find((item: any) => item.product.id === product.id);
                            try {
                                let productToAdd = product;
                                let cartItem: CartType = {
                                    id: productToAdd.id,
                                    title: productToAdd.title,
                                    price: productToAdd.price,
                                    quantity: 1,
                                    image: productToAdd.image,
                                    products: undefined,
                                    category: ""
                                };
                                dispatch(addToCart(cartItem));
                                toast.success(alreadyInCart
                                    ? "Increased product quantity in cart."
                                    : "Product added to cart!");
                            } catch (error) {
                                console.error("Error adding to cart:", error);
                            }
                            // alert(cart.length > 0 ? "Item added to cart" : "Cart is empty");
                        }}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>

    </>;
}