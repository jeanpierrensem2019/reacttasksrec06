// Reducer => will collect data from Localstorage
import { createSlice } from '@reduxjs/toolkit';

// ---Getting the initial todoList from the localstorage
const getInitialTodo = () => {
  const localTodoList = window.localStorage.getItem('todoList');
  if (localTodoList) {
    return JSON.parse(localTodoList);
  }
  window.localStorage.setItem('todoList', JSON.stringify([]));
  return [];
};
const initialvalue = {
  filterStatus: 'all',
  todoList: getInitialTodo(),
};
// ---End of getting the initial todoList from the local storage

// ---creating the slicer
export const todoSlice = createSlice({
  name: 'todo',
  initialState: initialvalue,

  reducers: {
    // addTodo
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      // update the local storage with, the new added todo
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({
          ...action.payload,
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
      } else {
        window.localStorage.setItem(
          'todoList',
          JSON.stringify([{ ...action.payload }])
        );
      }
    },
    // addTodo end
    // deleteTodo
    deleteTodo: (state, action) => {
      // reading localstorage
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        // parsing into array
        const todoListArr = JSON.parse(todoList);
        // splicing the array
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });
        // writing  localstorage
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
        // state update
        state.todoList = todoListArr;
      }
    },
    // deleteTodo end
    // updateTodo
    updateTodo: (state, action) => {
      // reading the localstorage
      const todoList = window.localStorage.getItem('todoList');
      // parsing data
      const todoListArr = JSON.parse(todoList);
      // getting the todo to update and updating it
      todoListArr.forEach((todo) => {
        if (todo.id === action.payload.id) {
          todo.title = action.payload.title;
          todo.status = action.payload.status;
        }
      });
      // writing the localstorage
      window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
      // updating the state
      state.todoList = todoListArr;
    },
    // updateTodo end

    // updateFilterStatus
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    // updateFilterStatus end
  },
});

//  reducer & the action => todoStore.js =>access to localstorage
export default todoSlice.reducer;
export const { addTodo, deleteTodo, updateTodo, updateFilterStatus } =
  todoSlice.actions;
