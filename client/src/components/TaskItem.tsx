import { Task } from "../types";

function TaskItem({
  task,
  onDelete,
  onEdit,
}: {
  task: Task;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}) {
  const handleEditClick = () => {
    onEdit(task); // Memanggil fungsi onEdit untuk mengatur editingTask di TaskPage
  };
  return (
    <div className="p-4 mb-4 bg-white shadow rounded-md flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded ${
            task.status === "Completed"
              ? "bg-green-200 text-green-800"
              : task.status === "In Progress"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {task.status}
        </span>
      </div>
      <div>
        <button
          onClick={handleEditClick}
          className="px-4 py-2 mr-2 bg-yellow-500 text-white rounded-md"
        >
          Edit
        </button>
        <button
          onClick={() => {
            if (task.id !== undefined) {
              onDelete(task.id);
            }
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
