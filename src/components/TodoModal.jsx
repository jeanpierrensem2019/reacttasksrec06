import React, { useEffect, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';
import { addTodo, updateTodo } from '../slices/todoSlice';

const dropIn = {
  hidden: { opacity: 0, transform: 'scale(0.9)' },
  visible: {
    opacity: 1,
    transform: 'scale(1)',
    transition: { duration: 0.1, type: 'spring', damping: 25, stiffness: 500 },
  },
  exit: { opacity: 0, transform: 'scale(0.9)' },
};
function TodoModal({
  typeOp,
  todo,
  modalOpen,
  setModalOpen,
  children,
  ...rest
}) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeOp === 'update' && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle('');
      setStatus('incomplete');
    }
  }, [typeOp, todo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // validate input values
    if (title === '') {
      toast.error("title shouldn't be empty");
      return;
    }

    if (typeOp === 'update' && title && status) {
      if (todo.title === title && todo.status === status) {
        toast.error('No changess Made');
        return;
      }

      dispatch(
        updateTodo({
          ...todo,
          title,
          status,
          time: new Date().toLocaleString(),
        })
      );
      toast.success('Task updated successfully');
    } else if (title && status) {
      // dispacthing addTodo action
      dispatch(
        addTodo({
          id: uuid(),
          title,
          status,
          time: new Date().toLocaleString(),
        })
      );
      toast.success('Task successfuly added');
    }
    setModalOpen(false);
  };

  return (
    modalOpen && (
      <AnimatePresence>
        <motion.div
          className={styles.wrapper}
          {...rest}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              initial={{ to: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose
                onClick={() => setModalOpen(false)}
                onKeyDown={() => setModalOpen(false)}
                tabIndex={0}
                role="button"
              />
            </motion.div>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <div className={styles.formTitle}>
                {typeOp === 'update' ? 'Update Task' : 'Add Task'}{' '}
              </div>
              <label htmlFor="Title">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="Status">
                Status
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="incomplete">Incomplete </option>
                  <option value="complete">Complete</option>
                </select>
              </label>
              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {typeOp === 'update' ? 'Update Task' : 'Add Task'}
                </Button>
                <Button
                  onClick={() => setModalOpen(false)}
                  onKeyDown={() => setModalOpen(false)}
                  type="button"
                  variant="secondary"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  );
}
export default TodoModal;
