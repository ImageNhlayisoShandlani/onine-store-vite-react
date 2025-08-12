import { useEffect } from "react";
import heroImage from "../../assets/main.jpg";

import "./Home.css"
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type ProductType from "../../models/productType";
import { setProducts, addToCart } from "../../app/store";
import type CartType from "../../models/cartType";
import { toast } from "react-toastify";
import ProductCard from "../../components/product/ProductItem";

export default function Home() {

  const products = useSelector((state: any) => state.products);
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
  }, []);
  return (

    products?.length <= 0 ?
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>

      :

      <>

        <div className='hero--home'>
          <div className='hero--home__text'>
            <h2 style={{color: '#fff'}}>Join Our Movement Now to Stay Up to Date</h2>
            <p style={{color: '#cccc'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusan
              tium rerum quasi et, minima, quae eligendi fuga magni, aperiam dolorem velit illo quaerat
              iure nobis, optio eos cupiditate sapiente pariatur quia deleniti.

            </p>
            <button className='btn btn-primary' style={{backgroundColor: '#fdb912', color: '#000', borderColor: '#fdb912'}}>Get Started</button>
          </div>
          <div className='hero--home__image'>
            <img src={heroImage} alt="Logo" loading="lazy" />
          </div>
        </div>

        <div className="content--body">
          <div className="site--title">
            <h1>View Our Products</h1>
          </div>


          <div className="container-fluid">
            <div className="row products--row">

              {products?.map((product: ProductType) => (
                <ProductCard product={product}/>
                ))}
            </div>
          </div>
        </div>

      </>
  );
}