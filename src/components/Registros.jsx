import React, { useState, useEffect } from 'react';
import Registro from './Registro';
import { useSelector } from 'react-redux';
import { useAlimento } from '../customHook/useAlimento';

const Registros = () => {
    const registros = useSelector((state) => state.registrosSlice.registros);
    const idsAlimentos = registros.map((registro) => registro.idAlimento);
    const obtenerAlimentos = useAlimento();
    const alimentos = obtenerAlimentos(idsAlimentos);

    const [filtro, setFiltro] = useState('all'); // 'all' por defecto
    const [registrosFiltrados, setRegistrosFiltrados] = useState([]);

    // Función para filtrar registros según la opción seleccionada
    const filtroRegistros = () => {
        const currentDate = new Date();
        switch (filtro) {
            case 'lastWeek':
                setRegistrosFiltrados(registros.filter((registro) => {
                    const registroDate = new Date(registro.fecha);
                    return currentDate - registroDate <= 7 * 24 * 60 * 60 * 1000;
                }));
                break;
            case 'lastMonth':
                setRegistrosFiltrados(registros.filter((registro) => {
                    const registroDate = new Date(registro.fecha);
                    return currentDate - registroDate <= 30 * 24 * 60 * 60 * 1000;
                }));
                break;
            default:
                setRegistrosFiltrados(registros);
        }
    };

    useEffect(() => {
        filtroRegistros();
    }, [filtro, registros]); // Se ejecuta cada vez que filtro o registros cambian

    return (
        <div className="registros">
            <div className="filter-container">
                <label>
                    Filtro:
                    <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                        <option value="all">Todo</option>
                        <option value="lastWeek">Última semana</option>
                        <option value="lastMonth">Último mes</option>
                    </select>
                </label>
            </div>
            {registrosFiltrados.length > 0 ? (
                <table className="table-container">
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
                <h1>No hay registros disponibles</h1>
            )}
        </div>
    );
};

export default Registros;