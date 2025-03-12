// src/pages/CartPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import Button from '../components/common/Button';
import { formatCurrency } from '../utils/formatCurrency';

const CartPage = () => {
  const { cart, total, updateQuantity, removeFromCart } = useCartContext();
  
  if (cart.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <div className="container">
          <h1>Your Cart</h1>
          <p>Your cart is empty.</p>
          <Link to="/">
            <Button variant="primary">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="cart-page">
      <div className="container">
        <h1>Your Cart</h1>
        
        <div className="cart-items">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id} className="cart-item">
                  <td className="cart-product">
                    <img 
                      src={item.imageUrl || '/assets/placeholder-images/product.jpg'} 
                      alt={item.name}
                      className="cart-product-image" 
                    />
                    <div className="cart-product-info">
                      <h3 className="cart-product-name">{item.name}</h3>
                    </div>
                  </td>
                  <td className="cart-price">{formatCurrency(item.price)}</td>
                  <td className="cart-quantity">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={e => updateQuantity(item.id, parseInt(e.target.value, 10))}
                      min="1"
                    />
                  </td>
                  <td className="cart-item-total">{formatCurrency(item.price * item.quantity)}</td>
                  <td className="cart-item-actions">
                    <button 
                      className="remove-item" 
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="cart-summary">
          <div className="cart-totals">
            <div className="cart-total-row">
              <span>Subtotal:</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="cart-total-row">
              <span>Shipping:</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="cart-total-row grand-total">
              <span>Total:</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
          
          <div className="cart-actions">
            <Link to="/">
              <Button variant="secondary">Continue Shopping</Button>
            </Link>
            <Link to="/checkout">
              <Button variant="primary">Proceed to Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;