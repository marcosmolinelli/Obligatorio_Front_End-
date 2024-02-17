import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAlimento } from '../customHook/useAlimento';

const CaloriasDiarias = () => {
  const registrosRedux = useSelector((state) => state.registrosSlice.registros);
  const idsAlimentos = registrosRedux.map((registro) => registro.idAlimento);
  const obtenerAlimentos = useAlimento();
  const alimentos = obtenerAlimentos(idsAlimentos);

  const [totalCalorias, setTotalCalorias] = useState(0);
  const [today, setToday] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const registrosHoy = registrosRedux.filter(
      (registro) => registro.fecha === today
    );

    const extraerNumeroPorcion = (porcion) => {
      const match = porcion.match(/\d+/);
      return match ? parseInt(match[0], 10) : 1;
    };

    const calcularCaloriasDiarias = () => {
      if (!alimentos || !registrosHoy) {
        return;
      }

      let total = 0;

      registrosHoy.forEach((registro, index) => {
        const cantidadConsumida = registro.cantidad;
        const porcionAlimento = alimentos[index]?.porcion;
        const numeroPorcion = extraerNumeroPorcion(porcionAlimento);
        const cantidadAjustada = cantidadConsumida / numeroPorcion;
        const caloriasPorUnidad = alimentos[index]?.calorias;

        if (caloriasPorUnidad) {
          total += cantidadAjustada * caloriasPorUnidad;
        }
      });

      setTotalCalorias(total);
    };

    calcularCaloriasDiarias();
  }, [registrosRedux, alimentos, today]); 

  return (
    <div>
      <h2>Calorías Totales del Día de Hoy</h2>
      <p>Total de calorías ingeridas hoy: {totalCalorias} kcal</p>
    </div>
  );
};

export default CaloriasDiarias;