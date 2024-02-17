import React, { useState, useEffect } from 'react';
import CaloriasTotales from './CaloriasTotales';
import CaloriasDiarias from './CaloriasDiarias';

const Informe = () => {
 

  return (
    <div>
      <CaloriasTotales/>
      <CaloriasDiarias/>
    </div>
  );
};

export default Informe;