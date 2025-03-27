// // src/services/taskService.js
// import api from "./api";

// export const getTasks = async (status = "") => {
//   const response = await api.get(`/tasks${status ? `?status=${status}` : ""}`);
//   return response.data;
// };

// export const getTask = async (id) => {
//   const response = await api.get(`/tasks/${id}`);
//   return response.data;
// };

// export const createTask = async (taskData) => {
//   const response = await api.post("/tasks", taskData);
//   return response.data;
// };

// export const updateTask = async (id, taskData) => {
//   const response = await api.put(`/tasks/${id}`, taskData);
//   return response.data;
// };

// export const deleteTask = async (id) => {
//   const response = await api.delete(`/tasks/${id}`);
//   return response.data;
// };

// export const getTaskStats = async () => {
//   const response = await api.get("/tasks/stats/completion");
//   return response.data;
// };
// src/services/taskService.js

const baseURL = "http://localhost:8080/api/tasks"; // Assuming your API is relative to origin

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }
  return response.json();
};

export const getTasks = async (status = "") => {
  const url = `${baseURL}${status ? `?status=${status}` : ""}`;
  const response = await fetch(url);
  return handleResponse(response);
};

export const getTask = async (id) => {
  const response = await fetch(`${baseURL}/${id}`);
  return handleResponse(response);
};

export const createTask = async (taskData) => {
  const response = await fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  return handleResponse(response);
};

export const updateTask = async (id, taskData) => {
  const response = await fetch(`${baseURL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  return handleResponse(response);
};

export const deleteTask = async (id) => {
  const response = await fetch(`${baseURL}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};

export const getTaskStats = async () => {
  const response = await fetch(`${baseURL}/stats/completion`);
  return handleResponse(response);
};
