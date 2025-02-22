import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import ToDoList from '../ToDoList/ToDoList';
import ToDoFooter from '../ToDoFooter/ToDoFooter';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Home() {
    const [todos, setTodos] = useState([
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: false },
        { id: 3, title: 'Task 3', completed: false },
    ]);
    const [toggleAllChecked, setToggleAllChecked] = useState(false);

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
