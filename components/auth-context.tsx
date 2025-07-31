"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
  previewImage?: string; // Optional profile image URL or data
  is_admin?: boolean; // Admin privileges flag
  // Add more fields as needed
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean; // Add admin status to context
  login: (token: string, user: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
  loading: boolean; // Add loading state to the interface
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On mount, load from localStorage
    const storedToken = localStorage.getItem('jwt');
    const storedUser = localStorage.getItem('user');
    if (storedToken) setToken(storedToken);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log('AuthContext: Loading user from localStorage', { 
        storedUser: parsedUser,
        is_admin: parsedUser?.is_admin 
      });
      setUser(parsedUser);
    }
    setLoading(false); // Mark loading as complete
  }, []);

  const login = (newToken: string, newUser: User) => {
    console.log('AuthContext: Login called with user data', { 
      token: newToken ? 'present' : 'missing', 
      user: newUser,
      is_admin: newUser?.is_admin 
    });
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('jwt', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
  };

  // Compute admin status from user data
  const isAdmin = user?.is_admin === true;

  // Add debugging for admin status
  useEffect(() => {
    if (user) {
      console.log('AuthContext: User data updated', { 
        user_id: user.id, 
        email: user.email, 
        is_admin: user.is_admin, 
        computed_isAdmin: isAdmin 
      });
    }
  }, [user, isAdmin]);

  //console.log('AuthContext.Provider rendered', { user, token, isAuthenticated: !!token });
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isAdmin, // Expose admin status
        login,
        logout,
        setUser,
        loading, // Expose loading state
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 