import { useSelector } from 'react-redux';

export const useUsuario = () => {
    const listaUsuarios = useSelector((state) => state.usuariosSlice.usuarios);

    const devolverUsuario = (idUsuario) => {
        const usuario = listaUsuarios.find(
            usuarios => usuarios.id == idUsuario
        )
        return usuario;
    }

    return devolverUsuario;

}
