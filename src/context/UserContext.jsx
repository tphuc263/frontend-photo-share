import { createContext, useContext, useState } from 'react';

// Create context with default values
const UserContext = createContext({
    user: null,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    logout: () => {}
});

// Hook to use the context
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Logout function
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        // Add any additional logout logic here (clear tokens, etc.)
    };

    // Value object to provide through context
    const value = {
        user,
        isAuthenticated,
        setUser,
        setIsAuthenticated,
        logout
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;