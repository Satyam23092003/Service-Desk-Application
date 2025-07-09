// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     const stored = localStorage.getItem('servicedeskUser');
//     return stored ? JSON.parse(stored) : null;
//   });

//   // Save user info in localStorage
//   useEffect(() => {
//     if (user) localStorage.setItem('servicedeskUser', JSON.stringify(user));
//     else localStorage.removeItem('servicedeskUser');
//   }, [user]);

//   const login = (userData) => setUser(userData);
//   const logout = () => setUser(null);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('servicedeskUser');
    // Add a check to ensure 'stored' is a non-null/non-undefined string before parsing
    if (stored) {
      try {
        // Attempt to parse the stored string
        return JSON.parse(stored);
      } catch (error) {
        // If parsing fails (e.g., "undefined" string), log the error and return null
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem('servicedeskUser'); // Clear invalid data
        return null;
      }
    }
    return null; // Return null if nothing is stored or if it's empty/invalid
  });

  // Save user info in localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('servicedeskUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('servicedeskUser');
    }
  }, [user]);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}