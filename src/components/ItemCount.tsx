import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface ItemCountProps {
  stock: number;
  initial: number;
  onAdd: (quantity: number) => void;
}

const ItemCount: React.FC<ItemCountProps> = ({ stock, initial, onAdd }) => {
  const [count, setCount] = useState(initial);

  const increment = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center mb-4">
        <button 
          onClick={decrement} 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l"
          disabled={count <= 1}
        >
          <Minus size={16} />
        </button>
        <span className="bg-gray-100 py-2 px-6">{count}</span>
        <button 
          onClick={increment} 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r"
          disabled={count >= stock}
        >
          <Plus size={16} />
        </button>
      </div>
      <button 
        onClick={() => onAdd(count)} 
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        disabled={stock === 0}
      >
        {stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
      </button>
    </div>
  );
};

export default ItemCount;