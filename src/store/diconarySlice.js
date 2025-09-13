import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mod: '',
    data: null,
}



const diconarySlise = createSlice(
    {
        name: "data",
        initialState,
        reducers: {
            updateData: (state, action) => {
                state.data = action.payload
            },
            updateMod: (state, action) => {
                state.mod = action.payload
            }
        }
    }
)

export const { updateData, updateMod } = diconarySlise.actions
export default diconarySlise.reducer;