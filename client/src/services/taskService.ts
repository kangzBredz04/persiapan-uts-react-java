import { Task } from "../types";

const API_URL = "http://localhost:8080/api/tasks";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestParams {
  method: RequestMethod;
  task?: Task;
  id?: number;
}

export const requestTask = async ({
  method,
  task,
  id,
}: RequestParams): Promise<Task | Task[] | void> => {
  let url = API_URL;
  const options: RequestInit = { method };

  if (id !== undefined) {
    url += `/${id}`;
  }

  if (task && (method === "POST" || method === "PUT")) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(task);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  if (method === "GET") {
    return response.json();
  }

  if (method === "POST" || method === "PUT") {
    return response.json();
  }
};

export const fetchTasks = async (): Promise<Task[]> => {
  return requestTask({ method: "GET" }) as Promise<Task[]>;
};

export const createTask = async (task: Task): Promise<Task> => {
  return requestTask({ method: "POST", task }) as Promise<Task>;
};

export const updateTask = async (task: Task): Promise<Task> => {
  return requestTask({ method: "PUT", task, id: task.id }) as Promise<Task>;
};

export const deleteTask = async (id: number): Promise<void> => {
  await requestTask({ method: "DELETE", id });
};
