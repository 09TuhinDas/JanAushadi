import axios from "axios";

export async function getBackendUrl() {
    return window.electron ? await window.electron.getBackendUrl() : "http://localhost:3000";
}

// ✅ Axios instance with dynamic base URL
const api = axios.create();

api.interceptors.request.use(async (config) => {
    config.baseURL = await getBackendUrl();
    return config;
});

export default api;
