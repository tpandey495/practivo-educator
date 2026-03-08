// for local env
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "https://backend.tiiron.com";
export const BASE_URL: string = API_BASE;
export const LOCAL_BASE_URL: string = API_BASE;
export const AUTH_URL: string = BASE_URL + "/v1/auth";
export const SERVER_URL: string = BASE_URL + "/v1";
export const UPLOADS: string = BASE_URL + "/";

// for prod env
// const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "https://backenddev.tiiron.com";
// export const BASE_URL: string = API_BASE;
// export const LOCAL_BASE_URL: string = API_BASE;
// export const AUTH_URL: string = BASE_URL + "/v1/auth";
// export const SERVER_URL: string = BASE_URL + "/v1";
// export const UPLOADS: string = BASE_URL + "/";
