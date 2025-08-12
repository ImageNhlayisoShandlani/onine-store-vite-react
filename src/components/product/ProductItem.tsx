import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../app/store";
import type CartType from "../../models/cartType";
import type ProductType from "../../models/productType";
import { useDispatch, useSelector } from "react-redux";

export default function ProductCard({product}: ProductType) {
    const cart = useSelector((state: any) => state.cart);
    const dispatch = useDispatch();
    return <div className="col-md-4 product--card" key={product.id}>
        <div className="product--image">
            <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} />
                <div className="product--card__badge" style={{ backgroundColor: 'black', color: '#fdb912' }}>
                    <span className="" >{product?.rating?.rate} <i className="fa-solid fa-star"></i></span>
                </div>
            </Link>
        </div>

        <div className="product--information">
            <h6 className="product--title">{product?.title}</h6>
            <p>{product?.category}</p>
            <div className="product--price">
                <span className="price"> <span className="product--currency">R</span> {product?.price?.toFixed(2)}</span>
            </div>
            <a
                className="btn btn-secondary"
                href="#"
                onClick={(e) => {
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
                }}
            >
                Add to Cart
            </a>
        </div>
    </div>
}