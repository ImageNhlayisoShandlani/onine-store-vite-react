//React Imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Custom Styles and Scripts
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

//Custom components
import './App.css'
import Header from './components/header/Header'
import Cart from './pages/cart/Cart';
import Home from './pages/home/Home';
import Product from './pages/products/Product';
import Footer from './components/footer/Footer';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useDispatch, useSelector} from 'react-redux';
import { setAuthUser } from './app/store';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Category from './pages/category/category';
import Account from './pages/user/Account';
import About from './pages/about/About';

function App() {
  const user = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    
    const authanticate = onAuthStateChanged(auth, (user) => {
      if(user){ dispatch(setAuthUser(user));}
      else {dispatch(setAuthUser(null));}
    });

    return () => authanticate();
  });
  return (
    <>
      <Router>
        <Header />
        <div className='container-fluid main--container'>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About/>} />
            <Route path='/product/:id' element={<Product/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>} />
            <Route path='/category/:category' element={<Category/>}/>
            <Route path='/account' element={!user ? <p>Please login to view this page</p> : <Account/>}/>
          </Routes>
        </div>
        <Footer/>
      </Router>
    </>
  )
}

export default App
