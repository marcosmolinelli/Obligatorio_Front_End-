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
        //console.log('alimentosAPI', alimentosAPI)
        // setTareas(tareasAPI);
        dispatch(cargarAlimentos(alimentosAPI.alimentos));
    }



    useEffect(() => {
        obtenerRegistros();
        obtenerAlimentos();
        //obtenerUsuariosPorPaisAPI();
    }, [])

    return (
        <div>
            <Container>
                <Menu />
                <Row>
                    <Col>
                        <Agregar />
                        <Registros />
                        <Informe />
                        <Outlet></Outlet>
                    </Col>
                    <Col>
                        <GraficaDeCantidadPorAlimentos />
                        <GraficaDeCaloriasPorFecha />
                        <MapaUsuarios />
                    </Col>
                </Row>

            </Container>


        </div>
    );
};
export default Dashboard;