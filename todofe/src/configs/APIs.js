import axios from 'axios';

const BASE_URL = 'https://to-do-thanhhdanh.vercel.app/';

export const endpoints = {
    tasks: '/tasks',
    tasksid: (taskId) => `/tasks/${taskId}`,
};

export default axios.create({
    baseURL: BASE_URL,
});
