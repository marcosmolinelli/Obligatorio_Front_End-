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
        agregarRegistro: (state, action) => {
            const registroNuevo = action.payload;
            state.registros = [...state.registros, registroNuevo];
        }

    },
});
export const { cargarRegistros, borrarRegistro, agregarRegistro } = registrosSlice.actions;
export default registrosSlice.reducer;