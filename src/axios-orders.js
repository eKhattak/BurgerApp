import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-f2a3c.firebaseio.com/'
})

export default instance;