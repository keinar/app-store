import React, { Component } from "react";
import Menu from "./svg/bars-solid.svg";
import Close from "./svg/times-solid.svg";
import CartIcon from "./svg/shopping-cart-solid.svg";
import { Link } from "react-router-dom";
import './css/Header.css'
import {DataContext} from './Context'

export class Header extends Component {
  static contextType = DataContext;
state = {
    toggle: false
}

menuToggle = () => {
    this.setState({toggle: !this.state.toggle})
}

  render() {
      const {toggle} = this.state;
      const {cart} = this.context;
    return (
      <header>
 
        <div className="menu" onClick={this.menuToggle}>
          <img src={Menu} alt="menu" width="20px" />
        </div>

        <div className="logo">
          <h1> <Link to="/">Keinar Store</Link> </h1>
        </div>

        <nav>
            <ul className={toggle ? "toggle": ""}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/product">Shop</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/login">Login / Register </Link></li>
                <li className="close" onClick={this.menuToggle}>
                <img src={Close} alt="close" width="20px" />
                </li>
            </ul>
            <div className="nav-cart">
                <span>{cart.length}</span>
                <Link to="/Cart">
                      <img src={CartIcon} alt="cart" width="20px" />
                </Link>
            
            </div>
        </nav>
      </header>
    );
  }
}

export default Header;
