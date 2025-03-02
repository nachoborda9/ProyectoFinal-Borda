import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import ItemDetail from './ItemDetail';
import { ProductItem } from './Item';
import Loader from './Loader';

const ItemDetailContainer: React.FC = () => {
  const [item, setItem] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { itemId } = useParams<{ itemId: string }>();

  useEffect(() => {
    setLoading(true);
    
    if (!itemId) {
      setError(true);
      setLoading(false);
      return;
    }

    const productRef = doc(db, 'products', itemId);
    
    getDoc(productRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          setItem({
            id: snapshot.id,
            ...snapshot.data()
          } as ProductItem);
        } else {
          setError(true);
        }
      })
      .catch(error => {
        console.error("Error fetching product:", error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [itemId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Loader />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-600">No se pudo encontrar el producto solicitado.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <ItemDetail item={item} />
    </div>
  );
};

export default ItemDetailContainer;