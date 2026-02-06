import React from 'react';
import { Product } from '../types';
import { Plus, Ban, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const isAvailable = product.inStock;

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover object-center transition-transform duration-500 ${isAvailable ? 'group-hover:scale-105' : 'grayscale opacity-80'}`}
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2 items-start">
          <div className="bg-white/90 backdrop-blur px-2 py-1 text-xs font-semibold rounded text-gray-800 uppercase tracking-wide">
            {product.category === 'smartphone' ? 'Téléphone' : 'Accessoire'}
          </div>
          {isAvailable ? (
            <div className="bg-green-500/90 backdrop-blur px-2 py-1 text-xs font-semibold rounded text-white uppercase tracking-wide flex items-center gap-1">
              <Check className="w-3 h-3" /> En stock
            </div>
          ) : (
            <div className="bg-red-500/90 backdrop-blur px-2 py-1 text-xs font-semibold rounded text-white uppercase tracking-wide flex items-center gap-1">
              <Ban className="w-3 h-3" /> Rupture
            </div>
          )}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
          <span className="text-lg font-bold text-blue-600">{product.price} DA</span>
        </div>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
          {product.description}
        </p>

        {product.category === 'smartphone' && (
          <div className="flex flex-wrap gap-2 mb-4 text-xs text-gray-600">
             <span className="bg-gray-100 px-2 py-1 rounded">{product.specs.screen}</span>
             <span className="bg-gray-100 px-2 py-1 rounded">{product.specs.camera}</span>
          </div>
        )}

        <button 
          onClick={() => isAvailable && onAddToCart(product)}
          disabled={!isAvailable}
          className={`w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg transition-colors active:scale-95 duration-150 ${
            isAvailable 
              ? 'bg-slate-900 text-white hover:bg-slate-800' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed active:scale-100'
          }`}
        >
          {isAvailable ? (
            <>
              <Plus className="h-4 w-4" />
              <span>Ajouter au panier</span>
            </>
          ) : (
            <span>Indisponible</span>
          )}
        </button>
      </div>
    </div>
  );
};
