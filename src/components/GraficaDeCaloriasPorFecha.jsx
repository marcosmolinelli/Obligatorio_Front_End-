import Grafica from './Grafica';
import { useAlimento } from '../customHook/useAlimento';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

const GraficaDeCaloriasPorFecha = () => {
  const obtenerAlimento = useAlimento();
  const registrosRedux = useSelector((state) => state.registrosSlice.registros);
  const [etiquetas, setEtiquetas] = useState([]);
  const [datosFiltrados, setDatosFiltrados] = useState([]);

  useEffect(() => {
    const fechaActual = moment();
    const inicioSemanaPasada = moment().subtract(7, 'days');

    const esRegistroDeLaSemanaPasada = (fechaRegistro) => {
      const fechaRegistroMoment = moment(fechaRegistro);
      return fechaRegistroMoment.isSameOrAfter(inicioSemanaPasada) && fechaRegistroMoment.isSameOrBefore(fechaActual);
    };

    const extraerNumeroPorcion = (porcion) => {
      if (porcion && porcion.match) {
        const match = porcion.match(/\d+/);
        return match ? parseInt(match[0], 10) : 1;
      }
      return 1;
    };

    const idsAlimentos = registrosRedux
      .filter((registro) => esRegistroDeLaSemanaPasada(registro.fecha))
      .map((registro) => registro.idAlimento);

    const alimentos = obtenerAlimento(idsAlimentos);

    const diasSemanaPasada = [];
    for (let i = 6; i >= 0; i--) {
      const dia = fechaActual.clone().subtract(i, 'days').format('dddd');
      diasSemanaPasada.push(dia);
    }

    const diasConCalorias = registrosRedux.reduce((acumulador, valActual) => {
      const fechaRegistroMoment = moment(valActual.fecha);
      const nombreDelDiaRegistro = fechaRegistroMoment.format('dddd');

      const alimentoAsociado = alimentos.find((alimento) => alimento.id === valActual.idAlimento);

      if (esRegistroDeLaSemanaPasada(valActual.fecha) && alimentoAsociado) {
        const porcionAlimento = alimentoAsociado.porcion;
        const numeroPorcion = extraerNumeroPorcion(porcionAlimento);
        const cantidadAjustada = valActual.cantidad / numeroPorcion;
        const caloriasPorUnidad = alimentoAsociado.calorias;

        if (caloriasPorUnidad) {
          acumulador[nombreDelDiaRegistro] = (acumulador[nombreDelDiaRegistro] || 0) + cantidadAjustada * caloriasPorUnidad;
        }
      }

      return acumulador;
    }, {});

    const etiquetas = diasSemanaPasada;
    const datos = etiquetas.map((dia) => diasConCalorias[dia] || 0);

    const limiteCantidad = 10000;
    const datosFiltrados = datos.map(calorias => (calorias > limiteCantidad ? limiteCantidad : calorias));

    setEtiquetas(etiquetas);
    setDatosFiltrados(datosFiltrados);
  }, [registrosRedux]);

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