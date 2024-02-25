import React, { useState, useEffect } from 'react';
import Registro from './Registro';
import { useSelector } from 'react-redux';
import { useAlimento } from '../customHook/useAlimento';
import moment from 'moment';
import style from '../styles/registros.module.css'

const Registros = () => {
    const registros = useSelector((state) => state.registrosSlice.registros);
    const idsAlimentos = registros.map((registro) => registro.idAlimento);
    const obtenerAlimentos = useAlimento();
    const alimentos = obtenerAlimentos(idsAlimentos);

    const [filtro, setFiltro] = useState('todo'); // 'all' por defecto
    const [registrosFiltrados, setRegistrosFiltrados] = useState([]);

    // Función para filtrar registros según la opción seleccionada
    const filtroRegistros = () => {
        const fechaActual = moment();
        switch (filtro) {
            case 'ultimaSemana':
                setRegistrosFiltrados(registros.filter((registro) => {
                    const registroDate = moment(registro.fecha);
                    return registroDate.isSameOrAfter(fechaActual.clone().subtract(7, 'days')) && registroDate.isSameOrBefore(fechaActual);
                }));
                break;
            case 'ultimoMes':
                setRegistrosFiltrados(registros.filter((registro) => {
                    const registroDate = moment(registro.fecha);
                    return registroDate.isSameOrAfter(fechaActual.clone().subtract(1, 'months')) && registroDate.isSameOrBefore(fechaActual);
                }));
                break;
            default:
                setRegistrosFiltrados(registros);
        }
    };

    useEffect(() => {
        filtroRegistros();
    }, [filtro, registros]); // Se ejecuta cada vez que filtro o registros cambian

    return (<>
        <h2>Listado de registros</h2>
        <div className={style.registros}>
            <div >
                <label>
                    Filtro:
                </label>
                <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                    <option value="todo">Todo</option>
                    <option value="ultimaSemana">Última semana</option>
                    <option value="ultimoMes">Último mes</option>
                </select>
            </div>
            {registrosFiltrados.length > 0 ? (
                <table className={style.contenido}>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Nombre del Alimento</th>
                            <th>Imagen</th>
                            <th>Cantidad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrosFiltrados.map((registro, index) => (
                            <Registro key={registro.id} {...registro} alimento={alimentos[index]} imagen={`https://calcount.develotion.com/imgs/${alimentos[index]?.imagen}.png`} />
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className={style.p}>No hay registros disponibles</p>
            )}
        </div>
    </>
    );
};

export default Registros;