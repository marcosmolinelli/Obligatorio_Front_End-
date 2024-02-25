import React, { useState, useEffect } from 'react';
import CaloriasTotales from './CaloriasTotales';
import CaloriasDiarias from './CaloriasDiarias';
import style from '../styles/informes.module.css'

const Informe = () => {


  return (
    <div className={style.contenedor}>
      <h2>Informe de calorias</h2>
      <CaloriasTotales />
      <CaloriasDiarias />
    </div>
  );
};

export default Informe;