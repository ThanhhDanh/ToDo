import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import ToDoList from '../ToDoList/ToDoList';
import ToDoFooter from '../ToDoFooter/ToDoFooter';
import { useEffect, useState } from 'react';
import APIs, { endpoints } from '~/configs/APIs';

const cx = classNames.bind(styles);

function Home() {
    const [loading, setLoading] = useState(false);
    const [todos, setTodos] = useState([]);
    const [toggleAllChecked, setToggleAllChecked] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [filter, setFilter] = useState('all');

    const loadingTodo = async () => {
        setLoading(true);
        try {
            const res = await APIs.get(endpoints['tasks']);
            setTodos(res.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadingTodo();
    }, []);

    // Thêm task mới
    const handleAddTask = async () => {
        if (!newTaskTitle.trim()) return;

        try {
            const newTask = { title: newTaskTitle, description: newTaskDescription, completed: false };
            await APIs.post(endpoints['tasks'], newTask);
            setNewTaskTitle('');
            setNewTaskDescription('');
            loadingTodo();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    // Xóa task
    const handleDeleteTask = async (taskIds) => {
        setLoading(true);
        try {
            if (!Array.isArray(taskIds)) {
                taskIds = [taskIds];
            }

            await Promise.all(taskIds.map((id) => APIs.delete(endpoints.tasksid(id))));
            setTodos((prevTodos) => prevTodos.filter((todo) => !taskIds.includes(todo.id)));
        } catch (error) {
            console.error('Lỗi xóa task: ', error);
        } finally {
            setLoading(false);
        }
    };

    // Khi trạng thái checkbox đã thay đổi thì cập nhật tất cả todos
    const handleToggleAll = () => {
        const allChecked = !toggleAllChecked;
        const newTodos = todos.map((todo) => ({ ...todo, completed: allChecked }));
        setTodos(newTodos);
        setToggleAllChecked(allChecked);
    };

    // Khi trạng thái checkbox của một task thay đổi từ ToDoList
    const handleToggleChange = (updatedTodos) => {
        setTodos(updatedTodos);
        // Kiểm tra nếu tất cả đều hoàn thành
        setToggleAllChecked(updatedTodos.every((todo) => todo.completed));
    };

    //Hàm lọc task
    const filteredTodos = todos.filter((todo) => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    return (
        <div className={cx('home')}>
            <p className={cx('title')}>todos</p>
            <div className={cx('home-container')}>
                <div className={cx('inputs')}>
                    <input
                        className={cx('input')}
                        placeholder="Nhập công việc cần làm..."
                        autoFocus
                        required
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddTask();
                        }}
                    />
                    <textarea
                        className={cx('input')}
                        placeholder="Nhập mô tả task..."
                        value={newTaskDescription}
                        rows={2}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleAddTask();
                            }
                        }}
                    />
                </div>
                <input
                    id="toggle-all"
                    className={cx('toggle-all')}
                    type="checkbox"
                    checked={toggleAllChecked}
                    onChange={() => {
                        setToggleAllChecked(!toggleAllChecked);
                        handleToggleAll();
                    }}
                />
                <label className={cx('label')} htmlFor="toggle-all">
                    Mark all as complete
                </label>
                <ToDoList
                    loading={loading}
                    todos={filteredTodos}
                    onToggleChange={handleToggleChange}
                    onDeleteTask={handleDeleteTask}
                />
                <ToDoFooter onDeleteTask={handleDeleteTask} todos={todos} setFilter={setFilter} filter={filter} />
            </div>
        </div>
    );
}

export default Home;
