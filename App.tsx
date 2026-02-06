import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { OrderTracker } from './components/OrderTracker';
import { ChatAssistant } from './components/ChatAssistant';
import { MOCK_PRODUCTS } from './constants';
import { Product, CartItem, ViewState, Order, OrderStatus, CustomerInfo } from './types';
import { CheckCircle, Headphones, Smartphone, Instagram, Info } from 'lucide-react';
import emailjs from '@emailjs/browser';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Initialisation des commandes depuis le localStorage pour la persistance
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const savedOrders = localStorage.getItem('rs_phone_orders');
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch (e) {
      console.error("Erreur chargement commandes:", e);
      return [];
    }
  });

  const [lastOrderId, setLastOrderId] = useState<string | null>(null);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

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

  const handleCheckout = async (customerInfo: CustomerInfo) => {
    setIsProcessingOrder(true);
    
    // 1. Création de l'objet commande (local)
    const orderId = `CMD-${Math.floor(Math.random() * 1000000)}`;
    const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    // 2. Préparation du contenu de l'email
    const itemsListString = cartItems
      .map(item => `- ${item.quantity}x ${item.name} (${item.price * item.quantity} DA)`)
      .join('\n');

    const templateParams = {
      customer_name: customerInfo.name,
      customer_email: customerInfo.email,
      customer_phone: customerInfo.phone,
      customer_address: customerInfo.address,
      order_details: itemsListString,
      total_price: totalAmount + ' DA',
      order_id: orderId,
      reply_to: customerInfo.email
    };

    try {
      // 3. Tentative d'envoi via EmailJS
      const serviceId = 'service_gmail'; // Remplacez par votre vrai Service ID
      const templateId = 'template_mijyktl'; // Remplacez par votre vrai Template ID
      const publicKey = 'l-wIKsMXS0-qyw3tA'; // Remplacez par votre vraie Public Key

      // Si les clés sont celles par défaut, on simule juste une attente pour ne pas créer d'erreur
      if (serviceId === 'service_gmail') {
        console.log("EmailJS non configuré : Simulation de l'envoi de commande...");
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulation délai réseau
      } else {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
      }
    } catch (error) {
      // En cas d'erreur réelle (ex: quota dépassé), on log l'erreur mais ON CONTINUE
      // pour ne pas bloquer le client.
      console.error('Erreur non bloquante lors de l\'envoi de l\'email:', error);
    }

    // 4. Succès : Mise à jour de l'état local et sauvegarde dans localStorage
    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('fr-FR'),
      items: [...cartItems],
      total: totalAmount,
      status: OrderStatus.PENDING,
      customerName: customerInfo.name,
      address: customerInfo.address,
      phone: customerInfo.phone,
      email: customerInfo.email
    };

    setOrders(prev => {
      const updatedOrders = [...prev, newOrder];
      // Sauvegarde persistante
      try {
        localStorage.setItem('rs_phone_orders', JSON.stringify(updatedOrders));
      } catch (e) {
        console.error("Erreur sauvegarde commandes:", e);
      }
      return updatedOrders;
    });

    setLastOrderId(newOrder.id);
    setCartItems([]);
    setIsCartOpen(false);
    setCurrentView('checkout-success');
    setIsProcessingOrder(false);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        const smartphones = MOCK_PRODUCTS.filter(p => p.category === 'smartphone');
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Smartphone className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Nos Smartphones</h1>
                <p className="text-gray-500">Performance et élégance. Découvrez notre sélection premium.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {smartphones.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart} 
                />
              ))}
            </div>
          </div>
        );

      case 'accessories':
        const accessories = MOCK_PRODUCTS.filter(p => p.category === 'accessory');
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Headphones className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Accessoires</h1>
                <p className="text-gray-500">Équipez votre smartphone avec notre sélection.</p>
              </div>
            </div>
            
            {accessories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {accessories.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addToCart} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-100 rounded-xl">
                <p className="text-gray-500">Aucun accessoire disponible pour le moment.</p>
              </div>
            )}
          </div>
        );
      
      case 'tracking':
        return <OrderTracker orders={orders} />;
      
      case 'about':
        return (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Info className="h-8 w-8 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">À propos de RS Phone</h1>
              </div>
              
              <div className="prose prose-blue text-gray-600 mb-8">
                <p className="mb-4">
                  RS Phone est votre destination privilégiée pour les smartphones de dernière génération et les accessoires premium en Algérie.
                </p>
                <p>
                  Nous nous engageons à fournir des produits authentiques, un service client exceptionnel et les meilleurs prix du marché. Notre mission est de vous connecter au monde avec style et fiabilité.
                </p>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-4">Suivez-nous sur les réseaux</h2>
              <div className="flex flex-wrap gap-4 mb-8">
                <a 
                  href="https://www.instagram.com/rs_phone26?igsh=aTlkbDh1NmFid243&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  <Instagram className="h-5 w-5" />
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://www.tiktok.com/@rs_phone2026" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 bg-black text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  {/* Icône TikTok SVG personnalisée */}
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 1 0 1 7.6 6.83 6.83 0 0 0 6-6.64V7.91a8.73 8.73 0 0 0 2.23 1.29v-2.51Z"/>
                  </svg>
                  <span>TikTok</span>
                </a>
              </div>
              
              <div className="pt-8 border-t border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Contactez-nous</h2>
                <div className="bg-gray-50 rounded-xl p-6 space-y-3 text-gray-600">
                  <p className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900 w-20">Email :</span>
                    <a href="mailto:contact@rsphone.dz" className="text-blue-600 hover:underline">contact@rsphone.dz</a>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900 w-20">Tél :</span>
                    <span>+213 555 123 456</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900 w-20">Adresse :</span>
                    <span>Alger, Algérie</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'checkout-success':
        const lastOrder = orders.find(o => o.id === lastOrderId);
        return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in">
            <div className="bg-green-100 p-4 rounded-full mb-6">
              <CheckCircle className="h-16 w-16 text-green-600" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Commande Confirmée !</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
              Merci pour votre achat chez RS Phone. Un email contenant votre code de suivi a été envoyé à <strong>{lastOrder?.email}</strong>.
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
        isProcessing={isProcessingOrder}
      />

      <ChatAssistant />
      
      <footer className="bg-white border-t border-gray-200 py-12 mt-12" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; 2024 RS Phone. Tous droits réservés.</p>
          <p className="mt-2">Ce site est une démonstration technique.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
