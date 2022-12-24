import axios from 'axios'

const instance = axios.create({
    baseURL: "https://todo-list-fc96e-default-rtdb.europe-west1.firebasedatabase.app/"
});

export default instance