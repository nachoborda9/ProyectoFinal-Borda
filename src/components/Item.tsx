import React from 'react';
import { Link } from 'react-router-dom';

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

interface ItemProps {
  item: ProductItem;
}

const Item: React.FC<ItemProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={item.imageUrl} 
        alt={item.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
        <p className="text-gray-600 mt-2 line-clamp-2">{item.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">${item.price.toFixed(2)}</span>
          <Link 
            to={`/item/${item.id}`} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Item;