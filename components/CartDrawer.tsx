import React from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout
}) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="cart-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" onClick={onClose} aria-hidden="true" />
      
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
        <div className="w-screen max-w-md pointer-events-auto">
          <div className="flex flex-col h-full bg-white shadow-xl">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 id="cart-title" className="text-lg font-semibold text-gray-900">Mon Panier</h2>
              <button 
                onClick={onClose} 
                className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                aria-label="Fermer le panier"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <X className="h-8 w-8 text-gray-400" aria-hidden="true" />
                  </div>
                  <p className="text-gray-500 text-lg">Votre panier est vide</p>
                  <button onClick={onClose} className="text-blue-600 hover:underline">
                    Retourner à la boutique
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex py-2">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">{item.price * item.quantity} €</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 capitalize">{item.category === 'smartphone' ? 'Téléphone' : 'Accessoire'}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="p-1 hover:bg-white rounded shadow-sm disabled:opacity-50"
                              disabled={item.quantity <= 1}
                              aria-label="Diminuer la quantité"
                            >
                              <Minus className="h-3 w-3" aria-hidden="true" />
                            </button>
                            <span className="font-medium min-w-[1.5rem] text-center" aria-label={`Quantité: ${item.quantity}`}>{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="p-1 hover:bg-white rounded shadow-sm"
                              aria-label="Augmenter la quantité"
                            >
                              <Plus className="h-3 w-3" aria-hidden="true" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            className="font-medium text-red-500 hover:text-red-600 flex items-center p-1 rounded hover:bg-red-50"
                            aria-label={`Supprimer ${item.name} du panier`}
                          >
                            <Trash2 className="h-4 w-4 mr-1" aria-hidden="true" />
                            Retirer
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-6 bg-gray-50">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                  <p>Total</p>
                  <p>{total} €</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500 mb-6">
                  Taxes et frais de livraison calculés à la commande.
                </p>
                <button
                  onClick={onCheckout}
                  className="w-full flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Commander
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};