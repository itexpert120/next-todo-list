interface CompletedTasksProps {
  completedTasks: Task[];
  clearCompleted: () => void;
}

export function CompletedTasks(props: CompletedTasksProps) {
  const { completedTasks, clearCompleted } = props;

  if (completedTasks.length === 0) {
    return null;
  }

  return (
    <div className="my-4 flex flex-col gap-2">
      {completedTasks.length !== 0 && (
        <div className="my-4">
          <h1 className="text-2xl font-bold">Completed Tasks</h1>
        </div>
      )}
      <button
        type="button"
        className="text-white text-sm bg-sky-500 hover:bg-sky-600 rounded-lg w-full py-2"
        onClick={clearCompleted}
      >
        Clear Completed
      </button>

      {completedTasks.map((task: Task, index) => (
        <div
          key={task.id || index}
          className="border rounded-lg p-4 bg-gray-100"
        >
          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-lg">{task.title}</h1>
          </div>
          <p className="text-black my-1">{task.summary}</p>
        </div>
      ))}
    </div>
  );
}
