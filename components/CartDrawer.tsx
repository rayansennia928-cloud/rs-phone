import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, ArrowLeft, CreditCard } from 'lucide-react';
import { CartItem, CustomerInfo } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: (info: CustomerInfo) => void;
  isProcessing: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout,
  isProcessing
}) => {
  const [step, setStep] = useState<'cart' | 'details'>('cart');
  const [formData, setFormData] = useState<CustomerInfo>({
    name: '',
    email: '',
    address: ''
  });

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckout(formData);
  };

  const handleClose = () => {
    setStep('cart'); // Reset step on close
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="cart-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" onClick={handleClose} aria-hidden="true" />
      
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
        <div className="w-screen max-w-md pointer-events-auto">
          <div className="flex flex-col h-full bg-white shadow-xl">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-slate-50">
              <div className="flex items-center gap-2">
                {step === 'details' && (
                  <button 
                    onClick={() => setStep('cart')}
                    className="p-1 -ml-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-200"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                )}
                <h2 id="cart-title" className="text-lg font-semibold text-gray-900">
                  {step === 'cart' ? 'Mon Panier' : 'Vos Coordonnées'}
                </h2>
              </div>
              <button 
                onClick={handleClose} 
                className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                aria-label="Fermer le panier"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {step === 'cart' ? (
                // --- STEP 1: CART ITEMS ---
                cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <X className="h-8 w-8 text-gray-400" aria-hidden="true" />
                    </div>
                    <p className="text-gray-500 text-lg">Votre panier est vide</p>
                    <button onClick={handleClose} className="text-blue-600 hover:underline">
                      Retourner à la boutique
                    </button>
                  </div>
                ) : (
                  <ul className="space-y-6">
                    {cartItems.map((item) => (
                      <li key={item.id} className="flex py-2 animate-fade-in">
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
                              <p className="ml-4">{item.price * item.quantity} DA</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 capitalize">{item.category === 'smartphone' ? 'Téléphone' : 'Accessoire'}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                              <button 
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="p-1 hover:bg-white rounded shadow-sm disabled:opacity-50"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="font-medium min-w-[1.5rem] text-center">{item.quantity}</span>
                              <button 
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="p-1 hover:bg-white rounded shadow-sm"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.id)}
                              className="font-medium text-red-500 hover:text-red-600 flex items-center p-1 rounded hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Retirer
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )
              ) : (
                // --- STEP 2: CUSTOMER FORM ---
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 text-sm text-blue-800">
                    Veuillez remplir ces informations pour valider la commande. Vous recevrez une confirmation par email.
                  </div>
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom complet</label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border"
                      placeholder="Jean Dupont"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border"
                      placeholder="jean@exemple.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse de livraison</label>
                    <textarea
                      id="address"
                      required
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border"
                      placeholder="12 rue de la Paix, 75000 Paris"
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">Récapitulatif</p>
                    <div className="flex justify-between font-bold text-lg text-gray-900">
                      <span>Total à payer</span>
                      <span>{total} DA</span>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Footer Buttons */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-6 bg-gray-50">
                {step === 'cart' ? (
                  <>
                    <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                      <p>Total</p>
                      <p>{total} DA</p>
                    </div>
                    <button
                      onClick={() => setStep('details')}
                      className="w-full flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
                    >
                      Commander
                    </button>
                  </>
                ) : (
                  <button
                    form="checkout-form"
                    type="submit"
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Traitement...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-5 w-5" />
                        Confirmer la commande
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
