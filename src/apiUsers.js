import axios from 'axios';

const apiUsers = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'X-Authorization': process.env.REACT_APP_API_KEY
    }
});

export default apiUsers;