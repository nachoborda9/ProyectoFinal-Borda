import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, Timestamp, writeBatch, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useCart } from '../context/CartContext';
import CheckoutForm, { CustomerData } from './CheckoutForm';
import Loader from './Loader';

const Checkout: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { cart, getTotalPrice, clear } = useCart();
  const navigate = useNavigate();
  
  const createOrder = async (customerData: CustomerData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Verificar stock antes de crear la orden
      const outOfStock: string[] = [];
      const batch = writeBatch(db);
      
      // Verificar stock de cada producto
      for (const item of cart) {
        const productRef = doc(db, 'products', item.id);
        const productSnapshot = await getDoc(productRef);
        
        if (productSnapshot.exists()) {
          const product = productSnapshot.data();
          const stockActual = product.stock;
          
          if (stockActual < item.quantity) {
            outOfStock.push(item.name);
          } else {
            // Actualizar stock
            batch.update(productRef, {
              stock: stockActual - item.quantity
            });
          }
        }
      }
      
      if (outOfStock.length > 0) {
        setError(`Productos sin stock suficiente: ${outOfStock.join(', ')}`);
        setLoading(false);
        return;
      }
      
      // Crear la orden
      const order = {
        buyer: {
          name: customerData.name,
          phone: customerData.phone,
          email: customerData.email
        },
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total: getTotalPrice(),
        date: Timestamp.fromDate(new Date())
      };
      
      // Guardar la orden en Firestore
      const ordersRef = collection(db, 'orders');
      const orderDoc = await addDoc(ordersRef, order);
      
      // Actualizar stock en Firestore
      await batch.commit();
      
      // Limpiar carrito y guardar ID de orden
      clear();
      setOrderId(orderDoc.id);
      
    } catch (error) {
      console.error("Error al crear la orden:", error);
      setError("Ocurrió un error al procesar tu compra. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Loader />
        <p className="text-center mt-4">Procesando tu orden...</p>
      </div>
    );
  }
  
  if (orderId) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">¡Gracias por tu compra!</h2>
          <p className="text-gray-600 mb-6">Tu orden ha sido procesada correctamente.</p>
          <div className="bg-gray-100 p-4 rounded mb-6">
            <p className="font-medium">ID de orden:</p>
            <p className="font-mono text-sm break-all">{orderId}</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    );
  }
  
  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No hay productos en el carrito</h2>
        <p className="text-gray-600 mb-6">Agrega productos antes de realizar el checkout.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
        >
          Volver a la tienda
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Resumen de compra</h2>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between">
                <span>{item.quantity}x {item.name}</span>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between items-center">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-xl font-bold text-blue-600">${getTotalPrice().toFixed(2)}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Datos de contacto</h2>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <CheckoutForm onConfirm={createOrder} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;