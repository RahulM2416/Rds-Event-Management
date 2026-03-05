import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.EC2_INSTANCE,
});

export default api;
