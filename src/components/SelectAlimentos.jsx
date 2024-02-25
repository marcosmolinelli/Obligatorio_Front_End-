import React, { useState, useEffect } from 'react';
import style from '../styles/selectAlimentos.module.css';

const SelectAlimentos = ({ options, titulo, handleSelect, selectedValue }) => {
    const [unidad, setUnidad] = useState('');

    useEffect(() => {
        // Restablecer la unidad cuando cambie el alimento seleccionado
        setUnidad('');
    }, [selectedValue]);

    const onChangeSelect = (event) => {
        const opcion = event.target.value;
        const selectedAlimentoObj = options.find((a) => a.id === parseInt(opcion, 10));

        // Actualizar la unidad y llamar a la función handleSelect
        setUnidad(selectedAlimentoObj ? selectedAlimentoObj.porcion : '');
        handleSelect(opcion);
    }

    const alimentos = [{ id: "", name: "Seleccione un alimento" }, ...options];

    return (
        <div className={style.contenedor}>
            <label >{titulo}</label>
            <select className={style.select}
                onChange={onChangeSelect}
                value={selectedValue}
            >
                <option value="" selected disabled>Seleccione alimento:</option>
                {alimentos?.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
            </select>
            {unidad && <p style={{ margin: 0 }}>Porción: {unidad}</p>}
        </div>
    )
}

export default SelectAlimentos;