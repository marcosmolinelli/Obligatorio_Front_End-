import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAlimento } from '../customHook/useAlimento';

const CaloriasTotales = () => {
  const registrosRedux = useSelector((state) => state.registrosSlice.registros);
  const idsAlimentos = registrosRedux.map((registro) => registro.idAlimento);
  const obtenerAlimentos = useAlimento();
  const alimentos = obtenerAlimentos(idsAlimentos);

  const [totalCalorias, setTotalCalorias] = useState(0);

  useEffect(() => {
    // Función para extraer el número de la porción
    const extraerNumeroPorcion = (porcion) => {
      // Utilizamos una expresión regular para extraer el número
      const match = porcion.match(/\d+/);
      return match ? parseInt(match[0], 10) : 1;
    };

    // Función para calcular las calorías totales
    const calcularCaloriasTotales = () => {
      if (!alimentos || !registrosRedux) {
        return;
      }

      let total = 0;

      // Iteraramos sobre todos los registros del usuario y sumar las calorías
      registrosRedux.forEach((registro, index) => {
        const cantidadConsumida = registro.cantidad;
        const porcionAlimento = alimentos[index]?.porcion;

        // Obtenemos el número de la porción
        const numeroPorcion = extraerNumeroPorcion(porcionAlimento);

        // Calculamos la cantidad ajustada
        const cantidadAjustada = cantidadConsumida / numeroPorcion;

        const caloriasPorUnidad = alimentos[index]?.calorias;

        if (caloriasPorUnidad) {
          total += cantidadAjustada * caloriasPorUnidad;
        }
      });

      setTotalCalorias(total);
    };

    calcularCaloriasTotales();
  }, [registrosRedux, alimentos]);

  return (
    <div>
      <h3>Calorías Totales</h3>
      <p>Total de calorías ingeridas: {totalCalorias} kcal</p>
    </div>
  );
};

export default CaloriasTotales;