import React from 'react';
import Mapa from './Mapa';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { obtenerUsuariosPorPaisAPI, obtenerPaisesAPI } from '../services/service';
import { cargarUsuariosPorPais } from '../slices/usuariosPorPaisesSlice';
import { cargarPaises } from '../slices/paisesSlice';
import { usePais } from '../customHook/usePaises';
import { useUsuatiosPorPais } from '../customHook/useUsuariosPorPais';

const MapaUsuarios = () => {
    const listaPaises = useSelector((state) => state.paisesSlice.paises);
    const dispatch = useDispatch();
    const obtenerPais = usePais();
    const obtenerCantXPais = useUsuatiosPorPais();

    const obtenerPaises = async () => {
        const response = await obtenerPaisesAPI();

        if (response && response.paises) {
            const paises = response.paises; // Extraer el array de países
            dispatch(cargarPaises(paises));
        }
    };

    const obtenerUsuariosPorPais = async () => {
        const response = await obtenerUsuariosPorPaisAPI();
        if (response && response.paises) {
            const paises = response.paises; // Extraer el array de países
            dispatch(cargarUsuariosPorPais(paises));
        }
    };
    //obtenemos la lista de ids que se obtienen de la api, que son solo los que que me dan las coordenadas
    const listaPaisesId = listaPaises.map(objeto => objeto.id);
    //const listaPaisesId = Object.keys(listaPaises);

    //obtenemos segun los ids obtenidos anteriormente, la cantidad de habitantes por pais
    const cantidadUsuariosPorPaises = listaPaisesId.map(pId => {
        const pais = obtenerCantXPais(pId);
        return pais ? pais.cantidadDeUsuarios : 0; // Display 0 if user info not found
    });


    const markersData = listaPaises.map((pais, index) => {
        const marca = {
            lat: pais.latitude,
            lng: pais.longitude,
            titulo: pais.name,
            contenido: `Cantidad de usuarios registrados: ${cantidadUsuariosPorPaises[index]}`,
        };
        return marca;
    });
    useEffect(() => {
        obtenerUsuariosPorPais();
        obtenerPaises();
    }, []);

    return (
        <>
            <h1>Mapa</h1>
            <div style={{ margin: '0 auto', height: '100px' }}>
                <Mapa markersData={markersData} />
            </div>
        </>
    );
};

export default MapaUsuarios;

