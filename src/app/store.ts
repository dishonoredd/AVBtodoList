import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Todo } from "./types/Todo";
import { act } from "react";
import { redirect } from "next/dist/server/api-utils";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type TodoType = {
  todos: Todo[];
  completedTodos: Todo[];
};

const initialTodoState: TodoType = {
  todos: [],
  completedTodos: [],
};

type ModeState = {
  mode: boolean;
};

const initialModeState: ModeState = {
  mode: false,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialTodoState,
  reducers: {
    addNewTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    completeTodo: (state, action: PayloadAction<string>) => {
      const todoToComplete = state.todos.find(
        (todo) => todo.id === action.payload
      );

      if (todoToComplete) {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);

        state.completedTodos.unshift({
          ...todoToComplete,
        });
      }
    },
    uncompleteTodo: (state, action: PayloadAction<string>) => {
      const todoToUncomplete = state.completedTodos.find(
        (todo) => todo.id === action.payload
      );

      if (todoToUncomplete) {
        state.completedTodos = state.completedTodos.filter(
          (todo) => todo.id !== action.payload
        );

        state.todos.unshift({
          ...todoToUncomplete,
        });
      }
    },
    deleteCompletedTodo: (state, action: PayloadAction<string>) => {
      state.completedTodos = state.completedTodos.filter(
        (todo) => todo.id !== action.payload
      );
    },
  },
});

export const modeSlice = createSlice({
  name: "mode",
  initialState: initialModeState,
  reducers: {
    changeMode: (state) => {
      state.mode = !state.mode;
    },
  },
});

export const store = configureStore({
  reducer: {
    todoSlice: todoSlice.reducer,
    modeSlice: modeSlice.reducer,
  },
});

export const {
  addNewTodo,
  deleteTodo,
  completeTodo,
  uncompleteTodo,
  deleteCompletedTodo,
} = todoSlice.actions;
