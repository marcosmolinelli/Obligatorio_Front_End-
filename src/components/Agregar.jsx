import React, { useState, useEffect } from 'react'
import { agregarRegistroAPI, obtenerAlimentosAPI, validoDatosNoVaciosAgregarAlimento } from '../services/service'
import { useDispatch, useSelector } from 'react-redux'
import SelectAlimentos from './SelectAlimentos'
import { agregarRegistro } from '../slices/registrosSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { useAlimento } from '../customHook/useAlimento'
import style from '../styles/agregar.module.css'




const Agregar = () => {
    const dispatch = useDispatch();
    const [alimento, setAlimento] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [fecha, setFecha] = useState('');
    const [selectedAlimento, setSelectedAlimento] = useState('');
    const alimentos = useSelector((state) => state.alimentosSlice.alimentos);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'alimento') {
            setAlimento(value);
        } else if (name === 'cantidad') {
            setCantidad(value);
        } else if (name === 'fecha') {
            setFecha(value);
        }
    }
    const handleClick = async () => {
        try {
            validoDatosNoVaciosAgregarAlimento(alimento, cantidad, fecha);

            // Validamos que la fecha elegida sea menor o igual a la fecha de hoy
            const fechaActual = moment().format('YYYY-MM-DD');
            if (fecha > fechaActual) {
                throw new Error('La fecha seleccionada debe ser menor o igual a la fecha actual.');
            }

            // Validamos que la cantidad sea mayor que cero
            const cantidadNumerica = parseInt(cantidad, 10);
            if (isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
                throw new Error('La cantidad debe ser un número mayor que cero.');
            }

            const response = await agregarRegistroAPI(alimento, cantidad, fecha);
            let userId = localStorage.getItem("userId");
            if (response.codigo === 200) {
                dispatch(agregarRegistro({
                    id: response.idRegistro,
                    idAlimento: parseInt(alimento, 10),
                    idUsuario: parseInt(userId, 10),
                    cantidad: parseInt(cantidad, 10),
                    fecha: fecha,
                }));
                toast.success('Registro creado con éxito', {
                    autoClose: 2000,
                    icon: false,
                    style: {
                        backgroundColor: '#4CAF50',
                        color: '#FFFFFF',
                    },
                });

                // Restablecer los valores del estado
                setSelectedAlimento('');
                setAlimento('');
                setCantidad('');
                setFecha('');
            }
        } catch (error) {
            const errorMessage = error?.message || 'Hubo un error al procesar la solicitud. Inténtalo de nuevo más tarde.';
            toast.error(errorMessage, {
                autoClose: 2000,
                icon: false,
                style: {
                    backgroundColor: '#FF5252',
                    color: '#FFFFFF',
                },
            });
            // Restablecer los valores del estado
            setSelectedAlimento('');
            setAlimento('');
            setCantidad('');
            setFecha('');
        }
    }

    const handleSelect = (alimento) => {
        setAlimento(alimento);
        setSelectedAlimento(alimento);
    }

    return (
        <div className={style.contenedor}>
            <h2 className={style.title}>Agregar alimento</h2>
            <SelectAlimentos options={alimentos} titulo={"Alimento:"} handleSelect={handleSelect} selectedValue={selectedAlimento} />
            <label >Cantidad:</label>
            <input
                type="text"
                name="cantidad"
                value={cantidad}
                onChange={handleChange}
                className={style.cantidad}
                placeholder="Cantidad"
            />
            <label >Fecha:</label>
            <input
                className={style.fecha}
                type="date"
                id="fecha"
                name="fecha"
                value={fecha}
                onChange={handleChange}
                required
            />

            <button onClick={handleClick} className="btn btn-primary" >
                Agregar alimento
            </button>
        </div>
    )
}

export default Agregar