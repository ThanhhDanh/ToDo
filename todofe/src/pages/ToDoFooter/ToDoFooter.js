import classNames from 'classnames/bind';
import styles from './ToDoFooter.module.scss';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ToDoFooter({ todos, onDeleteTask, setFilter, filter }) {
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const remainingTasks = todos.filter((todo) => !todo.completed).length;
    const hasCompletedTasks = todos.some((todo) => todo.completed);

    const handleClearCompleted = async () => {
        const completedTaskIds = todos.filter((todo) => todo.completed).map((todo) => todo.id);
        if (completedTaskIds.length > 0) {
            await onDeleteTask(completedTaskIds);
        }
    };

    //Cho hiện modal để xác nhận
    const handleConfirmDelete = () => {
        const completedTasks = todos.filter((todo) => todo.completed);
        if (completedTasks.length > 0) {
            setTaskToDelete(completedTasks); // Lưu danh sách task đã hoàn thành vào state
        }
    };

    // Xóa task sau khi đã xác nhận
    const handleClearDeleteConfirmed = async () => {
        if (!taskToDelete) return;

        setIsDeleting(true);
        await handleClearCompleted();
        setIsDeleting(false);
        setTaskToDelete(null);
    };

    return (
        <>
            <footer className={cx('footer')}>
                <span className={cx('todo-count')}>
                    <strong className={cx('count')}>{remainingTasks}</strong> mục còn lại
                </span>
                <ul className={cx('filters')}>
                    <li className={cx('filter-item')}>
                        <NavLink
                            className={(nav) => cx('filter-link', { active: filter === 'all' })}
                            onClick={() => setFilter('all')}
                        >
                            Tất cả
                        </NavLink>
                    </li>
                    <li className={cx('filter-item')}>
                        <NavLink
                            className={(nav) => cx('filter-link', { active: filter === 'active' })}
                            onClick={() => setFilter('active')}
                        >
                            Chưa làm
                        </NavLink>
                    </li>
                    <li className={cx('filter-item')}>
                        <NavLink
                            className={(nav) => cx('filter-link', { active: filter === 'completed' })}
                            onClick={() => setFilter('completed')}
                        >
                            Đã hoàn thành
                        </NavLink>
                    </li>
                </ul>
                {hasCompletedTasks && (
                    <button onClick={handleConfirmDelete} className={cx('clear-completed')}>
                        Xóa đã xong
                    </button>
                )}
            </footer>
            {/* Modal để xác nhận xóa */}
            <div className={cx('modal', { active: taskToDelete })}>
                <div className={cx('modal-content')}>
                    <p className={cx('modal-label')}>Bạn có chắc chắn muốn xóa tất cả task đã xong?</p>
                    <p>
                        <strong className={cx('modal-label')}>{taskToDelete?.title}</strong>
                    </p>
                    <button className={cx('btn', 'cancel')} onClick={() => setTaskToDelete(null)}>
                        Hủy
                    </button>
                    <button className={cx('btn', 'delete')} onClick={handleClearDeleteConfirmed} disabled={isDeleting}>
                        {isDeleting ? 'Đang xóa...' : 'Xóa'}
                    </button>
                </div>
            </div>
        </>
    );
}

export default ToDoFooter;
