import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { obtenerAlimentosAPI, obtenerRegistrosAPI } from '../services/service'
import { cargarAlimentos } from '../slices/alimentosSlice'
import { Outlet } from 'react-router-dom'
import Agregar from './Agregar';
import { useSelector } from 'react-redux';
import Registros from './Registros';
import { cargarRegistros } from '../slices/registrosSlice';
import Informe from './Informe';
import Menu from './Menu';
import GraficaDeCantidadPorAlimentos from './GraficaDeCantidadPorAlimentos'; import MapaUsuarios from './MapaUsuarios';
import { cargarUsuariosPorPais } from '../slices/usuariosPorPaisesSlice'
import GraficaDeCaloriasPorFecha from './GraficaDeCaloriasPorFecha';
import ContadorTiempo from './Contador';



const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [listaRegistros, setListaRegistros] = useState([]);


    const obtenerRegistros = async () => {
        const response = await obtenerRegistrosAPI();

        if (response && response.registros) {
            const registros = response.registros; // Extraer el array de registros
            dispatch(cargarRegistros(registros));
            setListaRegistros(registros);
        }
    };
    const obtenerAlimentos = async () => {
        const alimentosAPI = await obtenerAlimentosAPI();
        dispatch(cargarAlimentos(alimentosAPI.alimentos));
    }
    const [apiKey, setapiKey] = useState("")

    useEffect(() => {
        // Verificamos si hay datos en el localStorage para saber si hay usuario logueado
        const usuarioEnSesion = localStorage.getItem("apiKey");
        setapiKey(usuarioEnSesion)

        if (usuarioEnSesion) {
            obtenerRegistros();
            obtenerAlimentos();
        } else {
            //navegar al login
            navigate("/login");
        }
    }, [])

    return (
        <Container>
            {apiKey ? (
                <>
                    <Menu />
                    <Row>
                        <Col>
                            <Agregar />
                            <Registros />
                            <Informe />
                            <ContadorTiempo />
                        </Col>
                        <Col>
                            <GraficaDeCantidadPorAlimentos />
                            <GraficaDeCaloriasPorFecha />
                            <MapaUsuarios />
                        </Col>
                    </Row>
                </>
            ) : (
                <p>No hay usuario logueado. Redirigiendo a la página de inicio de sesión...</p>
            )}
        </Container>
    );
};
export default Dashboard;