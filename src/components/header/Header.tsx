import './Header.css';
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

// This component renders a Bootstrap navbar for resposivenss 
export default function Header() {
    const cart = useSelector((state: any) => state.cart);
    const products = useSelector((state: any) => state.products);
    const user = useSelector((state: any) => state.auth);
    const productCategories = Array.from(new Set(products.map((product: any) => product.category)));

    useEffect(() => {}, [user]);
    return <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    <img src={logo} alt="Logo" loading='lazy' />
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                            >
                                HOME
                            </NavLink>
                        </li>

                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                SHOP BY CATEGORY
                            </a>
                            <ul className="dropdown-menu">

                                {productCategories.map((category: any, index: number) => (
                                    <li key={index}>
                                        <NavLink
                                            to={`/category/${category}`}
                                            className={({ isActive }) => isActive ? 'dropdown-item active' : 'dropdown-item'}
                                        >
                                            {category.toString().toUpperCase()}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/about"
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                            >
                                ABOUT US
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/cart"
                                className={({ isActive }) => isActive ? 'nav-link active d-flex align-items-center' : 'nav-link d-flex align-items-center'}
                            >
                                <i className="fa-solid fa-cart-shopping me-1"></i>
                                <span className="badge bg-secondary">{cart?.length}</span>
                            </NavLink>
                        </li>

                    </ul>

                    <div className="d-flex">
                        <div className="user">
                            { user === null ?
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                >
                                    <i className="fa-solid fa-user me-1"></i>
                                    Login
                                </NavLink>
                                : 
                                <NavLink
                                    to="/account"
                                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                >
                                    <i className="fa-solid fa-user me-1"></i>
                                    {user?.email}
                                </NavLink>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>

}
