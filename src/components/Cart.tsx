import React from 'react';
import { ShoppingCart } from 'lucide-react';

export default function Cart() {
  return (
    <div>
      <h2 className="text-xl mb-4">Shopping Cart</h2>
      <div className="flex flex-col items-center justify-center h-48 border border-green-800">
        <ShoppingCart className="w-8 h-8 mb-2" />
        <p>Cart is empty</p>
        <p className="text-sm text-green-600 mt-2">
          Use :products to browse items
        </p>
      </div>
    </div>
  );
}