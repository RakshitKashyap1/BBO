/**
 * @file AuthContext.jsx
 * @description Provides a global state for user authentication using React Context.
 * This ensures that user data and login/logout functions are available to any component in the app.
 */

import React, { createContext, useContext, useState } from 'react';
import { mockUsers } from '../data/mockData';

// Create a Context object for authentication
const AuthContext = createContext(undefined);

/**
 * AuthProvider Component:
 * Wraps the application to provide branding and auth state to all children.
 * @param {ReactNode} children - The components that will have access to the auth state.
 */
export function AuthProvider({ children }) {
    // State to hold the currently logged-in user object
    const [user, setUser] = useState(null);

    /**
     * login: Simulates a login process by finding a user with a specific role.
     * @param {string} role - The role to login as (e.g., 'advertiser', 'owner', 'admin').
     */
    const login = (role) => {
        // In a real app, this would be an API call with credentials
        const foundUser = mockUsers.find(u => u.role === role);
        if (foundUser) {
            setUser(foundUser);
        }
    };

    /**
     * logout: Resets the user state to null, effectively logging out of the session.
     */
    const logout = () => {
        setUser(null);
    };

    // Provide the user state and auth actions to the component tree
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * useAuth: Custom hook to easily access authentication context from any functional component.
 * @returns {Object} - Contains { user, login, logout }.
 * @throws {Error} - If used outside of an AuthProvider.
 */
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

