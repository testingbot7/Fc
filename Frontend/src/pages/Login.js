
// src/pages/Worker/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Package, User, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const WorkerLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData, 'worker');
    
    
    if (result.success) {
              localStorage.setItem('userRole', 'worker');
        localStorage.setItem('userName', formData.username);
      navigate('/worker/dashboard');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <Package className="h-12 w-12 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">PharmaCare</h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700">Worker Login</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your worker account to start managing orders
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2 text-red-700">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/worker/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Register here
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              Are you an owner?{' '}
              <Link to="/owner/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Owner Login
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">Demo Credentials:</h3>
          <div className="text-xs text-yellow-700 space-y-1">
            <p><strong>Email:</strong> worker@demo.com</p>
            <p><strong>Password:</strong> demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerLogin;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { User, Lock, Eye, EyeOff } from 'lucide-react';

// const WorkerLogin = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
  
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//     setError(''); // Clear error when user types
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       // Simulate API call with dummy authentication
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Dummy validation
//       if (formData.username === 'worker' && formData.password === 'password') {
//         // Store auth token (dummy)
//         localStorage.setItem('authToken', 'dummy-worker-token');
//         localStorage.setItem('userRole', 'worker');
//         localStorage.setItem('userName', formData.username);
        
//         navigate('/worker/dashboard');
//       } else {
//         setError('Invalid username or password');
//       }
//     } catch (err) {
//       setError('Login failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
//             <User className="h-8 w-8 text-blue-600" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900">Worker Login</h1>
//           <p className="text-gray-600 mt-2">Access your pharma dashboard</p>
//         </div>

//         {/* Demo Credentials */}
//         <div className="bg-blue-50 rounded-lg p-4 mb-6">
//           <h3 className="font-semibold text-blue-800 mb-2">Demo Credentials:</h3>
//           <p className="text-sm text-blue-700">Username: <span className="font-mono">worker</span></p>
//           <p className="text-sm text-blue-700">Password: <span className="font-mono">password</span></p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Username */}
//           <div>
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
//               Username
//             </label>
//             <div className="relative">
//               <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
//                 placeholder="Enter your username"
//                 required
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
//                 placeholder="Enter your password"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//               </button>
//             </div>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-3">
//               <p className="text-red-600 text-sm">{error}</p>
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
//           >
//             {loading ? 'Signing In...' : 'Sign In'}
//           </button>
//         </form>

//         {/* Footer */}
//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-600">
//             Need help? Contact your administrator
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WorkerLogin;