import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthView, ToastMessage } from '../types';
import { INITIAL_USERS } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  users: User[];
  authView: AuthView;
  setAuthView: (view: AuthView) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  login: (email: string, pass: string) => boolean;
  register: (name: string, email: string, pass: string) => boolean;
  forgotPasswordSendCode: (email: string) => { success: boolean; code?: string; message: string };
  resetPasswordWithCode: (email: string, code: string, newPass: string) => boolean;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
  toasts: ToastMessage[];
  showToast: (type: ToastMessage['type'], message: string) => void;
  removeToast: (id: string) => void;
  addUserByAdmin: (user: Omit<User, 'id' | 'createdAt'>) => void;
  deleteUserByAdmin: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const containsPersian = (str?: string) => str ? /[\u0600-\u06FF]/.test(str) : false;

const sanitizeUser = <T extends User>(u: T): T => {
  return {
    ...u,
    name: containsPersian(u.name) ? 'Alex Morgan' : u.name,
    phone: containsPersian(u.phone) ? '+1 (555) 234-5678' : u.phone
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load users from storage or fallback
  const [userList, setUserList] = useState<(User & { passwordHash: string })[]>(() => {
    const stored = localStorage.getItem('app_users');
    if (stored) {
      try {
        const parsed: (User & { passwordHash: string })[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const sanitized = parsed.map((u) => sanitizeUser(u));
          if (sanitized.some((u, idx) => u.name !== parsed[idx].name || u.phone !== parsed[idx].phone)) {
            localStorage.setItem('app_users', JSON.stringify(sanitized));
          }
          return sanitized;
        }
      } catch {
        // Fallback to initial
      }
    }
    return INITIAL_USERS;
  });

  // Current logged in user
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('app_current_user');
    if (saved) {
      try {
        const parsed: User = JSON.parse(saved);
        const sanitized = sanitizeUser(parsed);
        if (sanitized.name !== parsed.name || sanitized.phone !== parsed.phone) {
          localStorage.setItem('app_current_user', JSON.stringify(sanitized));
        }
        return sanitized;
      } catch {
        return null;
      }
    }
    return null;
  });

  const [authView, setAuthView] = useState<AuthView>('login');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('app_theme') === 'dark';
  });
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist users to localStorage
  useEffect(() => {
    localStorage.setItem('app_users', JSON.stringify(userList));
  }, [userList]);

  // Persist active user
  useEffect(() => {
    if (user) {
      localStorage.setItem('app_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('app_current_user');
    }
  }, [user]);

  // Handle dark mode class on <html> element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('app_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('app_theme', 'light');
    }
  }, [isDarkMode]);

  // Document language & direction configuration
  useEffect(() => {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';
  }, []);

  const showToast = (type: ToastMessage['type'], message: string) => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 5);
    setToasts((prev) => [...prev, { id, type, message }]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const login = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const found = userList.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!found) {
      showToast('error', 'No account found with this email');
      return false;
    }

    if (found.passwordHash !== pass) {
      showToast('error', 'Incorrect password');
      return false;
    }

    if (found.status === 'blocked') {
      showToast('error', 'Your account has been suspended');
      return false;
    }

    const { passwordHash, ...safeUser } = found;
    setUser(safeUser);
    showToast('success', `Welcome back ${safeUser.name}!`);
    return true;
  };

  const register = (name: string, email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const exists = userList.some((u) => u.email.toLowerCase() === cleanEmail);

    if (exists) {
      showToast('error', 'This email is already registered');
      return false;
    }

    const newUser: User & { passwordHash: string } = {
      id: Date.now().toString(),
      name: name.trim(),
      email: cleanEmail,
      passwordHash: pass,
      role: 'user',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`
    };

    setUserList((prev) => [...prev, newUser]);
    const { passwordHash, ...safeUser } = newUser;
    setUser(safeUser);
    showToast('success', 'Registration successful!');
    return true;
  };

  const forgotPasswordSendCode = (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const found = userList.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!found) {
      return {
        success: false,
        message: 'No account associated with this email.'
      };
    }

    // Generate a 6-digit code for testing
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    // Store temporary OTP code in session storage
    sessionStorage.setItem(`reset_code_${cleanEmail}`, code);

    return {
      success: true,
      code,
      message: `Verification code sent to ${cleanEmail}`
    };
  };

  const resetPasswordWithCode = (email: string, code: string, newPass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const storedCode = sessionStorage.getItem(`reset_code_${cleanEmail}`);

    if (!storedCode || storedCode !== code.trim()) {
      showToast('error', 'Invalid or expired code');
      return false;
    }

    setUserList((prev) =>
      prev.map((u) => {
        if (u.email.toLowerCase() === cleanEmail) {
          return { ...u, passwordHash: newPass };
        }
        return u;
      })
    );

    sessionStorage.removeItem(`reset_code_${cleanEmail}`);
    showToast('success', 'Password reset successfully. Please log in.');
    setAuthView('login');
    return true;
  };

  const logout = () => {
    setUser(null);
    showToast('info', 'You have logged out');
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return;
    const newProfile = { ...user, ...updatedData };
    setUser(newProfile);
    setUserList((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, ...updatedData } : u))
    );
    showToast('success', 'Profile updated successfully');
  };

  const addUserByAdmin = (newUser: Omit<User, 'id' | 'createdAt'>) => {
    const item: User & { passwordHash: string } = {
      ...newUser,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      passwordHash: 'password'
    };
    setUserList((prev) => [item, ...prev]);
    showToast('success', 'New user added successfully');
  };

  const deleteUserByAdmin = (id: string) => {
    setUserList((prev) => prev.filter((u) => u.id !== id));
    showToast('warning', 'User deleted');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users: userList.map(({ passwordHash, ...u }) => u),
        authView,
        setAuthView,
        isDarkMode,
        toggleDarkMode,
        login,
        register,
        forgotPasswordSendCode,
        resetPasswordWithCode,
        logout,
        updateProfile,
        toasts,
        showToast,
        removeToast,
        addUserByAdmin,
        deleteUserByAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

