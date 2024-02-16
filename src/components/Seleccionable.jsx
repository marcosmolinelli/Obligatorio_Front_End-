import React, { useState } from 'react'

const Seleccionable = ({ options, titulo, handleSelect, style }) => {

    const onChangeSelect = (event) => {
        const opcion = event.target.value;
        handleSelect(opcion);
    }
    const paises = [{ id: "", name: "Seleccione un país" }, ...options];

    console.log('Valor de options:', options);
    return (
        <>
            <label style={style}>{titulo}
                < select style={{ display: 'block', marginTop: '5px' }} onChange={onChangeSelect}>
                    {paises?.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select >
            </label>
        </>
    )
}

export default Seleccionable