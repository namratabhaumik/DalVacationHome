import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (response) => {
        const parsedBody = JSON.parse(response.data.body);
        if (response.data.statusCode >= 400 && response.data.statusCode <= 500) {
            throw new Error(parsedBody.message)
        }
        return response;
    },
);

export default axiosInstance;
