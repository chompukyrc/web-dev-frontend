import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Page/home'
import Login from './Page/login'
import Register from './Page/register'
import NotFound from './Page/notFound'
import DefaultLayout from './layout/default'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <DefaultLayout>
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        </DefaultLayout>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

// Protect Route คือถ้าไม่ได้ au
const ProtectedRoute = ({ children }) => {
    // const token = localStorage.getItem('token');
    const token = true

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default App
