import { useEffect, useState } from "react";
import { Products, Navbar, Cart, Checkout } from "./Components/index";
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Switch, Route, Routes, BrowserRouter } from 'react-router-dom'
function App() {
  const [products, setproducts] = useState([])
  const [cart, setCart] = useState({})
  const [order, setOrder] = useState({})
  const [errorMessage, setErrorMessage] = useState("")


  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setproducts(data)
  }

  const fetchCart = async () => {

    setCart(await commerce.cart.retrieve())
  }

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  console.log(cart, "Cart")

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart)

  }


  const handleUpdateCartQty = async (productID, quantity) => {
    const { cart } = await commerce.cart.update(productID, { quantity })
    setCart(cart)

  }
  const handleRemoveFromCart = async (productID) => {
    const { cart } = await commerce.cart.remove(productID)
    setCart(cart)
  }

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty()
    setCart(cart)
  }
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh()
    setCart(newCart)
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
      setOrder(incomingOrder)
      refreshCart()
    } catch (error) {
      setErrorMessage(error.data.error.message)
    }
  }
  // console.log(cart.total_items,"Is cart coming")
  return (
    <div>

      <BrowserRouter>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route exact path="/" element={<Products products={products} onAddToCart={handleAddToCart} />} />

          <Route exact path="/cart" element={<Cart cart={cart} handleUpdateCartQty={handleUpdateCartQty} handleEmptyCart={handleEmptyCart} handleRemoveFromCart={handleRemoveFromCart} />} />
          <Route exact path="/checkout" element={<Checkout
            cart={cart}
            order={order}
            onCaptureCheckout={handleCaptureCheckout}
            erro={errorMessage}
          />} />
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
