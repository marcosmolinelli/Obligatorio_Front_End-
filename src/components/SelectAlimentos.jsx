import React, { useState, useEffect } from 'react';

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
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <label style={{ marginRight: '10px' }}>{titulo}</label>
            <select
                style={{ marginRight: '10px' }}
                onChange={onChangeSelect}
                value={selectedValue}
            >
                {alimentos?.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
            </select>
            {unidad && <p style={{ margin: 0 }}>Porción: {unidad}</p>}
        </div>
    )
}

export default SelectAlimentos;