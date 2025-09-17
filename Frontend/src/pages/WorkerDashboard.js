// // src/pages/Worker/Dashboard.js
// import React, { useState, useContext } from 'react';
// import { ShoppingCart, History, User, LogOut, Package } from 'lucide-react';
// import MedicineSearch from '../components/MedicineSearch';
// import { CartContext } from '../context/CartContext';
// import { AuthContext } from '../context/AuthContext';

// const WorkerDashboard = () => {
//   const { cart, getTotalItems, getTotalAmount } = useContext(CartContext);
//   const { user, logout } = useContext(AuthContext);
//   const [activeView, setActiveView] = useState('search');

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center space-x-3">
//               <Package className="h-8 w-8 text-blue-600" />
//               <h1 className="text-2xl font-bold text-gray-900">
//                 PharmaCare Worker
//               </h1>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <div className="text-sm text-gray-600">
//                 Welcome, <span className="font-medium">{user?.name}</span>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
//               >
//                 <LogOut className="h-5 w-5" />
//                 <span>Logout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Navigation Tabs */}
//       <nav className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex space-x-8">
//             <button
//               onClick={() => setActiveView('search')}
//               className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                 activeView === 'search'
//                   ? 'border-blue-500 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               Search Medicines
//             </button>
//             <button
//               onClick={() => setActiveView('cart')}
//               className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
//                 activeView === 'cart'
//                   ? 'border-blue-500 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               <ShoppingCart className="h-4 w-4" />
//               <span>Cart ({getTotalItems()})</span>
//             </button>
//             <button
//               onClick={() => setActiveView('history')}
//               className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
//                 activeView === 'history'
//                   ? 'border-blue-500 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               <History className="h-4 w-4" />
//               <span>Bill History</span>
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {activeView === 'search' && (
//           <div className="space-y-6">
//             <div className="text-center">
//               <h2 className="text-3xl font-bold text-gray-900 mb-2">
//                 Search Medicines
//               </h2>
//               <p className="text-gray-600">
//                 Find medicines quickly with our smart search system
//               </p>
//             </div>
//             <MedicineSearch />
//           </div>
//         )}

//         {activeView === 'cart' && (
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h2>
//             {cart.length === 0 ? (
//               <div className="text-center py-12">
//                 <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//                 <p className="text-gray-500">Your cart is empty</p>
//                 <button
//                   onClick={() => setActiveView('search')}
//                   className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   Start Shopping
//                 </button>
//               </div>
//             ) : (
//               <CartView />
//             )}
//           </div>
//         )}

//         {activeView === 'history' && (
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Bill History</h2>
//             <BillHistory />
//           </div>
//         )}
//       </main>

//       {/* Floating Cart Badge */}
//       {getTotalItems() > 0 && activeView !== 'cart' && (
//         <div className="fixed bottom-4 right-4">
//           <button
//             onClick={() => setActiveView('cart')}
//             className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors"
//           >
//             <div className="flex items-center space-x-2">
//               <ShoppingCart className="h-6 w-6" />
//               <span className="font-bold">{getTotalItems()}</span>
//             </div>
//             <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">
//               {getTotalItems()}
//             </div>
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // Cart View Component
// const CartView = () => {
//   const { cart, updateQuantity, removeFromCart, getTotalAmount } = useContext(CartContext);
//   const [isGeneratingBill, setIsGeneratingBill] = useState(false);

//   const handleGenerateBill = async () => {
//     setIsGeneratingBill(true);
//     try {
//       // API call to generate bill
//       const response = await fetch('/api/bills/generate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify({ items: cart })
//       });
      
//       if (response.ok) {
//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = `bill-${Date.now()}.pdf`;
//         a.click();
//         window.URL.revokeObjectURL(url);
//       }
//     } catch (error) {
//       console.error('Error generating bill:', error);
//     }
//     setIsGeneratingBill(false);
//   };

//   return (
//     <div className="space-y-4">
//       {cart.map((item) => (
//         <div key={item._id} className="flex items-center justify-between p-4 border rounded-lg">
//           <div className="flex-1">
//             <h3 className="font-semibold">{item.name}</h3>
//             <p className="text-sm text-gray-600">{item.company} - {item.strength}</p>
//             <p className="text-lg font-bold text-green-600">₹{item.price}</p>
//           </div>
//           <div className="flex items-center space-x-3">
//             <button
//               onClick={() => updateQuantity(item._id, item.quantity - 1)}
//               className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
//             >
//               -
//             </button>
//             <span className="font-semibold min-w-[30px] text-center">{item.quantity}</span>
//             <button
//               onClick={() => updateQuantity(item._id, item.quantity + 1)}
//               className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
//             >
//               +
//             </button>
//             <button
//               onClick={() => removeFromCart(item._id)}
//               className="text-red-500 hover:text-red-700 ml-4"
//             >
//               Remove
//             </button>
//           </div>
//         </div>
//       ))}
      
//       <div className="border-t pt-4">
//         <div className="flex justify-between items-center mb-4">
//           <span className="text-xl font-bold">Total: ₹{getTotalAmount()}</span>
//           <button
//             onClick={handleGenerateBill}
//             disabled={isGeneratingBill}
//             className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
//           >
//             {isGeneratingBill ? 'Generating...' : 'Generate Bill'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Bill History Component
// const BillHistory = () => {
//   const [bills, setBills] = useState([]);
//   const [loading, setLoading] = useState(true);

//   React.useEffect(() => {
//     fetchBillHistory();
//   }, []);

//   const fetchBillHistory = async () => {
//     try {
//       const response = await fetch('/api/bills/history', {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       const data = await response.json();
//       setBills(data);
//     } catch (error) {
//       console.error('Error fetching bills:', error);
//     }
//     setLoading(false);
//   };

//   if (loading) {
//     return <div className="text-center py-8">Loading bill history...</div>;
//   }

//   return (
//     <div className="space-y-4">
//       {bills.length === 0 ? (
//         <div className="text-center py-12">
//           <History className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//           <p className="text-gray-500">No bills generated yet</p>
//         </div>
//       ) : (
//         bills.map((bill) => (
//           <div key={bill._id} className="p-4 border rounded-lg">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="font-semibold">Bill #{bill.billNumber}</p>
//                 <p className="text-sm text-gray-600">
//                   {new Date(bill.createdAt).toLocaleDateString()} at{' '}
//                   {new Date(bill.createdAt).toLocaleTimeString()}
//                 </p>
//                 <p className="text-sm text-gray-600">{bill.items.length} items</p>
//               </div>
//               <div className="text-right">
//                 <p className="text-xl font-bold text-green-600">₹{bill.totalAmount}</p>
//                 <button className="text-blue-600 hover:text-blue-800 text-sm">
//                   Download PDF
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default WorkerDashboard;

// src/pages/Worker/Dashboard.js
import React, { useState, useContext } from 'react';
import { ShoppingCart, History, User, LogOut, Package } from 'lucide-react';
import MedicineSearch from '../components/MedicineSearch';
import Cart from '../components/Cart';



import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const WorkerDashboard = () => {
  const { cart, getTotalItems, getTotalAmount } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [activeView, setActiveView] = useState('search');

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Package className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                PharmaCare Worker
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, <span className="font-medium">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveView('search')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeView === 'search'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Search Medicines
            </button>
            <button
              onClick={() => setActiveView('cart')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeView === 'cart'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Cart ({getTotalItems()})</span>
            </button>
            <button
              onClick={() => setActiveView('history')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeView === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <History className="h-4 w-4" />
              <span>Bill History</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'search' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Search Medicines
              </h2>
              <p className="text-gray-600">
                Find medicines quickly with our smart search system
              </p>
            </div>
            <MedicineSearch />
          </div>
        )}

        {activeView === 'cart' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h2>
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
                <button
                  onClick={() => setActiveView('search')}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <CartView />
            )}
          </div>
        )}

        {activeView === 'history' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Bill History</h2>
            <BillHistory />
          </div>
        )}
      </main>

      {/* Floating Cart Badge */}
      {getTotalItems() > 0 && activeView !== 'cart' && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={() => setActiveView('cart')}
            className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-6 w-6" />
              <span className="font-bold">{getTotalItems()}</span>
            </div>
            <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">
              {getTotalItems()}
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

// Cart View Component
const CartView = () => {
  const { cart, updateQuantity, removeFromCart, getTotalAmount } = useContext(CartContext);
  const [isGeneratingBill, setIsGeneratingBill] = useState(false);

  const handleGenerateBill = async () => {
    setIsGeneratingBill(true);
    try {
      // API call to generate bill
      const response = await fetch('/api/bills/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ items: cart })
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bill-${Date.now()}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error generating bill:', error);
    }
    setIsGeneratingBill(false);
  };

  return (
    <div className="space-y-4">
    {Array.isArray(cart) && cart.length > 0 ? (
      cart.map((item) => (
        <div key={item._id} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex-1">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.company} - {item.strength}</p>
            <p className="text-lg font-bold text-green-600">₹{item.price}</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
            >
              -
            </button>
            <span className="font-semibold min-w-[30px] text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
            >
              +
            </button>
            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-500 hover:text-red-700 ml-4"
            >
              Remove
            </button>
          </div>
        </div>
      ))
    ) : (
      <p>Your cart is empty</p>
    )}
      
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold">Total: ₹{getTotalAmount()}</span>
          <button
            onClick={handleGenerateBill}
            disabled={isGeneratingBill}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {isGeneratingBill ? 'Generating...' : 'Generate Bill'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Bill History Component
const BillHistory = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchBillHistory();
  }, []);

  const fetchBillHistory = async () => {
    try {
      const response = await fetch('/api/bills/history', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setBills(data);
    } catch (error) {
      console.error('Error fetching bills:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="text-center py-8">Loading bill history...</div>;
  }

  return (
    <div className="space-y-4">
      {bills.length === 0 ? (
        <div className="text-center py-12">
          <History className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No bills generated yet</p>
        </div>
      ) : (
        bills.map((bill) => (
          <div key={bill._id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">Bill #{bill.billNumber}</p>
                <p className="text-sm text-gray-600">
                  {new Date(bill.createdAt).toLocaleDateString()} at{' '}
                  {new Date(bill.createdAt).toLocaleTimeString()}
                </p>
                <p className="text-sm text-gray-600">{bill.items.length} items</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-green-600">₹{bill.totalAmount}</p>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default WorkerDashboard;