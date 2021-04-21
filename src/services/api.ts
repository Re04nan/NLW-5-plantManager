import axios from 'axios';

// informação sigilosa, tomar cuidado ao subir no git
const api = axios.create({
    baseURL: 'http://ip:3333'
});

export default api;

/*
json-server ./src/services/server.json --host server --port 3333 --dalay 780
*/



