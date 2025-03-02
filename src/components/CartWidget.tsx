import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartWidget = () => {
  const { getTotalQuantity } = useCart();
  const quantity = getTotalQuantity();

  return (
    <Link to="/cart" className="relative cursor-pointer">
      <ShoppingCart className="w-6 h-6" />
      {quantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {quantity}
        </span>
      )}
    </Link>
  );
};

export default CartWidget;