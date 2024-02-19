import { useSelector } from 'react-redux';

export const useUsuatiosPorPais = () => {
    const listaUsuatiosPorPais = useSelector((state) => state.usuariosPorPaisesSlice.usuariosPorPaises);

    const devolverUsuatiosPorPais = (idPais) => {
        // Filtrar la lista de usuariosPorPaises para obtener los correspondientes a los IDs proporcionados
        const usuarioPorPais = listaUsuatiosPorPais.find(
            pais => pais.id === idPais
        );

        return usuarioPorPais;
    };

    return devolverUsuatiosPorPais;
};
