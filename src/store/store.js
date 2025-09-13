import { configureStore } from '@reduxjs/toolkit'
import diconarySlise from "./diconarySlice"

const store = configureStore(
    {
        reducer: {
            data: diconarySlise,
        },
    }
)

export default store;