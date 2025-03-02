import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import { ShoppingBag } from 'lucide-react';

const Cart: React.FC = () => {
  const { cart, removeItem, clear, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h2>
        <p className="text-gray-600 mb-6">¿No sabes qué comprar? ¡Miles de productos te esperan!</p>
        <Link 
          to="/" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
        >
          Ir a comprar
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Tu Carrito</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          {cart.map(item => (
            <CartItem 
              key={item.id} 
              item={item} 
              onRemove={removeItem} 
            />
          ))}
        </div>
        
        <div className="flex justify-between items-center py-4 border-t border-b">
          <span className="text-xl font-bold">Total:</span>
          <span className="text-2xl font-bold text-blue-600">${getTotalPrice().toFixed(2)}</span>
        </div>
        
        <div className="mt-8 flex justify-between">
          <button 
            onClick={clear}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded"
          >
            Vaciar carrito
          </button>
          <Link 
            to="/checkout" 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
          >
            Finalizar compra
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;