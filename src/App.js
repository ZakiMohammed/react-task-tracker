import { useState } from 'react'
import { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Add from './components/Add';
import Header from './components/Header'
import Tasks from './components/Tasks';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  const [tasks, setTasks] = useState([])
  const [showForm, setShowForm] = useState(false)
  const url = 'http://localhost:4000/tasks/'

  useEffect(() => {
    const getTasks = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
    };

    getTasks();
  }, [])

  // fetch all tasks
  const fetchTasks = async () => {
    const res = await fetch(url);
    return await res.json();
  };

  // fetch single task
  const fetchTask = async (id) => {
    const res = await fetch(`${url}${id}`);
    return await res.json();
  };

  // add task
  const addTask = async (task) => {
    const res = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    return await res.json();
  };

  // update single task
  const updateTask = async (id, task) => {
    const res = await fetch(`${url}${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    return await res.json();
  };

  // delete task
  const deleteTask = async (id) => {
    const res = await fetch(`${url}${id}`, {
      method: 'DELETE',
    });
    return await res.json();
  };

  const onToggleAddForm = () => {
    setShowForm(!showForm);
  };

  const onAdd = async (task) => {
    const newTask = await addTask(task);
    setTasks([...tasks, newTask]);
    onToggleAddForm();
  };

  const onUpdate = async (task) => {
    task.reminder = !task.reminder;
    await updateTask(task.id, task);
    setTasks(tasks.map(i => i.id === task.id ? { ...i, reminder: task.reminder } : i));
  };

  const onRemove = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter(i => i.id !== id));
  };

  return (
    <Router>
      <div className="container">
        <Header
          showForm={showForm}
          onToggleAddForm={onToggleAddForm}></Header>

        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {
                showForm &&
                <Add onAdd={onAdd}></Add>
              }
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onUpdate={onUpdate}
                  onRemove={onRemove}></Tasks>
              ) : ('No Tasks To Show')}
            </>
          )}
        ></Route>
        <Route path='/about' component={About}></Route>

        <Footer />
      </div>
    </Router >
  );
}

export default App;
