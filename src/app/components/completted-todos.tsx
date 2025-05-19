import {
  deleteCompletedTodo,
  uncompleteTodo,
  useAppDispatch,
  useAppSelector,
} from "../store";

type TodosProps = {
  curDate: string;
};

export default function CompletedTodos(props: TodosProps) {
  const darkmode = useAppSelector((state) => state.modeSlice.mode);
  const completedTodos = useAppSelector(
    (state) => state.todoSlice.completedTodos
  );
  const dispatch = useAppDispatch();

  return completedTodos.length ? (
    <ul className="mt-4 flex flex-col gap-2 ">
      {completedTodos.map((todo) => (
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
                dispatch(uncompleteTodo(todo.id));
              }}
              className={`cursor-pointer h-full rounded-lg ${
                darkmode ? "text-blue-950" : "text-blue-500"
              }`}
            >
              Uncomplete
            </button>
            <button
              onClick={() => {
                dispatch(deleteCompletedTodo(todo.id));
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
        Complete any todo
      </p>
    </div>
  );
}
