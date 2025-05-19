"use client";
import { useState } from "react";
import { Todo } from "../types/Todo";
import Todos from "./todos";
import { modeSlice, useAppDispatch, useAppSelector } from "../store";

export default function TodoListForm() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tab, setTab] = useState(1);
  const darkmode = useAppSelector((state) => state.modeSlice.mode);
  const dispatch = useAppDispatch();

  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0"); // Добавляем ведущий ноль, если число < 10
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Месяцы начинаются с 0
  const year = date.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;
  console.log(formattedDate); // Пример: "20 05 2024

  const addTodo = () => {
    const result = [...todos];
    if (!todoText) return;
    result.push({
      text: todoText,
      id: crypto.randomUUID(),
      completed: false,
    });
    setTodos(result);
    setTodoText("");
  };

  const completedTodos = todos.filter((t) => t.completed === true);
  const uncompletedTodos = todos.filter((t) => t.completed === false);

  const swiTchMode = () => {
    dispatch(modeSlice.actions.changeMode());
  };

  return (
    <div
      className={`p-20 w-2/3 min-h-180 rounded-2xl flex flex-col ${
        darkmode ? "bg-gray-800" : "bg-gray-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="felx items-center">
          <input
            type="text"
            placeholder="todo text"
            className={`border-2  rounded-tl-lg rounded-bl-lg py-3 px-10 focus:outline-none ${
              darkmode ? "border-purple-700 text-white" : "border-blue-500"
            }`}
            value={todoText}
            onChange={(e) => {
              setTodoText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTodo();
              }
            }}
          />
          <button
            onClick={() => addTodo()}
            className={` border-2 border-transparent  px-7 py-3 rounded-tr-lg rounded-br-lg 
            cursor-pointer hover:translate-x-1 duration-150 ${
              darkmode
                ? "bg-purple-700  text-gray-300"
                : "bg-blue-500 text-white"
            }`}
          >
            Add
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setTab(1);
            }}
            className={`border-2 px-7 py-3.5 rounded-lg cursor-pointer ${
              darkmode ? "border-purple-700 text-gray-300" : "border-blue-500"
            } ${
              tab === 1
                ? darkmode
                  ? "bg-purple-700"
                  : "bg-blue-500 text-white"
                : ""
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => {
              setTab(2);
            }}
            className={`border-2 px-7 py-3.5 rounded-lg cursor-pointer ${
              darkmode ? "border-purple-700 text-gray-300" : "border-blue-500"
            } ${
              tab === 2
                ? darkmode
                  ? "bg-purple-700 text-gray-300"
                  : "bg-blue-500 text-white"
                : ""
            }`}
          >
            Completed todos
          </button>
          <button
            onClick={() => {
              swiTchMode();
            }}
            className={` px-4 py-3.5  rounded-lg cursor-pointer ${
              darkmode
                ? "bg-purple-700 text-gray-300"
                : "bg-blue-500 text-white"
            }`}
          >
            Mode
          </button>
        </div>
      </div>

      {tab === 1 && (
        <Todos
          todos={uncompletedTodos}
          setTodos={setTodos}
          todoType="uncompleted"
          allTodos={todos}
        />
      )}
      {tab === 2 && (
        <Todos
          todos={completedTodos}
          setTodos={setTodos}
          todoType="completed"
          allTodos={todos}
        />
      )}
    </div>
  );
}
