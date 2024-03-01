import Grafica from './Grafica';
import { useAlimentoGrafica } from '../customHook/useAlimentoGrafica';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from '../styles/graficaPorCantidadAlimentos.module.css';




const GraficaDeCantidadPorAlimentos = () => {
    const obtenerAlimento = useAlimentoGrafica();
    const dispatch = useDispatch();
    const registrosRedux = useSelector((state) => state.registrosSlice.registros);

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
    const resultado = registrosRedux.reduce(callBackAlimentosIngeridos, {});
    //obtenemos la cantidad de alimentos
    const valores = Object.values(resultado);
    //obtenemos el id del alimento
    const listaAlimentoId = Object.keys(resultado);

    const nombresAlimentos = listaAlimentoId.map(
        aId => {
            return obtenerAlimento(aId)?.nombre
        }
    )

    // const obtenerRegistros = async () => {
    //     const response = await obtenerRegistrosAPI();

    //     if (response && response.registros) {
    //         const registros = response.registros; // Extraer el array de registros
    //         dispatch(cargarRegistros(registros));
    //         setListaRegistros(registros);
    //     }
    // };

    // useEffect(() => {
    //     obtenerRegistros();
    // }, [])

    return (
        <Grafica
            etiquetas={nombresAlimentos}
            datos={valores}
            nombreGrafica={"Grafica de cantidades de alimentos"}
            nombreDatos={"Alimentos ingeridos"}
            // Aplicar la clase de estilo al nombre de la gráfica
            estiloNombreGrafica={style.nombreGrafica}  // Cambio aquí
        />
    )
}

export default GraficaDeCantidadPorAlimentos