import React, { useEffect, useState } from 'react';

import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import { deleteTodo, updateTodo } from '../slices/todoSlice';
import TodoModal from './TodoModal';
import CheckButton from './CheckButton';

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

function TodoItem({ todo }) {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (todo.status === 'complete') setChecked(true);
    else setChecked(false);
  }, [todo.status]);

  const handleEdit = () => {
    setUpdateModalOpen(true);
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success('todo deleted successfuly');
  };
  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({
        ...todo,
        status: checked ? 'incomplete' : 'complete',
      })
    );
  };

  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.todoDetails}>
          <CheckButton
            handleCheck={handleCheck}
            checked={checked}
            setChecked={setChecked}
          />
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todoText,
                todo.status === 'complete' && styles['todoText--completed'],
              ])}
            >
              {todo.title}
            </p>
            <p className={styles.time}> {todo.time}</p>
          </div>
          <div className={styles.todoActions}>
            <div
              className={styles.icon}
              onClick={() => handleDelete()}
              onKeyDown={() => handleDelete()}
              role="button"
              tabIndex={0}
            >
              <MdDelete />
            </div>
            <div
              className={styles.icon}
              onClick={() => handleEdit()}
              onKeyDown={() => handleEdit()}
              role="button"
              tabIndex={0}
            >
              <MdEdit />
            </div>
          </div>
        </div>
      </motion.div>
      <TodoModal
        typeOp="update"
        todo={todo}
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
      />
    </>
  );
}

export default TodoItem;
