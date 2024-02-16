import React, { useEffect, useState } from 'react';

const CaloriasTotales = ({ registros, alimentos }) => {
  const [totalCalorias, setTotalCalorias] = useState(0);

  useEffect(() => {
    // Función para calcular las calorías totales
    const calcularCaloriasTotales = () => {
      if (!alimentos) {
        // Asegurarse de que alimentos esté definido antes de continuar
        return;
      }
      
      let total = 0;

      // Iterar sobre todos los registros del usuario y sumar las calorías
      registros.forEach((registro, index) => {
        const cantidadConsumida = registro.cantidad;
        const caloriasPorUnidad = alimentos[index]?.calorias;

        if (caloriasPorUnidad) {
          total += cantidadConsumida * caloriasPorUnidad;
        }
      });

      setTotalCalorias(total);
    };

    calcularCaloriasTotales();
  }, [registros, alimentos]);

  return (
    <div>
      <h2>Calorías Totales</h2>
      <p>Total de calorías ingeridas: {totalCalorias} kcal</p>
    </div>
  );
};

export default CaloriasTotales;