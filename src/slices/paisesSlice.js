import { createSlice } from "@reduxjs/toolkit";

const initialState = { //estado inicial
    paises: []
}

const paisesSlice = createSlice({
    name: "paises",
    initialState,
    reducers: {

        cargarPaises: (state, action) => {
            const paisesIniciales = action.payload;
            console.log('Cargando países:', paisesIniciales);
            state.paises = paisesIniciales;
        },

    },
});
export const { cargarPaises } = paisesSlice.actions;
export default paisesSlice.reducer;