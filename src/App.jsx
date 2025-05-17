import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/common/PrivateRoute';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <UserProvider value={{ isAuthenticated, setIsAuthenticated }}>
            <Router>
                <div className="app-container">
                    {isAuthenticated && <Header />}
                    <main className="main-content">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/"
                                element={
                                    <PrivateRoute>
                                        <Home />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/explore"
                                element={
                                    <PrivateRoute>
                                        <Explore />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/profile/:username"
                                element={
                                    <PrivateRoute>
                                        <Profile />
                                    </PrivateRoute>
                                }
                            />
                            <Route path="/404" element={<NotFound />} />
                            <Route path="*" element={<Navigate to="/404" />} />
                        </Routes>
                    </main>
                    {isAuthenticated && <Navigation />}
                </div>
            </Router>
        </UserProvider>
    );
}

export default App;