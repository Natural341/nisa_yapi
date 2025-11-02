'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Address {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  district: string;
  address: string;
  isDefault: boolean;
}

interface User {
  email: string;
  name: string;
  phone: string;
}

interface UserContextType {
  user: User | null;
  addresses: Address[];
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string, phone: string) => boolean;
  logout: () => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  getDefaultAddress: () => Address | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Initialize demo account and data
  useEffect(() => {
    // Create demo user if not exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const demoEmail = 'okan6226@gmail.com';

    if (!users.find((u: any) => u.email === demoEmail)) {
      users.push({
        name: 'Okan Yılmaz',
        email: demoEmail,
        password: 'Portakal1999!',
        phone: '0545 852 77 26'
      });
      localStorage.setItem('users', JSON.stringify(users));

      // Create demo addresses for the demo account
      const demoAddresses: Address[] = [
        {
          id: '1',
          title: 'Ev Adresim',
          firstName: 'Okan',
          lastName: 'Yılmaz',
          phone: '0545 852 77 26',
          city: 'Eskişehir',
          district: 'Odunpazarı',
          address: 'Gültepe, Halk Cd. 137/a',
          isDefault: true
        },
        {
          id: '2',
          title: 'İş Adresi',
          firstName: 'Okan',
          lastName: 'Yılmaz',
          phone: '0545 852 77 26',
          city: 'Eskişehir',
          district: 'Tepebaşı',
          address: 'Yenibağlar Mah. Atatürk Bulvarı No:45 D:12',
          isDefault: false
        },
        {
          id: '3',
          title: 'Yazlık',
          firstName: 'Okan',
          lastName: 'Yılmaz',
          phone: '0545 852 77 26',
          city: 'Antalya',
          district: 'Alanya',
          address: 'Saray Mah. Atatürk Cad. No:78 Daire:5',
          isDefault: false
        }
      ];
      localStorage.setItem(`addresses_${demoEmail}`, JSON.stringify(demoAddresses));
    }

    // Load user data from localStorage
    const savedUser = localStorage.getItem('user');
    const savedAddresses = localStorage.getItem('addresses');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }

    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Simple demo login - in production, this would call an API
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);

    if (foundUser) {
      const userData = { email: foundUser.email, name: foundUser.name, phone: foundUser.phone };
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(userData));

      // Load user's addresses
      const userAddresses = JSON.parse(localStorage.getItem(`addresses_${email}`) || '[]');
      setAddresses(userAddresses);
      localStorage.setItem('addresses', JSON.stringify(userAddresses));

      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string, phone: string): boolean => {
    // Simple demo registration - in production, this would call an API
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      return false;
    }

    // Add new user
    users.push({ name, email, password, phone });
    localStorage.setItem('users', JSON.stringify(users));

    // Auto login after registration
    const userData = { email, name, phone };
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));

    return true;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setAddresses([]);
    localStorage.removeItem('user');
    localStorage.removeItem('addresses');
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...address,
      id: Date.now().toString(),
    };

    // If this is the first address or isDefault is true, make it default
    const isFirstAddress = addresses.length === 0;
    if (isFirstAddress || address.isDefault) {
      // Remove default from other addresses
      const updatedAddresses = addresses.map(addr => ({ ...addr, isDefault: false }));
      const newAddresses = [...updatedAddresses, { ...newAddress, isDefault: true }];
      setAddresses(newAddresses);

      if (user) {
        localStorage.setItem(`addresses_${user.email}`, JSON.stringify(newAddresses));
        localStorage.setItem('addresses', JSON.stringify(newAddresses));
      }
    } else {
      const newAddresses = [...addresses, newAddress];
      setAddresses(newAddresses);

      if (user) {
        localStorage.setItem(`addresses_${user.email}`, JSON.stringify(newAddresses));
        localStorage.setItem('addresses', JSON.stringify(newAddresses));
      }
    }
  };

  const updateAddress = (id: string, updatedAddress: Omit<Address, 'id'>) => {
    const newAddresses = addresses.map(addr => {
      if (addr.id === id) {
        return { ...updatedAddress, id };
      }
      // If the updated address is set as default, remove default from others
      if (updatedAddress.isDefault && addr.id !== id) {
        return { ...addr, isDefault: false };
      }
      return addr;
    });

    setAddresses(newAddresses);

    if (user) {
      localStorage.setItem(`addresses_${user.email}`, JSON.stringify(newAddresses));
      localStorage.setItem('addresses', JSON.stringify(newAddresses));
    }
  };

  const deleteAddress = (id: string) => {
    const newAddresses = addresses.filter(addr => addr.id !== id);

    // If we deleted the default address and there are other addresses, make the first one default
    const deletedWasDefault = addresses.find(addr => addr.id === id)?.isDefault;
    if (deletedWasDefault && newAddresses.length > 0) {
      newAddresses[0].isDefault = true;
    }

    setAddresses(newAddresses);

    if (user) {
      localStorage.setItem(`addresses_${user.email}`, JSON.stringify(newAddresses));
      localStorage.setItem('addresses', JSON.stringify(newAddresses));
    }
  };

  const setDefaultAddress = (id: string) => {
    const newAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    }));

    setAddresses(newAddresses);

    if (user) {
      localStorage.setItem(`addresses_${user.email}`, JSON.stringify(newAddresses));
      localStorage.setItem('addresses', JSON.stringify(newAddresses));
    }
  };

  const getDefaultAddress = (): Address | null => {
    return addresses.find(addr => addr.isDefault) || null;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        addresses,
        isLoggedIn,
        login,
        register,
        logout,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        getDefaultAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
