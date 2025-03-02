import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import ItemList from './ItemList';
import { ProductItem } from './Item';
import Loader from './Loader';

interface ItemListContainerProps {
  greeting: string;
}

const ItemListContainer: React.FC<ItemListContainerProps> = ({ greeting }) => {
  const [items, setItems] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams<{ categoryId: string }>();

  useEffect(() => {
    setLoading(true);
    
    const productsRef = collection(db, 'products');
    const productsQuery = categoryId 
      ? query(productsRef, where('category', '==', categoryId))
      : productsRef;
    
    getDocs(productsQuery)
      .then(snapshot => {
        const productsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ProductItem[];
        
        setItems(productsData);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{greeting}</h1>
        {categoryId && (
          <h2 className="text-xl text-gray-600">Categoría: {categoryId}</h2>
        )}
      </div>
      
      {loading ? (
        <Loader />
      ) : items.length > 0 ? (
        <ItemList items={items} />
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No hay productos disponibles</p>
        </div>
      )}
    </div>
  );
};

export default ItemListContainer;