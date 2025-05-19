import { useAppSelector } from "../store";
import { Todo } from "../types/Todo";

type TodosProps = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  allTodos: Todo[];
  todoType: "completed" | "uncompleted";
};

export default function Todos(props: TodosProps) {
  const darkmode = useAppSelector((state) => state.modeSlice.mode);

  const toggleTodo = (id: string) => {
    const updatedTodos = props.allTodos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    props.setTodos(updatedTodos);
  };

  return props.todos.length ? (
    <ul className="mt-4 flex flex-col gap-2 ">
      {props.todos.map((todo) => (
        <li
          key={todo.id}
          className={`p-5 rounded-lg flex items-center justify-between flex-wrap min-h-fit w-full 
          break-all shadow-md ${darkmode ? "bg-gray-700" : "bg-white"}`}
        >
          <p className={`max-w-[85%] ${darkmode && "text-gray-300"}`}>
            {todo.text}
          </p>
          <div className="flex items-center right-0 gap-3">
            <button
              onClick={() => {
                toggleTodo(todo.id);
              }}
              className={`cursor-pointer h-full rounded-lg ${
                darkmode ? "text-blue-950" : "text-blue-500"
              }`}
            >
              {props.todoType === "uncompleted" ? "Complete" : "Uncomplete"}
            </button>
            <button
              onClick={() => {
                const deletedTodos = props.allTodos.filter(
                  (t) => t.id !== todo.id
                );
                props.setTodos(deletedTodos);
              }}
              className={`cursor-pointer h-full rounded-lg ${
                darkmode ? "text-purple-950" : "text-rose-600"
              }`}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div className="grow-1 flex items-center justify-center">
      <p className={`text-2xl opacity-50 ${darkmode && "text-gray-100"}`}>
        {props.todoType === "uncompleted" ? "Add todo" : "Complete any todo"}
      </p>
    </div>
  );
}
