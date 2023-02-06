import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [tasks, setTasks] = useState([])
  const [taskName, setTaskName] = useState("")

  async function get_tasks() {
    try {
      const response = await fetch('http://localhost:8000/tasks/');
      const data = await response.json();
      return data;
    } catch(error) {
      return error;
    }
  }

  async function render_tasks() {
    const t = await get_tasks();
    if (t) {
      setTasks(t);
    }
  }

  const postTask = async(body) => {
    try {
      const response = await fetch('http://localhost:8000/tasks/', {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      });
      const data = await response.json()
      return data;
    } catch (error) {
      return error;
    }
  }

  const addTask = async() => {
    const task = {
      name: taskName
    }
    await postTask(task);
    render_tasks();
  }

  useEffect(() => {
    render_tasks();
  }, []);

  return (
    <div className="container-sm mt-5">
      <h1 className="display-3">Todo App</h1>
      <hr/>
      <div className="card p-3 shadow">
              <div className="input-group mb-0">
                  <input type="text" name="task_name" className="form-control" placeholder="new task..." autoComplete="off" onChange={(e) => {setTaskName(e.target.value)}}/>
                  <button className="btn btn-primary" type="button" onClick={addTask}>Add</button>
              </div>
      </div>
      <hr/>
      <ul className="list-group shadow">
        { tasks.length > 0 && 
          tasks.map((task, index) => (
          <> 
            <li key={index} className="list-group-item list-group-item-success">
                <div className="row p-0 align-items-center">
                    <div className="col-9">
                        <a className="list-group-item-action fs-5" href="">
                          { task.name }
                        </a>
                        <br/>
                        <small className="text-muted ps-3">--- </small>
                        <small className="text-muted ps-3">---</small>
                    </div>
                    <div className="col-3 text-end">
                        <a className="btn btn-sm btn-success fw-bold" href="/done/">Done</a>
                        <a className="btn btn-sm btn-danger fw-bold" href="">Delete</a>
                    </div>
                </div>              
            </li>
          </> 
          ))
        }
      </ul>
    </div>
  );
}

export default App;
