import axios from 'axios';

const BASE_URL = 'https://todo-osai.onrender.com/';

export const endpoints = {
    tasks: '/tasks',
    tasksid: (taskId) => `/tasks/${taskId}`,
};

export default axios.create({
    baseURL: BASE_URL,
});
