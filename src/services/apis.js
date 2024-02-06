const BASE_URL = process.env.REACT_APP_BASE_URL;

// auth endpoints
export const authEndpoints = {
    SIGNUP_API: BASE_URL + "/signup",
    LOGIN_API: BASE_URL + "/login",
}