import { useState } from "react";
import { Task } from "../types";
import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  onDelete,
  onEdit,
}: {
  tasks: Task[];
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortStatus, setSortStatus] = useState("All");

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTasks = filteredTasks.filter(
    (task) => sortStatus === "All" || task.status === sortStatus
  );

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
        <select
          value={sortStatus}
          onChange={(e) => setSortStatus(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div>
        {sortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
