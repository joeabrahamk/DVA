import React, { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";

function Clipboard() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  // Check for overdue tasks every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (!task.completed && new Date(task.time).getTime() < now) {
            return { ...task, overdue: true };
          }
          return task;
        })
      );
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Add a new task
  const addTask = () => {
    if (taskName && taskTime) {
      setTasks([
        ...tasks,
        { name: taskName, time: taskTime, completed: false, overdue: false },
      ]);
      setTaskName("");
      setTaskTime("");
    }
  };

  // Toggle Task Completion
  const toggleComplete = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index].completed = !updatedTasks[index].completed;
      updatedTasks[index].overdue = false; // Reset overdue status if completed
      return updatedTasks;
    });
  };

  return (
    <div className="clipboard-container">
      {/* Header */}
      <div className="clipboard-header">
        <h2>Clipboard</h2>
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="notification-btn"
        >
          <Bell size={24} />
          {tasks.some((task) => !task.completed && task.overdue) && (
            <span className="notification-alert">!</span>
          )}
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
          {tasks.filter((task) => task.overdue).length > 0 ? (
            <ul>
              {tasks
                .filter((task) => task.overdue)
                .map((task, index) => (
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

            {/* Toggle Button */}
            <div
              className={`toggle-container ${task.completed ? "active" : ""}`}
              onClick={() => toggleComplete(index)}
            >
              <div className="toggle-btn"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Clipboard;