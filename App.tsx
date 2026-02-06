import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { OrderTracker } from './components/OrderTracker';
import { ChatAssistant } from './components/ChatAssistant';
import { MOCK_PRODUCTS } from './constants';
import { Product, CartItem, ViewState, Order, OrderStatus } from './types';
import { CheckCircle } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    // Simulate checkout process
    const newOrder: Order = {
      id: `CMD-${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toLocaleDateString('fr-FR'),
      items: [...cartItems],
      total: cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0),
      status: OrderStatus.PENDING,
      customerName: "Client Invité",
      address: "123 Rue de la Tech, Paris"
    };

    setOrders(prev => [...prev, newOrder]);
    setLastOrderId(newOrder.id);
    setCartItems([]);
    setIsCartOpen(false);
    setCurrentView('checkout-success');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">La technologie de demain, aujourd'hui</h1>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                Découvrez la sélection premium <strong>RS Phone</strong> de smartphones et accessoires. 
                Qualité garantie et livraison express en France métropolitaine.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOCK_PRODUCTS.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart} 
                />
              ))}
            </div>
          </div>
        );
      
      case 'tracking':
        return <OrderTracker orders={orders} />;

      case 'checkout-success':
        return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in">
            <div className="bg-green-100 p-4 rounded-full mb-6">
              <CheckCircle className="h-16 w-16 text-green-600" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Commande Confirmée !</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
              Merci pour votre achat chez RS Phone. Votre commande a été enregistrée avec succès.
            </p>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8 w-full max-w-sm">
              <p className="text-sm text-gray-500 mb-1">Votre numéro de suivi :</p>
              <p className="text-2xl font-mono font-bold text-blue-600 select-all">{lastOrderId}</p>
            </div>
            <div className="space-x-4">
              <button 
                onClick={() => setCurrentView('tracking')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                Suivre ma commande
              </button>
              <button 
                onClick={() => setCurrentView('home')}
                className="text-gray-600 hover:text-gray-900 font-medium px-6 py-3"
              >
                Retour à la boutique
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        currentView={currentView}
        onChangeView={setCurrentView}
      />
      
      <main className="pb-20" role="main">
        {renderContent()}
      </main>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />

      <ChatAssistant />
      
      <footer className="bg-white border-t border-gray-200 py-12 mt-12" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; 2026 RS Phone. Tous droits réservés.</p>
          <p className="mt-2">Ce site est une démonstration technique.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
