import axios from 'axios';

<<<<<<< HEAD
const BASE_URL = 'https://todo-wxki.onrender.com/';
=======
const BASE_URL = 'https://todo-9nq4.onrender.com/';
>>>>>>> c8675b2 (fixed ID)

export const endpoints = {
    tasks: '/tasks',
    tasksid: (taskId) => `/tasks/${taskId}`,
};

export default axios.create({
    baseURL: BASE_URL,
});
