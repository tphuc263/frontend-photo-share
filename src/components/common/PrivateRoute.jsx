// src/context/UserContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext({
    user: null,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    logout: () => {}
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Kiểm tra xem có token không khi khởi động ứng dụng
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            // Có thể thực hiện gọi API để lấy thông tin người dùng ở đây
        }
    }, []);

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    };

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