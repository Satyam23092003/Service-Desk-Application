// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Container, CssBaseline } from '@mui/material';

// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import Dashboard from './pages/Dashboard';
// import TicketDetail from './pages/TicketDetail';
// import AdminPanel from './pages/AdminPanel';

// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import Footer from './components/Footer';

// function PrivateRoute({ children }) {
//   const { user } = useAuth();
//   return user ? children : <Navigate to="/login" />;
// }

// function AdminRoute({ children }) {

//   const { user } = useAuth();
//   console.log(user)
//   return (user && user.role === 'admin') ? children : <Navigate to="/" />;
// }

// export default function App() {
//   return (
//     <>
   
//     <AuthProvider>
//       <CssBaseline />
//       <Router>
//         <Container maxWidth="md" sx={{ mt: 4 }}>
//           <Routes>
//             <Route path="/" element={
//               <PrivateRoute>
//                 <Dashboard />
//               </PrivateRoute>
//             }/>
//             <Route path="/ticket/:id" element={
//               <PrivateRoute>
//                 <TicketDetail />
//               </PrivateRoute>
//             } />
//             <Route path="/admin" element={
//               <AdminRoute>
//                 <AdminPanel />
//               </AdminRoute>
//             }/>
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/register" element={<RegisterPage />} />
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         </Container>
//       </Router>
   
//     </AuthProvider>
//    <Footer/>
//      </>
//   );
// }

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { CssBaseline } from '@mui/material';

// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import Dashboard from './pages/Dashboard';
// import TicketDetail from './pages/TicketDetail';
// import AdminPanel from './pages/AdminPanel';

// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import Footer from './components/Footer';

// function PrivateRoute({ children }) {
//   const { user } = useAuth();
//   return user ? children : <Navigate to="/login" />;
// }

// function AdminRoute({ children }) {
//   const { user } = useAuth();
//   return (user && user.role === 'admin') ? children : <Navigate to="/" />;
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <CssBaseline />
//       <Router>
//         {/* Full height wrapper */}
//         <div className="min-h-screen flex flex-col">
//           {/* Main content area expands to push footer down */}
//           <div className="flex-grow">
//             <Routes>
//               <Route path="/" element={
//                 <PrivateRoute>
//                   <Dashboard />
//                 </PrivateRoute>
//               }/>
//               <Route path="/ticket/:id" element={
//                 <PrivateRoute>
//                   <TicketDetail />
//                 </PrivateRoute>
//               } />
//               <Route path="/admin" element={
//                 <AdminRoute>
//                   <AdminPanel />
//                 </AdminRoute>
//               }/>
//               <Route path="/login" element={<LoginPage />} />
//               <Route path="/register" element={<RegisterPage />} />
//               <Route path="*" element={<Navigate to="/" />} />
//             </Routes>
//           </div>

//           {/* Footer always at the bottom */}
//           <Footer   />
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import TicketDetail from './pages/TicketDetail';
import AdminPanel from './pages/AdminPanel';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import Footer from './components/Footer';

// Route guards
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { user } = useAuth();
  return (user && user.role === 'admin') ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <AuthProvider>
      <CssBaseline />
      <Router>
        {/* Full-height flex container */}
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-600 via-purple-700 to-pink-600">
          
          {/* Main content pushes footer down */}
          <main className="flex-grow flex justify-center items-start px-4 pt-16 sm:pt-24">
            <Routes>
              <Route path="/" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }/>
              <Route path="/ticket/:id" element={
                <PrivateRoute>
                  <TicketDetail />
                </PrivateRoute>
              }/>
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              }/>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>

          {/* Footer at the bottom */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
