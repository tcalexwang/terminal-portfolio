import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Mechanical Keyboard',
    price: 159.99,
    description: 'Cherry MX switches, RGB backlight'
  },
  {
    id: 2,
    name: 'Vim Mousepad',
    price: 24.99,
    description: 'Large mousepad with vim commands'
  },
  {
    id: 3,
    name: 'Terminal Mug',
    price: 19.99,
    description: 'Color-changing terminal design'
  },
  {
    id: 4,
    name: 'Developer Socks',
    price: 12.99,
    description: 'Binary pattern comfort socks'
  }
];

type Props = {
  mode: 'NORMAL' | 'COMMAND' | 'INSERT';
  onProductSelect: (name: string) => void;
};

export default function ProductList({ mode, onProductSelect }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Handle initial product selection
  useEffect(() => {
    if (products.length > 0) {
      onProductSelect(products[0].name);
    }
  }, [onProductSelect]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (mode !== 'NORMAL') return;

      switch (e.key.toLowerCase()) {
        case 'j':
        case 'arrowdown':
          e.preventDefault();
          setSelectedIndex(prev => {
            const newIndex = (prev + 1) % products.length;
            onProductSelect(products[newIndex].name);
            return newIndex;
          });
          break;
        case 'k':
        case 'arrowup':
          e.preventDefault();
          setSelectedIndex(prev => {
            const newIndex = prev === 0 ? products.length - 1 : prev - 1;
            onProductSelect(products[newIndex].name);
            return newIndex;
          });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, onProductSelect]);

  return (
    <div>
      <h2 className="text-xl mb-4">Products</h2>
      <div className="space-y-2">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`p-2 border ${
              selectedIndex === index 
                ? 'border-green-500 bg-green-500 bg-opacity-20' 
                : 'border-green-800'
            }`}
          >
            <div className="flex items-center">
              {selectedIndex === index && (
                <ChevronRight className="w-4 h-4 mr-2" />
              )}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold">{product.name}</span>
                  <span>${product.price}</span>
                </div>
                <p className="text-green-600 text-sm">{product.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-green-600">
        {mode === 'NORMAL' ? (
          'Use j/k to navigate • i to enter insert mode'
        ) : mode === 'INSERT' ? (
          'Press ESC to return to normal mode'
        ) : (
          'Enter command'
        )}
      </div>
    </div>
  );
}