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

    const loadingTodo = async () => {
        setLoading(true);
        try {
            const res = await APIs.get(endpoints['tasks']);
            console.log('todo: ', res);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadingTodo();
    }, []);

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
        setToggleAllChecked(updatedTodos.every((todo) => todo.completed)); // Kiểm tra nếu tất cả đều hoàn thành
    };

    return (
        <div className={cx('home')}>
            <p className={cx('title')}>todos</p>
            <div className={cx('home-container')}>
                <input className={cx('input')} placeholder="Những gì cần phải được thực hiện?" autoFocus />
                <input
                    id="toggle-all"
                    className={cx('toggle-all')}
                    type="checkbox"
                    checked={toggleAllChecked}
                    onChange={handleToggleAll}
                />
                <label className={cx('label')} htmlFor="toggle-all">
                    Mark all as complete
                </label>
                <ToDoList todos={todos} onToggleChange={handleToggleChange} />
                <ToDoFooter todos={todos} />
            </div>
        </div>
    );
}

export default Home;
