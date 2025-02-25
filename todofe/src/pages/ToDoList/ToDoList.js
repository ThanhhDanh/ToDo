import classNames from 'classnames/bind';
import styles from './ToDoList.module.scss';
import APIs, { endpoints } from '~/configs/APIs';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';

const cx = classNames.bind(styles);

function ToDoList({ loading, todos, onToggleChange, onDeleteTask }) {
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    //Khi cái click vào 1 task
    const handleToggle = async (id) => {
        if (!id) {
            console.error('Task Id is undefined, skipping API call');
            return;
        }

        const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));

        // Cập nhật UI ngay lập tức để tránh độ trễ
        onToggleChange(updatedTodos);

        try {
            await APIs.put(endpoints.tasksid(id), { completed: !todos.find((t) => t.id === id).completed });
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    //Xử lý double click vào
    const handleDoubleClick = (todo) => {
        setEditTaskId(todo.id);
        setEditTitle(todo.title);
        setEditDescription(todo.description);
    };

    // Kiểm tra nếu bấm vào phần khác ngoài title & description thì mới thoát chế độ edit
    const handleBlurEdit = (e, id) => {
        if (!e.relatedTarget || !e.relatedTarget.classList.contains(cx('edit'))) {
            handleSaveEdit(id);
        }
    };

    const handleSaveEdit = async (id) => {
        const updatedTask = { title: editTitle, description: editDescription };
        const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTask } : todo));

        try {
            await APIs.put(endpoints.tasksid(id), updatedTask);
            onToggleChange(updatedTodos);
        } catch (error) {
            console.error('Error updating task:', error);
        }
        setEditTaskId(null);
    };

    //Cho hiện modal để xác nhận
    const handleConfirmDelete = (task) => {
        setTaskToDelete(task);
    };

    // Xóa task sau khi đã xác nhận
    const handleDeleteConfirmed = async () => {
        if (!taskToDelete) return;

        setIsDeleting(true);
        await onDeleteTask(taskToDelete.id);
        setIsDeleting(false);
        setTaskToDelete(null);
    };

    return (
        <>
            <div className={cx('to-do-list')}>
                {loading && (
                    <div className={cx(['text-center', 'my-3'])}>
                        <Spinner animation="border" variant="info" />
                    </div>
                )}
                {todos.map((todo) => (
                    <div key={todo.id} className={cx('completed')}>
                        <div className={cx('view')}>
                            <input
                                className={cx('toggle')}
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggle(todo.id)}
                            />
                            {editTaskId === todo.id ? (
                                <div className={classNames[(cx('tasks'), cx('tasks-edit'))]}>
                                    <input
                                        className={cx('edit')}
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        onBlur={(e) => handleBlurEdit(e, todo.id)}
                                        autoFocus
                                    />
                                    <textarea
                                        className={cx('edit')}
                                        value={editDescription}
                                        rows={2}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        onBlur={(e) => handleBlurEdit(e, todo.id)}
                                    />
                                </div>
                            ) : (
                                <div onDoubleClick={() => handleDoubleClick(todo)} className={cx('tasks')}>
                                    <span className={cx('label', { completed: todo.completed })}>{todo.title}</span>
                                    <ul className={cx('description', { completed: todo.completed })}>
                                        {(todo.description ?? '').split('\n').map((line, index) => (
                                            <li key={index}>
                                                {line.trim() !== '' ? line : 'Bạn nên liệt kê chi tiết!!!!'}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <button className={cx('destroy')} onClick={() => handleConfirmDelete(todo)}></button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Modal để xác nhận xóa */}
            <div className={cx('modal', { active: taskToDelete })}>
                <div className={cx('modal-content')}>
                    <p className={cx('modal-label')}>Bạn có chắc chắn muốn xóa task này?</p>
                    <p>
                        <strong className={cx('modal-label')}>{taskToDelete?.title}</strong>
                    </p>
                    <button className={cx('btn', 'cancel')} onClick={() => setTaskToDelete(null)}>
                        Hủy
                    </button>
                    <button className={cx('btn', 'delete')} onClick={handleDeleteConfirmed} disabled={isDeleting}>
                        {isDeleting ? <Spinner animation="border" variant="light" /> : 'Xóa'}
                    </button>
                </div>
            </div>
        </>
    );
}

export default ToDoList;
