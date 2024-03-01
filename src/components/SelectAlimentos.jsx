import React, { useState, useEffect } from 'react';
import style from '../styles/agregar.module.css'

const SelectAlimentos = ({ options, titulo, handleSelect, selectedValue }) => {
    const [porcion, setPorcion] = useState('');

    useEffect(() => {
        // Buscar la porción correspondiente al alimento seleccionado
        const selectedAlimentoObj = options.find((a) => a.id === parseInt(selectedValue, 10));
        setPorcion(selectedAlimentoObj ? selectedAlimentoObj.porcion : '');
    }, [selectedValue, options]);

    const onChangeSelect = (event) => {
        const opcion = event.target.value;
        const selectedAlimentoObj = options.find((a) => a.id === parseInt(opcion, 10));

        // Actualizar la porción y llamar a la función handleSelect
        setPorcion(selectedAlimentoObj ? selectedAlimentoObj.porcion : '');
        handleSelect(opcion);
    }

    const alimentos = [{ id: "", nombre: "Seleccione un alimento" }, ...options];

    return (
        <div >
            <label>{titulo}</label>
            <select
                style={{ marginRight: '10px' }}
                onChange={onChangeSelect}
                value={selectedValue}
            >
                {alimentos?.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
            </select>
            {porcion && <p style={{ margin: 0 }}>Porción: {porcion}</p>}
        </div>
    );
}

export default SelectAlimentos;