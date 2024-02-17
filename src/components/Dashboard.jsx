import React, { useState, useEffect } from 'react'
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
import Grafica from './Grafica';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Accordion } from 'react-bootstrap';
import { useAlimento } from '../customHook/useAlimento';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [listaRegistros, setListaRegistros] = useState([]);
    const obtenerAlimento = useAlimento();

    const callBackAlimentosIngeridos = (acumulador, valActual) => {
        //si los alimentos estan cargados o no
        //Preguntamos si hay alimentos cargados por el usuario

        //si el id del alimento esta cargado
        if (acumulador[valActual.idAlimento]) {
            //sumamos uno
            acumulador[valActual.idAlimento] = acumulador[valActual.idAlimento] + 1;
        }
        //sino, lo creamos y empezamos en 1
        else {
            acumulador[valActual.idAlimento] = 1;
        }

        return acumulador
    }
    //obtenemos el resultado de la suma de cantidad ingerida por alimentos
    const resultado = listaRegistros.reduce(callBackAlimentosIngeridos, {});
    //obtenemos la cantidad de alimentos
    const valores = Object.values(resultado);
    //obtenemos el id del alimento
    const listaAlimentoId = Object.keys(resultado);



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
                        <Grafica
                            etiquetas={listaAlimentoId}
                            datos={valores}
                            nombreGrafica={"Grafica cantidad de alimentos"}
                            nombreDatos={"Nombre Datos"}
                        />
                    </Col>
                </Row>

            </Container>


        </div>
    );
};
export default Dashboard;