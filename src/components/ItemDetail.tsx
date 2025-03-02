import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductItem } from './Item';
import ItemCount from './ItemCount';
import { useCart } from '../context/CartContext';

interface ItemDetailProps {
  item: ProductItem;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ item }) => {
  const [quantityAdded, setQuantityAdded] = useState(0);
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleOnAdd = (quantity: number) => {
    setQuantityAdded(quantity);
    
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl
    }, quantity);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2">
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-96 object-cover"
          />
        </div>
        <div className="md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{item.name}</h2>
          <p className="text-gray-600 mb-6">{item.description}</p>
          <div className="mb-6">
            <span className="text-3xl font-bold text-blue-600">${item.price.toFixed(2)}</span>
            <span className="ml-2 text-sm text-gray-500">
              {item.stock > 0 ? `Stock disponible: ${item.stock}` : 'Sin stock'}
            </span>
          </div>
          
          {quantityAdded > 0 ? (
            <div className="space-y-4">
              <p className="text-green-600 font-semibold">
                ¡Agregaste {quantityAdded} {quantityAdded === 1 ? 'unidad' : 'unidades'} al carrito!
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => navigate('/cart')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
                >
                  Ir al carrito
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded"
                >
                  Seguir comprando
                </button>
              </div>
            </div>
          ) : (
            <ItemCount 
              stock={item.stock} 
              initial={1} 
              onAdd={handleOnAdd} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;