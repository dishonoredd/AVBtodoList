import {
  completeTodo,
  deleteTodo,
  useAppDispatch,
  useAppSelector,
} from "../store";

type TodosProps = {
  curDate: string;
};

export default function Todos(props: TodosProps) {
  const darkmode = useAppSelector((state) => state.modeSlice.mode);
  const todos = useAppSelector((state) => state.todoSlice.todos);
  const dispatch = useAppDispatch();

  return todos.length ? (
    <ul className="mt-4 flex flex-col gap-2 ">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`p-5 rounded-lg flex items-center justify-between flex-wrap min-h-fit w-full 
          break-all shadow-md ${darkmode ? "bg-gray-700" : "bg-white"}`}
        >
          <p className={`max-w-[75%] ${darkmode && "text-gray-300"}`}>
            {todo.text}
          </p>

          <div className="flex items-center right-0 gap-3">
            <p className={`${darkmode && "text-gray-300"}`}>{props.curDate}</p>
            <button
              onClick={() => {
                dispatch(completeTodo(todo.id));
              }}
              className={`cursor-pointer h-full rounded-lg ${
                darkmode ? "text-blue-950" : "text-blue-500"
              }`}
            >
              Complete
            </button>
            <button
              onClick={() => {
                dispatch(deleteTodo(todo.id));
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
        Add todo
      </p>
    </div>
  );
}
