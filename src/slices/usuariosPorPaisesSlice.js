import { createSlice } from "@reduxjs/toolkit";

const initialState = { //estado inicial
    usuariosPorPaises: []
}
//esta es una version que se va a mejorar

const usuariosPorPaisesSlice = createSlice({
    name: "usuariosPorPaises",
    initialState,
    reducers: {

        cargarUsuariosPorPais: (state, action) => {
            const usuariosPorPaisesIniciales = action.payload;
            state.usuariosPorPaises = usuariosPorPaisesIniciales;
        },

    },
});
export const { cargarUsuariosPorPais } = usuariosPorPaisesSlice.actions;
export default usuariosPorPaisesSlice.reducer;