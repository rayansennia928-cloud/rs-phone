import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';

interface OrderTrackerProps {
  orders: Order[];
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ orders }) => {
  const [searchId, setSearchId] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const order = orders.find(o => o.id === searchId.trim());
    setFoundOrder(order || null);
    setHasSearched(true);
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING: return <Clock className="h-8 w-8 text-yellow-500" />;
      case OrderStatus.SHIPPED: return <Truck className="h-8 w-8 text-blue-500" />;
      case OrderStatus.DELIVERED: return <CheckCircle className="h-8 w-8 text-green-500" />;
    }
  };

  const getStatusStep = (currentStatus: OrderStatus) => {
    if (currentStatus === OrderStatus.DELIVERED) return 3;
    if (currentStatus === OrderStatus.SHIPPED) return 2;
    return 1;
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Suivre votre commande</h2>
        <p className="text-gray-600">Entrez votre numéro de commande pour connaître son statut en temps réel.</p>
      </div>

      <form onSubmit={handleSearch} className="relative mb-12">
        <input
          type="text"
          placeholder="Ex: CMD-123456"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="w-full pl-5 pr-14 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none text-lg transition-colors"
        />
        <button 
          type="submit"
          className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>

      {hasSearched && !foundOrder && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center text-red-700 animate-fade-in">
          Aucune commande trouvée avec le numéro <strong>{searchId}</strong>.
        </div>
      )}

      {foundOrder && (
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm animate-fade-in">
          <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
            <div>
              <p className="text-sm text-gray-500">Numéro de commande</p>
              <h3 className="text-xl font-bold text-gray-900">{foundOrder.id}</h3>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{foundOrder.date}</p>
            </div>
          </div>

          <div className="mb-10">
            <div className="relative">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
                <div 
                  style={{ width: `${(getStatusStep(foundOrder.status) / 3) * 100}%` }} 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-1000"
                ></div>
              </div>
              <div className="flex justify-between text-xs sm:text-sm font-medium text-gray-600">
                <div className={`flex flex-col items-center ${getStatusStep(foundOrder.status) >= 1 ? 'text-blue-600' : ''}`}>
                  <span>Validée</span>
                </div>
                <div className={`flex flex-col items-center ${getStatusStep(foundOrder.status) >= 2 ? 'text-blue-600' : ''}`}>
                  <span>Expédiée</span>
                </div>
                <div className={`flex flex-col items-center ${getStatusStep(foundOrder.status) >= 3 ? 'text-blue-600' : ''}`}>
                  <span>Livrée</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl">
            <div className="bg-white p-3 rounded-full shadow-sm">
              {getStatusIcon(foundOrder.status)}
            </div>
            <div>
              <p className="text-sm text-gray-500">Statut actuel</p>
              <p className="text-lg font-bold text-gray-900">{foundOrder.status}</p>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="font-medium text-gray-900 mb-4">Articles commandés</h4>
            <ul className="space-y-3">
              {foundOrder.items.map(item => (
                <li key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.quantity}x {item.name}</span>
                  <span className="font-medium">{item.price * item.quantity} DA</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{foundOrder.total} DA</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
