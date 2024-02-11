import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { obtenerAlimentosAPI } from '../services/service'
import { cargarAlimentos } from '../slices/alimentosSlice'
import { Outlet } from 'react-router-dom'



const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const obtenerAlimentos = async () => {
        const alimentosAPI = await obtenerAlimentosAPI();
        console.log('alimentosAPI', alimentosAPI)
        // setTareas(tareasAPI);
        dispatch(cargarAlimentos(alimentosAPI));
    }

    const cerrarSesion = () => {
        // Limpiamos el localStorage
        localStorage.clear();
        // Redirigimos a la página de login
        navigate('/login');
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <Outlet></Outlet>

            {/* Otro contenido del dashboard */}
            <button onClick={cerrarSesion}>Cerrar Sesión</button>
        </div>
    );
};

export default Dashboard;