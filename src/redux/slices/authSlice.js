import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    loading: false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
}

// create slice
const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setLoading(state, value) {
            state.loading = value.loading;
        },
        setToken(state, value) {
            state.token = value.payload;
        },
        setUser(state, value) {
            state.user = value.payload;
        }
    }
});

export const { setLoading, setToken, setUser } = authSlice.actions;
export default authSlice.reducer;