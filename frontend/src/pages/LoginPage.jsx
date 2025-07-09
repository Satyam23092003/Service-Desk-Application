


// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link as RouterLink } from 'react-router-dom';
// import axios, { setAuthToken } from '../api';
// import { useAuth } from '../contexts/AuthContext';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { user, login } = useAuth();
//   const navigate = useNavigate();

//   // Redirect after login — only once
//   useEffect(() => {
//     if (user) {
//       navigate('/');
//     }
//   }, [user, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const { data } = await axios.post('/users/login', { email, password });
//       login(data);
//       setAuthToken(data.token);
//       localStorage.setItem("token",data.token)
//       // ✅ DO NOT navigate here — useEffect will handle it
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 sm:px-6">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
//         <div className="p-6 sm:p-8">
//           <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
//             Service Desk Login
//           </h1>

//           {error && (
//             <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
//               <p>{error}</p>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//             >
//               Login
//             </button>
//           </form>

//           <div className="mt-6 text-center text-sm text-gray-600">
//             Don't have an account?{' '}
//             <RouterLink
//               to="/register"
//               className="font-semibold text-blue-600 hover:text-blue-800 hover:underline"
//             >
//               Register here
//             </RouterLink>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link as RouterLink } from 'react-router-dom';
// import axios, { setAuthToken } from '../api';
// import { useAuth } from '../contexts/AuthContext';
// import { Eye, EyeOff } from 'lucide-react';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const { user, login } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       navigate('/');
//     }
//   }, [user, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const { data } = await axios.post('/users/login', { email, password });
//       login(data);
//       setAuthToken(data.token);
//       localStorage.setItem('token', data.token);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center ">
//       {/* Optional background effect */}
//       <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_30%,white,transparent_30%)] z-0"></div>

//       {/* Login card */}
//       <div className="relative z-10 w-[90%] max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-white shadow-2xl animate-fadeIn">
//         <h1 className="text-3xl font-bold text-center mb-6">Service Desk Login</h1>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md border-l-4 border-red-600">
//             <p>{error}</p>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Email field */}
//           <div className="relative">
//             <input
//               type="email"
//               id="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="peer w-full px-4 pt-5 pb-2 bg-white/90 text-black rounded-lg border border-gray-300 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Email"
//             />
//             <label
//               htmlFor="email"
//               className="absolute left-4 top-2 text-sm text-gray-600 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
//             >
//               Email
//             </label>
//           </div>

//           {/* Password field */}
//           <div className="relative">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               id="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="peer w-full px-4 pt-5 pb-2 bg-white/90 text-black rounded-lg border border-gray-300 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Password"
//             />
//             <label
//               htmlFor="password"
//               className="absolute left-4 top-2 text-sm text-gray-600 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
//             >
//               Password
//             </label>
//             <button
//               type="button"
//               onClick={() => setShowPassword((prev) => !prev)}
//               className="absolute right-4 top-3 text-gray-600 hover:text-blue-600"
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md transition"
//           >
//             Login
//           </button>
//         </form>

//         {/* Footer */}
//         <div className="mt-6 text-center text-sm text-gray-200">
//           Don’t have an account?{' '}
//           <RouterLink
//             to="/register"
//             className="font-semibold text-blue-300 hover:text-blue-400 hover:underline"
//           >
//             Register here
//           </RouterLink>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios, { setAuthToken } from '../api';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await axios.post('/users/login', { email, password });
      login(data);
      setAuthToken(data.token);
      localStorage.setItem('token', data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-16 px-4 min-h-[calc(100vh-100px)] bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 relative">
      {/* Optional background glow */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_30%,white,transparent_30%)] z-0"></div>

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-white shadow-2xl animate-fadeIn">
        <h1 className="text-3xl font-bold text-center mb-6">Service Desk Login</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md border-l-4 border-red-600">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full px-4 pt-5 pb-2 bg-white/90 text-black rounded-lg border border-gray-300 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Email"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-2 text-sm text-gray-600 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
            >
              Email
            </label>
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full px-4 pt-5 pb-2 bg-white/90 text-black rounded-lg border border-gray-300 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Password"
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-2 text-sm text-gray-600 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-3 text-gray-600 hover:text-blue-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-200">
          Don’t have an account?{' '}
          <RouterLink
            to="/register"
            className="font-semibold text-blue-300 hover:text-blue-400 hover:underline"
          >
            Register here
          </RouterLink>
        </div>
      </div>
    </div>
  );
}
