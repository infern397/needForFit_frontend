import axios from 'axios';
import router from '@/router'; // Импортируйте ваш роутер

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/', // Замените на ваш базовый URL
});

const token = localStorage.getItem('access_token');
if (token) {
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            router.push('/login');
        }
        return Promise.reject(error);
    }
);

export default instance;