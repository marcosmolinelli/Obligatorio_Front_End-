import React, { useRef, useState, useEffect } from 'react'
import { agregarRegistroAPI, obtenerAlimentosAPI, validoDatosNoVaciosAgregarAlimento } from '../services/service'
import { useDispatch, useSelector } from 'react-redux'
import SelectAlimentos from './SelectAlimentos'
import { cargarAlimentos } from '../slices/alimentosSlice'
import { agregarRegistro } from '../slices/registrosSlice'


const Agregar = () => {
    const refInput = useRef(null)
    const dispatch = useDispatch();
    const [alimento, setAlimento] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [fecha, setFecha] = useState('');
    const inputRefUsu = useRef(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [succesMessage, setSuccesMessage] = useState('');
    const alimentos = useSelector((state) => state.alimentosSlice.alimentos);
    const registrosRedux = useSelector((state) => state.registrosSlice.registros);


    // const obtenerAlimentos = async () => {
    //     const alimentosAPI = await obtenerAlimentosAPI();
    //     console.log('alimentosAPI', alimentosAPI)
    //     // setTareas(tareasAPI);
    //     if (alimentosAPI && alimentosAPI.alimentos) {
    //         const alimentos = alimentosAPI.alimentos; // Extraer el array de alimentos
    //         dispatch(cargarAlimentos(alimentos));
    //     }
    // }

    const obtenerAlimentos = async () => {
        const alimentosAPI = await obtenerAlimentosAPI();
        //console.log('alimentosAPI', alimentosAPI)
        // setTareas(tareasAPI);
        dispatch(cargarAlimentos(alimentosAPI.alimentos));
    }

    useEffect(() => {
        obtenerAlimentos();
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'alimento') {
            setAlimento(value);
        } else if (name === 'cantidad') {
            setCantidad(value);
        } else if (name === 'fecha') {  // Cambiado de 'setFecha'
            setFecha(value);
        }
    }


    const handleClick = async () => {
        try {
            validoDatosNoVaciosAgregarAlimento(alimento, cantidad, fecha);
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
                setSuccesMessage(response.mensaje);
                // Limpiar los campos después de una operación exitosa
                setAlimento('');
                setCantidad('');
                setFecha('');
            }
        } catch (error) {
            // Manejo de errores: muestra el mensaje de error al usuario
            setErrorMessage(error.message);
        }
    }

    const handleSelect = (alimento) => {
        setAlimento(alimento);
    }

    return (
        <div >
            <div >
                <h3 >Agregar alimento</h3>
                <SelectAlimentos options={alimentos} titulo={"Alimento:"} handleSelect={handleSelect} />
                <label >Cantidad:
                    <input
                        ref={inputRefUsu}
                        type="text"
                        name="cantidad"
                        value={cantidad}
                        onChange={handleChange}
                        className="form-control mt-1"
                        placeholder="Cantidad"
                    /></label>
                <br />
                <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    value={fecha}
                    onChange={handleChange}
                    required
                />
                <br />
                <button onClick={handleClick} className="btn btn-primary">
                    Agregar alimento
                </button>
                {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
                {succesMessage && <div style={{ color: 'green', marginTop: '10px' }}>{succesMessage}</div>}
            </div>
        </div>
    )
}

export default Agregar