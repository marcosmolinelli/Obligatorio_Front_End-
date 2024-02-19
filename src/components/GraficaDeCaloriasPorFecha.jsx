import Grafica from './Grafica';
import { useAlimentoGrafica } from '../customHook/useAlimentoGrafica';
import { obtenerRegistrosAPI } from '../services/service'
import React, { useState, useEffect } from 'react'
import { cargarRegistros } from '../slices/registrosSlice';
import { useDispatch } from 'react-redux'

const GraficaDeCaloriasPorFecha = () => {
    const [listaRegistros, setListaRegistros] = useState([]);
    const obtenerAlimento = useAlimentoGrafica();
    const dispatch = useDispatch();

    const fechaActual = new Date();
    const diaDeLaSemanaActual = fechaActual.getDay();
    const diasDiferencia = diaDeLaSemanaActual === 0 ? 6 : diaDeLaSemanaActual - 1; // Ajuste para manejar que el domingo es 0
    const domingoDeEstaSemana = new Date(
        fechaActual.getFullYear(),
        fechaActual.getMonth(),
        fechaActual.getDate() - diasDiferencia
    );

    const esRegistroDeEstaSemana = (fechaRegistro) => {
        const fechaRegistroDate = new Date(fechaRegistro);
        return fechaRegistroDate >= domingoDeEstaSemana && fechaRegistroDate <= fechaActual;
    };
    const diasConCantidadesCero = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].reduce((acumulador, dia) => {
        acumulador[dia] = 0;
        return acumulador;
    }, {});

    const callBackAlimentosIngeridos = (acumulador, valActual) => {
        console.log('valActual.fecha', esRegistroDeEstaSemana(valActual.fecha))
        if (esRegistroDeEstaSemana(valActual.fecha)) {
            const fechaRegistroDate = new Date(valActual.fecha);
            const diaDeLaSemanaRegistro = fechaRegistroDate.getDay();
            const diasDeLaSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            const nombreDelDiaRegistro = diasDeLaSemana[diaDeLaSemanaRegistro];

            acumulador[nombreDelDiaRegistro] = (acumulador[nombreDelDiaRegistro] || 0) + valActual.cantidad;
            console.log('acumulador, valActual.cantidad', acumulador, valActual.cantidad)

        }
        return acumulador;
    };
    const obtenerRegistros = async () => {
        try {
            const response = await obtenerRegistrosAPI();

            if (response && response.registros) {
                const registros = response.registros;
                dispatch(cargarRegistros(registros));
                setListaRegistros(registros);
            }
        } catch (error) {
            console.error("Error al obtener registros:", error);
        }
    };

    useEffect(() => {
        obtenerRegistros();
    }, []);
    const resultado = listaRegistros.reduce(callBackAlimentosIngeridos, { ...diasConCantidadesCero });
    const etiquetas = Object.keys(resultado);
    const datos = Object.values(resultado);

    // Limitar la cantidad de datos para mejorar la visualización
    const limiteCantidad = 10000; // Puedes ajustar este valor según tus necesidades
    const datosFiltrados = datos.map(cantidad => (cantidad > limiteCantidad ? limiteCantidad : cantidad));

    return (
        <Grafica
            etiquetas={etiquetas}
            datos={datosFiltrados}
            nombreGrafica={"Grafica de alimentación"}
            nombreDatos={"Calorías acumuladas"}
        />
    );
};

export default GraficaDeCaloriasPorFecha;