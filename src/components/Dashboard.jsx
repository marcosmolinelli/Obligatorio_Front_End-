import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { obtenerAlimentosAPI, obtenerRegistrosAPI } from '../services/service'
import { cargarAlimentos } from '../slices/alimentosSlice'
import { Outlet } from 'react-router-dom'
import Tarjetas from './Tarjetas';
import Agregar from './Agregar';
import { useSelector } from 'react-redux';
import Registros from './Registros';
import { cargarRegistros } from '../slices/registrosSlice';
import Informe from './Informe';


const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const obtenerRegistros = async () => {
        const response = await obtenerRegistrosAPI();

        if (response && response.registros) {
            const registros = response.registros; // Extraer el array de registros
            dispatch(cargarRegistros(registros));
        }
    };
    const obtenerAlimentos = async () => {
        const alimentosAPI = await obtenerAlimentosAPI();
        //console.log('alimentosAPI', alimentosAPI)
        // setTareas(tareasAPI);
        dispatch(cargarAlimentos(alimentosAPI.alimentos));
    }

    useEffect(() => {
        obtenerRegistros();
        obtenerAlimentos();
    }, [])


    const cerrarSesion = () => {
        // Limpiamos el localStorage
        localStorage.clear();
        // Redirigimos a la página de login
        navigate('/login');
    };
    const listaAlimentos = useSelector((state) => state.alimentosSlice.alimentos);
    return (
        <div>
            <h1>Dashboard</h1>
            <Outlet></Outlet>
            {/* <Agregar /> */}
            {/* <Tarjetas /> */}
            <Agregar />
            <Tarjetas />
            <Registros />
            <Informe />

            {/* Otro contenido del dashboard */}
            <button onClick={cerrarSesion}>Cerrar Sesión</button>
        </div>
    );
};
export default Dashboard;