import Grafica from './Grafica';
import { useAlimento } from '../customHook/useAlimento';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

const GraficaDeCaloriasPorFecha = () => {
  const obtenerAlimento = useAlimento();
  const registrosRedux = useSelector((state) => state.registrosSlice.registros);

  const fechaActual = moment();
  const inicioSemanaPasada = moment().subtract(7, 'days');
  const finSemanaPasada = moment().subtract(1, 'days');

  const esRegistroDeLaSemanaPasada = (fechaRegistro) => {
    const fechaRegistroMoment = moment(fechaRegistro);
    return fechaRegistroMoment.isSameOrAfter(inicioSemanaPasada) && fechaRegistroMoment.isSameOrBefore(finSemanaPasada);
  };

  const extraerNumeroPorcion = (porcion) => {
    if (porcion && porcion.match) {
      const match = porcion.match(/\d+/);
      return match ? parseInt(match[0], 10) : 1;
    }
    return 1;
  };

  // Obtener los idAlimentos necesarios para useAlimento
  const idsAlimentos = registrosRedux
    .filter((registro) => esRegistroDeLaSemanaPasada(registro.fecha))
    .map((registro) => registro.idAlimento);

  // Obtener la información de alimentos
  const alimentos = obtenerAlimento(idsAlimentos);

  // Obtener los días de la semana pasada en orden
  const diasSemanaPasada = [];
  for (let i = 6; i >= 0; i--) {
    const dia = finSemanaPasada.clone().subtract(i, 'days').format('dddd');
    diasSemanaPasada.push(dia);
  }

  // Calcular las calorías por día
  const diasConCalorias = registrosRedux.reduce((acumulador, valActual) => {
    const fechaRegistroMoment = moment(valActual.fecha);
    const nombreDelDiaRegistro = fechaRegistroMoment.format('dddd');

    if (esRegistroDeLaSemanaPasada(valActual.fecha) && alimentos[valActual.idAlimento]) {
      const porcionAlimento = alimentos[valActual.idAlimento].porcion;
      const numeroPorcion = extraerNumeroPorcion(porcionAlimento);
      const cantidadAjustada = valActual.cantidad / numeroPorcion;
      const caloriasPorUnidad = alimentos[valActual.idAlimento].calorias;

      if (caloriasPorUnidad) {
        acumulador[nombreDelDiaRegistro] = (acumulador[nombreDelDiaRegistro] || 0) + cantidadAjustada * caloriasPorUnidad;
      }
    }

    return acumulador;
  }, {});

  // Generar etiquetas y datos para la gráfica
  const etiquetas = diasSemanaPasada;
  const datos = etiquetas.map((dia) => diasConCalorias[dia] || 0);

  const limiteCantidad = 1000;
  const datosFiltrados = datos.map(calorias => (calorias > limiteCantidad ? limiteCantidad : calorias));

  return (
    <Grafica
      etiquetas={etiquetas}
      datos={datosFiltrados}
      nombreGrafica={"Grafica de alimentación"}
      nombreDatos={"Calorías acumuladas"}
    />
  );
}

export default GraficaDeCaloriasPorFecha;