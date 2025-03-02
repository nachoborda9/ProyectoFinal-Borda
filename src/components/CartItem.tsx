import React from 'react';
import { Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../context/CartContext';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  return (
    <div className="flex items-center py-4 border-b">
      <img 
        src={item.imageUrl} 
        alt={item.name} 
        className="w-20 h-20 object-cover rounded"
      />
      <div className="ml-4 flex-grow">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600">
          Cantidad: {item.quantity} x ${item.price.toFixed(2)}
        </p>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
        <button 
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700 mt-1"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;