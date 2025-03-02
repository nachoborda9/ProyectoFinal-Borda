import React, { useState } from 'react';

export interface CustomerData {
  name: string;
  phone: string;
  email: string;
  emailConfirm: string;
}

interface CheckoutFormProps {
  onConfirm: (data: CustomerData) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onConfirm }) => {
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    phone: '',
    email: '',
    emailConfirm: ''
  });

  const [errors, setErrors] = useState<Partial<CustomerData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerData({
      ...customerData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerData> = {};
    
    if (!customerData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }
    
    if (!customerData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    }
    
    if (!customerData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(customerData.email)) {
      newErrors.email = 'El email no es válido';
    }
    
    if (customerData.email !== customerData.emailConfirm) {
      newErrors.emailConfirm = 'Los emails no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onConfirm(customerData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre completo
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={customerData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Teléfono
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={customerData.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={customerData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>
      
      <div>
        <label htmlFor="emailConfirm" className="block text-sm font-medium text-gray-700">
          Confirmar Email
        </label>
        <input
          type="email"
          id="emailConfirm"
          name="emailConfirm"
          value={customerData.emailConfirm}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.emailConfirm && <p className="mt-1 text-sm text-red-600">{errors.emailConfirm}</p>}
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Confirmar Orden
      </button>
    </form>
  );
};

export default CheckoutForm;