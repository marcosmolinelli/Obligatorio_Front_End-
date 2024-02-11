import React from 'react'
import {
    BrowserRouter, Routes, Route, Navigate
} from "react-router-dom";
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';
import Contenedor from '../components/Contenedor';
import Registrarse from '../components/Registrarse';

const Rutas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<p>NO SE HALLÓ</p>}></Route>
                <Route path="/" element={<Contenedor/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/registrarse" element={<Registrarse/>}></Route>
                <Route path="/dashboard" element={<Dashboard />}>
                    {/* <Route index element={<Home />} />

                    <Route path="tarjetas" element={<Tarjetas />}>
                         <Route path=":tareaId" element={<Tarea />} />
                        <Route path="nueva" element={<NuevaTarea />} />
                        <Route index element={<MenuTareas />} /> 
                    </Route> */}

                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Rutas
