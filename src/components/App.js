import React from 'react';
import Aside from './Aside';
import Products from './Products';
import Cart from './Cart';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activeSizes: [],
      activeOrder: 'default',
      cart: {},
      isCartOpen:false
    };
  }
  
  handleSortBySize = (event) => {
    let { value } = event.target;
    let sizes = this.state.activeSizes;
    if (sizes.indexOf(value) === -1) {
      sizes.push(value);
    } else {
      sizes.splice(sizes.indexOf(value), 1);
    }
    this.setState({
      activeSizes: sizes,
    });
  };
  handleSortByPrice = (event) => {
    this.setState({
      activeOrder: event.target.value,
    });
  };
  addToCart = (index) => {
    let cartItems = this.state.cart;
    let keys = Object.keys(cartItems);
    if (keys.indexOf(String(index)) !== -1) {
      cartItems[index] = Number(cartItems[index]) + 1;
      this.setState((prevState) => ({
        cart: cartItems,
        isCartOpen:true
      }));
    } else {
      cartItems[index] = 1;
      this.setState({
        cart: cartItems,
        isCartOpen:true
      });
    }
  };
  decreaseQuantity = (index) => {
    let cartItems = this.state.cart;
    if (cartItems[index] > 1) {
      cartItems[index] = Number(cartItems[index]) - 1;
      this.setState((prevState) => ({
        cart: cartItems,
      }));
    } else {
      return;
    }
  };
  removeFromCart = (index) => {
    let cartItems = this.state.cart;
    delete cartItems[index]
      this.setState((prevState) => ({
        cart: cartItems,
      }));
  };
  handleCartToggle = () => {
    this.setState((prevState)=>({
      isCartOpen: !prevState.isCartOpen
    }))
  }
 
  render() {
    return (
      <main className="flex container">
        <Aside state={this.state} handleSortBySize={this.handleSortBySize} />
        <Products
          state={this.state}
          handleSortByPrice={this.handleSortByPrice}
          addToCart={this.addToCart}
        />
        <Cart
          state={this.state}
          addToCart={this.addToCart}
          decreaseQuantity={this.decreaseQuantity}
          removeFromCart = {this.removeFromCart}
          handleCartToggle = {this.handleCartToggle}
        />
      </main>
    );
  }
}

export default App;
