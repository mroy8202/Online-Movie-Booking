import { authEndpoints } from "../apis";
import { setLoading, setToken, setUser } from "../../redux/slices/authSlice"
import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";

// endpoinst
const { SIGNUP_API, LOGIN_API } = authEndpoints;

export function signup({firstName, lastName, email, password}, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, {firstName, lastName, email, password});
            console.log("SIGNUP API RESPONSE -> ", response);
            if (!response.data.success) { 
                throw new Error(response.data.message);
            }
            toast.success("Signup successfull");
            navigate("/login");
        }
        catch(error) {
            console.log("Signup api error... ", error);
            toast.error("signup failed");
            navigate("/");
        }
        dispatch(setLoading(false));
    }
}

export function login({email, password}, navigate) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", LOGIN_API, { email, password });

            console.log("LOGIN_API RESPONSE -> ", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Login successfull");

            await dispatch(setToken(response.data.token));
            await dispatch(setUser(response.data.user));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/user/homepage"); 
        }
        catch(error) {
            console.log("LOGIN_API ERROR -> ", error);
            toast.error("Login failed");
        }
        dispatch(setLoading(false));
    }
}