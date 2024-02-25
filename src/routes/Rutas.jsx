import React from 'react'
import { Navigate } from "react-router-dom";

import {
    BrowserRouter, Routes, Route
} from "react-router-dom";
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';
import Registrarse from '../components/Registrarse';

const Rutas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Navigate replace to={"/"}></Navigate>} />
                <Route path="/" element={<Dashboard />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/registrarse" element={<Registrarse />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Rutas
