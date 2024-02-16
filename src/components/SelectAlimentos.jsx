import React, { useState } from 'react'

const SelectAlimentos = ({ options, titulo, handleSelect, style }) => {

    const onChangeSelect = (event) => {
        const opcion = event.target.value;
        handleSelect(opcion);
    }
    const alimentos = [{ id: "", name: "Seleccione un alimento" }, ...options];

    return (
        <>
            <label >{titulo}
                < select style={{ display: 'block', marginTop: '5px' }} onChange={onChangeSelect}>
                    {alimentos?.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
                </select >
            </label>
        </>
    )
}

export default SelectAlimentos