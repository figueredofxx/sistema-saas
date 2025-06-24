
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'lojista' | 'admin';
  storeId?: string;
  storeName?: string;
  subscriptionPlan: 'trial' | 'single' | 'multi' | 'expired';
  trialDaysLeft?: number;
  subscriptionEnd?: Date;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  checkSubscription: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  storeName: string;
  cnpj: string;
  address: string;
  phone: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simular carregamento do usuário do localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      updateTrialDays(userData);
    }
    setIsLoading(false);
  }, []);

  const updateTrialDays = (userData: User) => {
    if (userData.subscriptionPlan === 'trial' && userData.subscriptionEnd) {
      const now = new Date();
      const endDate = new Date(userData.subscriptionEnd);
      const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysLeft <= 0) {
        const expiredUser = { ...userData, subscriptionPlan: 'expired' as const, trialDaysLeft: 0 };
        setUser(expiredUser);
        localStorage.setItem('user', JSON.stringify(expiredUser));
      } else {
        const updatedUser = { ...userData, trialDaysLeft: daysLeft };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular login
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Dados mockados
    const mockUser: User = {
      id: '1',
      name: 'João Silva',
      email: email,
      role: email.includes('admin') ? 'admin' : 'lojista',
      storeId: '1',
      storeName: 'Loja Exemplo',
      subscriptionPlan: 'trial',
      trialDaysLeft: 5,
      subscriptionEnd: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    };

    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setIsLoading(false);
    
    toast({
      title: "Login realizado!",
      description: "Bem-vindo ao sistema"
    });
    
    return true;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular registro
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: 'lojista',
      storeId: Date.now().toString(),
      storeName: userData.storeName,
      subscriptionPlan: 'trial',
      trialDaysLeft: 7,
      subscriptionEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
    
    toast({
      title: "Cadastro realizado!",
      description: "Sua loja foi criada com 7 dias de teste gratuito"
    });
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logout realizado",
      description: "Até logo!"
    });
  };

  const checkSubscription = () => {
    if (user) {
      updateTrialDays(user);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isLoading,
      checkSubscription
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
