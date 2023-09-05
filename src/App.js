import './App.css';
import Navbar from './components/Navber/Navbar';
import Header from './components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Desserts from './components/product/Desserts';
import Drinks from './components/product/Drinks';
import Others from './components/product/Others';
import Home from './components/Home/Home';
import { useState } from 'react';
import Cart from './components/Cart/Cart';
import Footer from './components/function/Footer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify";




function App() {

  const [cart, setcart] = useState([])

  const card = (item) => {
    // ตรวจสอบว่าสินค้าเป็น best seller หรือไม่
    const BestSeller = item.BestSeller === true;

    return (
      <li key={item.id}>
        <div className={`card ${BestSeller ? 'best-seller' : ''}`}>
          {BestSeller && <div className="best-seller-badge">Best Seller</div>}
          <img src={item.image} alt={item.name} />
          <div className="card-body">
            <h2>{item.name}</h2>
            <p>{item.price} Baht</p>
            <button className="btn-cart" onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </div>
        </div>
      </li>
    );
  };

  const addToCart = (item) => {
    const isItemInCart = cart.some((cartItem) => cartItem.id === item.id);
  
    if (isItemInCart) {
      toast.warning("This product is already in cart.", {
        position: "top-center",
        autoClose: 2000, 
      });
    } else {

      setcart((cart) => [...cart, item]);
      toast.success(`Add ${item.name} to cart.`, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  
  const removecart = (id) => {
    const result = cart.filter(item => item.id !== id)
    setcart(result)
  }


  const calculateTotalPrice = (products) => {
    let totalPrice = 0;
    for (const product of products) {
      totalPrice += product.price * product.quantity;
    }
    return totalPrice;
  }

  const calculateTotalQuantity = (products) => {
    let totalQuantity = 0;
    for (const product of products) {
      totalQuantity += product.quantity;
    }
    return totalQuantity;
  }

  const toggleQuantity = (id, type) => {
    let updateProduct = cart.map((item) => {
      if (item.id === id) {
        if (type === "increment") {
          return {
            ...item,
            quantity: item.quantity < 8 ? item.quantity + 1 : item.quantity
          }
        }
        if (type === "decrement") {
          return {
            ...item,
            quantity: item.quantity - 1
          }
        }
      }
      return item
    }).filter((item) => item.quantity !== 0)
    setcart(updateProduct)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Navbar calculateTotalQuantity={calculateTotalQuantity} cart={cart} />
        <Header />
        <Routes>
          <Route path='/' element={<Home card={card} />}></Route>
          <Route path='/Drinks' element={<Drinks card={card} />}></Route>
          <Route path='/Desserts' element={<Desserts card={card} />}></Route>
          <Route path='/Others' element={<Others />}></Route>
          <Route path='/Cart' element={<Cart cart={cart} removecart={removecart} calculateTotalPrice={calculateTotalPrice} toggleQuantity={toggleQuantity} />}></Route>
        </Routes>
        <Footer />

      </BrowserRouter>

    </div>
  );
}

export default App;

