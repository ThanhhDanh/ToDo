import classNames from 'classnames/bind';
import styles from './ToDoFooter.module.scss';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function ToDoFooter({ todos }) {
    const remainingTasks = todos.filter((todo) => !todo.completed).length;
    const hasCompletedTasks = todos.some((todo) => todo.completed);

    return (
        <footer className={cx('footer')}>
            <span className={cx('todo-count')}>
                <strong className={cx('count')}>{remainingTasks}</strong> mục còn lại
            </span>
            <ul className={cx('filters')}>
                <li className={cx('filter-item')}>
                    <NavLink className={(nav) => cx('filter-link', { active: nav.isActive })} href="#">
                        Tất cả
                    </NavLink>
                </li>
                <li className={cx('filter-item')}>
                    <NavLink className={cx('filter-link')} href="#">
                        Chưa làm
                    </NavLink>
                </li>
                <li className={cx('filter-item')}>
                    <NavLink className={cx('filter-link')} href="#">
                        Đã hoàn thành
                    </NavLink>
                </li>
            </ul>
            {hasCompletedTasks && <button className={cx('clear-completed')}>Xóa đã xong</button>}
        </footer>
    );
}

export default ToDoFooter;
