
import React, { useState, useEffect } from 'react';
function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  useEffect(() => {
    fetch('https://playground.4geeks.com/todo/users/danivera')
      .then((response) => {
        if (response.ok){
          return response.json()
        }else{
          crearUsers()
        }
      })
      .then((data) => {
        setTasks(Array.isArray(data) ? data : []) // Actualizar los datos recibidos
      })
      .catch((error) => console.error('Error al cargar las tareas:', error));
  }, []);
  console.log(tasks)
  // Funcion para agregar tareas
  function addTask(e) {
    e.preventDefault()
    if (!newTask) {
      console.error("La tarea no puede estar vacia,");
      return;
    }
    const task = {
      "label": newTask,
      "is_done": false
    };
    setNewTask("");// Limpiamos el campo de entrada
    fetch('https://playground.4geeks.com/todo/todos/danivera', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks([...tasks, data]);
      })
      .catch((error) => console.error('Error al agregar tarea:', error));
  }
  function clearAllTasks() {
    fetch('https://playground.4geeks.com/todo/users/danivera', {
      method: 'DELETE',
    })
      .then((response) => response.text())
      .then(() => {
        setTasks([]);
        crearUsers()
      })
      .catch((error) => console.error('Error al limpiar tareas:', error));
  }
  function deleteTask(taskId) {
    fetch('https://playground.4geeks.com/todo/todos/' + taskId, {
      method: 'DELETE',
    })
      .then((response) => response.text())
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => console.error('Error al eliminar tarea:', error));
  }
  function crearUsers() {
    fetch('https://playground.4geeks.com/todo/users/danivera', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error('Error al agregar tarea:', error));
  }
  return (
    <div className='box'>
      <h1>Lista de Tareas</h1>
      <form onSubmit={(e) => addTask(e)}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder='Agregar una tarea...'
        />
      </form>
      <ul className='lista'>
        {tasks.map((task) => (
          <li className='item-list' key={task.id}>
            {task.label}
            <button className='btn-eliminar' onClick={() => deleteTask(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <button className='btn-limpiar' onClick={clearAllTasks}>Limpiar Todas las Tareas</button>
    </div>
  );
}
export default TodoList;