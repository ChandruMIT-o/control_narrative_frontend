import API from "./axiosInstance";

export const loginRequest = (data) => API.post("/auth/login", data);
export const registerRequest = (data) => API.post("/auth/register", data);
