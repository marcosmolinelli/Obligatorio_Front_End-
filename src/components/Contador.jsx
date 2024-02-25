import React, { useState, useEffect } from 'react';
import moment from 'moment';
import style from '../styles/contado.module.css';

const ContadorTiempo = () => {
  const fechaObjetivo = moment('2024-03-31T00:00:00'); // Fecha objetivo
  const [tiempoRestante, setTiempoRestante] = useState(calcularTiempoRestante());

  function calcularTiempoRestante() {
    const fechaActual = moment(); // Fecha actual
    const duracion = moment.duration(fechaObjetivo - fechaActual);
    return duracion;
  }

  useEffect(() => {
    const intervaloId = setInterval(() => {
      setTiempoRestante((prevTiempoRestante) => calcularTiempoRestante());
    }, 1000);

    return () => clearInterval(intervaloId);
  }, []);

  const formatearDuracion = (duracion) => {
    const dias = Math.floor(duracion.asDays());
    const horas = duracion.hours();
    const minutos = duracion.minutes();
    const segundos = duracion.seconds();

    return `${dias} días, ${horas} horas, ${minutos} minutos, ${segundos} segundos`;
  };

  return (
    <div className={style.contenedor}>
      <h3>Tiempo Restante</h3>
      <p>{formatearDuracion(tiempoRestante)}</p>
    </div>
  );
};

export default ContadorTiempo;