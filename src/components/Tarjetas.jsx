import React from 'react'
import Tarjeta from './Tarjeta'
import { useSelector, } from 'react-redux';

const Tarjetas = () => {

    const alimentos = useSelector((state) => state.alimentosSlice?.alimentos);


    return (
        <div className="tarjetas">
            {
                alimentos.length > 0 ? alimentos.map(
                    alimento => <Tarjeta key={alimento.nombre} {...alimento} ></Tarjeta>
                )
                    : <h1>Cargando...</h1>
            }
        </div>
    )
}

export default Tarjetas

