// src/components/store/CartWidget.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';
// import { formatCurrency } from '../../utils/formatCurrency';
import { formatCurrency } from '../../utils';

const CartWidget = () => {
  const { cart, total } = useCartContext();
  
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="cart-widget">
      <Link to="/cart" className="cart-link">
        <div className="cart-icon">
          <span className="cart-count">{itemCount}</span>
        </div>
        <div className="cart-total">
          {formatCurrency(total)}
        </div>
      </Link>
    </div>
  );
};

export default CartWidget;