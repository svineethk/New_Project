import {Component} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem =>
          eachCartItem.id === id
            ? {...eachCartItem, quantity: eachCartItem.quantity - 1}
            : eachCartItem
        ),
      }))
    }
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem =>
        eachCartItem.id === id
          ? {...eachCartItem, quantity: eachCartItem.quantity + 1}
          : eachCartItem
      ),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const updatedCartList = this.state.cartList.filter(
      eachCartItem => eachCartItem.id !== id
    )
    this.setState({cartList: updatedCartList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const existingProduct = cartList.find(item => item.id === product.id)

    if (existingProduct) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item =>
          item.id === product.id
            ? {...item, quantity: item.quantity + product.quantity}
            : item
        ),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
  path="/"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>
<Route
  path="/products"
  element={
    <ProtectedRoute>
      <Products />
    </ProtectedRoute>
  }
/>
<Route
  path="/products/:id"
  element={
    <ProtectedRoute>
      <ProductItemDetails />
    </ProtectedRoute>
  }
/>
<Route
  path="/cart"
  element={
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  }
/>
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </CartContext.Provider>
    )
  }
}

export default App
