"use client";
import TodoListForm from "./components/todo-list-form";
import { useAppSelector } from "./store";

export default function App() {
  const darkmode = useAppSelector((state) => state.modeSlice.mode);

  return (
    <main
      className={`flex items-center justify-center min-h-screen py-20 ${
        darkmode ? "bg-gray-900" : "bg-blue-500"
      }`}
    >
      <TodoListForm />
    </main>
  );
}
