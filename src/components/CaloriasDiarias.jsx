import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAlimento } from '../customHook/useAlimento';
import moment from 'moment';

const CaloriasDiarias = () => {
  const registrosRedux = useSelector((state) => state.registrosSlice.registros);
  const idsAlimentos = registrosRedux.map((registro) => registro.idAlimento);
  const obtenerAlimentos = useAlimento();
  const [totalCalorias, setTotalCalorias] = useState(0);
  const [today, setToday] = useState("");
  const caloriasDiariasPrevistas = localStorage.getItem("caloriasDiariasPrevistas");
  const alimentos = obtenerAlimentos(idsAlimentos);

  useEffect(() => {
    const obtenerHoy = moment().format('YYYY-MM-DD');
    setToday(obtenerHoy);
    const registrosHoy = registrosRedux.filter(
      (registro) => registro.fecha === today
    );

    const extraerNumeroPorcion = (porcion) => {
      const porcionSinUltimoCaracter = porcion.slice(0, -1);
      const match = porcionSinUltimoCaracter.match(/\d+/);
      return match ? parseInt(match[0], 10) : 1;
    }

    const calcularCaloriasDiarias = () => {
      if (alimentos.length == 0 || alimentos == undefined || registrosHoy.length == 0 || registrosHoy == undefined) {
        return;
      }

      let total = 0;

      registrosHoy.forEach((registro) => {
        const idAlimento = registro.idAlimento;
        const alimento = alimentos.find((a) => a.id === idAlimento);


        if (alimento) {
          const cantidadConsumida = registro.cantidad;
          const porcionAlimento = alimento.porcion;
          const numeroPorcion = extraerNumeroPorcion(porcionAlimento);
          const cantidadAjustada = cantidadConsumida / numeroPorcion;
          const caloriasPorUnidad = alimento.calorias;

          if (caloriasPorUnidad) {
            total += cantidadAjustada * caloriasPorUnidad;
          }
        }
      });

      setTotalCalorias(total);
    };

    calcularCaloriasDiarias();
  }, [registrosRedux, alimentos, today]);

  // Determinamos el color según las calorias previstas
  const getColor = () => {
    if (totalCalorias > caloriasDiariasPrevistas) {
      return 'red';
    } else if (totalCalorias >= caloriasDiariasPrevistas * 0.9) {
      return 'yellow';
    } else {
      return 'green';
    }
  };
  const color = getColor();


  return (
    <div>
      <h3>Calorías Totales del Día de Hoy</h3>
      <p>Total de calorías ingeridas hoy: <span style={{ color }}> {totalCalorias} kcal </span></p>
    </div>
  );
};

export default CaloriasDiarias;