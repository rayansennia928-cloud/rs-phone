import React from 'react';
import { ShoppingCart, Package, Headphones, Smartphone, Info } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, currentView, onChangeView }) => {
  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200" role="navigation" aria-label="Navigation principale">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onChangeView('home')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onChangeView('home')}
            aria-label="Retour à l'accueil RS Phone"
          >
            <Smartphone className="h-8 w-8 text-blue-600" aria-hidden="true" />
            <span className="ml-2 text-xl font-bold text-gray-900">RS Phone</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onChangeView('home')}
              className={`flex items-center text-sm font-medium transition-colors hover:text-blue-600 ${currentView === 'home' ? 'text-blue-600' : 'text-gray-600'}`}
              aria-current={currentView === 'home' ? 'page' : undefined}
            >
              <Smartphone className="h-4 w-4 mr-1" aria-hidden="true" />
              Smartphones
            </button>
            <button 
              onClick={() => onChangeView('accessories')}
              className={`flex items-center text-sm font-medium transition-colors hover:text-blue-600 ${currentView === 'accessories' ? 'text-blue-600' : 'text-gray-600'}`}
              aria-current={currentView === 'accessories' ? 'page' : undefined}
            >
              <Headphones className="h-4 w-4 mr-1" aria-hidden="true" />
              Accessoires
            </button>
            <button 
              onClick={() => onChangeView('tracking')}
              className={`flex items-center text-sm font-medium transition-colors hover:text-blue-600 ${currentView === 'tracking' ? 'text-blue-600' : 'text-gray-600'}`}
              aria-current={currentView === 'tracking' ? 'page' : undefined}
            >
              <Package className="h-4 w-4 mr-1" aria-hidden="true" />
              Suivi de commande
            </button>
            <button 
              onClick={() => onChangeView('about')}
              className={`flex items-center text-sm font-medium transition-colors hover:text-blue-600 ${currentView === 'about' ? 'text-blue-600' : 'text-gray-600'}`}
              aria-current={currentView === 'about' ? 'page' : undefined}
            >
              <Info className="h-4 w-4 mr-1" aria-hidden="true" />
              À propos
            </button>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center">
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              aria-label={`Panier, ${cartCount} articles`}
            >
              <ShoppingCart className="h-6 w-6" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
