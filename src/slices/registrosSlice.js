import { createSlice } from "@reduxjs/toolkit";

const initialState = { //estado inicial
    registros: []
}

const registrosSlice = createSlice({
    name: "registros",
    initialState,
    reducers: {

        cargarRegistros: (state, action) => {
            const registrosIniciales = action.payload;
            state.registros = registrosIniciales;
        },
        borrarRegistro: (state, action) => {
            state.registros = state.registros.filter(registro => registro.id !== action.payload);
        },

    },
});
export const { cargarRegistros, borrarRegistro } = registrosSlice.actions;
export default registrosSlice.reducer;