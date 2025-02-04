import React, { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";

function Clipboard() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [overdueTasks, setOverdueTasks] = useState([]);

  // Check for overdue tasks every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const updatedTasks = tasks.map((task) => {
        if (!task.completed && new Date(task.time).getTime() < now) {
          task.overdue = true;
        }
        return task;
      });
      setTasks(updatedTasks);
      setOverdueTasks(updatedTasks.filter((task) => task.overdue && !task.completed));
    }, 30000); // Check every minute
    return () => clearInterval(interval);
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (taskName && taskTime) {
      const newTask = {
        name: taskName,
        time: taskTime,
        overdue: false,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskName("");
      setTaskTime("");
    }
  };

  // Toggle Task Completion
  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
    setOverdueTasks(newTasks.filter(task => task.overdue && !task.completed));
  };

  return (
    <div className="clipboard-container">
      {/* Header */}
      <div className="clipboard-header">
        <h2>Task Sheduler</h2>
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="notification-btn"
        >
          {showNotifications ? 'Hide Notifications' : 'Show Notifications'}
        </button>
      </div>

      {/* Notification Popup */}
      {showNotifications && (
        <div className="notification-popup">
          <div className="popup-header">
            <h3>Notifications</h3>
            <button
              onClick={() => setShowNotifications(false)}
              className="close-btn"
            >
              <X size={20} />
            </button>
          </div>
          {overdueTasks.length > 0 ? (
            <ul>
              {overdueTasks.map((task, index) => (
                <li key={index} className="overdue-task">
                  <span>{task.name}</span> is overdue!
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-notifications">No overdue tasks</p>
          )}
        </div>
      )}

      {/* Task Input */}
      <div className="task-input">
        <div className="input-container">
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input
            type="datetime-local"
            value={taskTime}
            onChange={(e) => setTaskTime(e.target.value)}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Task List */}
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <div className={task.overdue ? "task-overdue" : ""}>
              <p>{task.name}</p>
              <span>{new Date(task.time).toLocaleString()}</span>
            </div>

            {/* Complete Button */}
            <button
              className={`complete-btn ${task.completed ? "completed" : ""}`}
              onClick={() => toggleComplete(index)}
            >
              {task.completed ? "Completed" : "Mark Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Clipboard;
