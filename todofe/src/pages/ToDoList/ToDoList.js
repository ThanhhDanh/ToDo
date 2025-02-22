import classNames from 'classnames/bind';
import styles from './ToDoList.module.scss';

const cx = classNames.bind(styles);

function ToDoList({ todos, onToggleChange }) {
    //Khi cái click vào 1 task
    const handleToggle = (id) => {
        const newTodos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
        onToggleChange(newTodos);
    };

    return (
        <div className={cx('to-do-list')}>
            {todos.map((todo) => (
                <div key={todo.id} className={cx('view')}>
                    <input
                        className={cx('toggle')}
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggle(todo.id)}
                    />
                    <label className={cx('label')}>{todo.title}</label>
                    <button className={cx('destroy')}></button>
                </div>
            ))}
            {/* <input 
    class="edit" 
    value=""
/> */}
        </div>
    );
}

export default ToDoList;
