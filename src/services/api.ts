import axios from 'axios';

// informação sigilosa, tomar cuidado ao subir no git
const api = axios.create({
    baseURL: 'http://192.168.0.106:3333'
});

export default api;

/*
json-server ./src/services/server.json --host server --port 3333 --dalay 780
*/



