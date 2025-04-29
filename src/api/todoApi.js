const API_URL = 'https://playground.4geeks.com/todo/docs?_gl=1*j7wd4r*_gcl_au*MjEwMjc5OTc5Ny4xNzM4OTQ0NjQy';

export const getTodos = async () => {
  const response = await fetch(`${API_URL}/todos`);
  if (!response.ok) throw new Error('Failed to fetch todos');
  return await response.json();
};

export const addTodo = async (task) => {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      label: task,
      is_done: false
    }),
  });
  if (!response.ok) throw new Error('Failed to add todo');
  return await response.json();
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete todo');
  return true;
};