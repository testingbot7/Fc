// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WorkerLogin from './pages/Login';
import WorkerDashboard from './pages/WorkerDashboard';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem('token');

  // const token = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole');

  if (!token) {
    return <Navigate to="/worker/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/worker/login" replace />;
  }

  return children;
};

// Public Route Component (redirects if already logged in)
const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('token');

  // const token = localStorage.getItem('authToken');
  
  if (token) {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'worker') {
      return <Navigate to="/worker/dashboard" replace />;
    }
  }
  
  return children;
};
function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Routes>
              {/* Default Route */}
              <Route path="/" element={<Navigate to="/worker/login" replace />} />
              
              {/* Worker Routes */}
              <Route 
                path="/worker/login" 
                element={
                  <PublicRoute>
                    <WorkerLogin />
                  </PublicRoute>
                } 
              />
              
              <Route 
                path="/worker/dashboard" 
                element={
                  <ProtectedRoute requiredRole="worker">
                    <WorkerDashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/worker/login" replace />} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}


// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           {/* Default Route */}
//           <Route path="/" element={<Navigate to="/worker/login" replace />} />
          
//           {/* Worker Routes */}
//           <Route 
//             path="/worker/login" 
//             element={

//               <PublicRoute>
//                 <WorkerLogin />
//               </PublicRoute>
//             } 
//           />
          
//           <Route 
//             path="/worker/dashboard" 
//             element={
              
//               <ProtectedRoute requiredRole="worker">
//                 <WorkerDashboard />
//               </ProtectedRoute>
//             } 
//           />

//           {/* Catch all route */}
//           <Route path="*" element={<Navigate to="/worker/login" replace />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

export default App;