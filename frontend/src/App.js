import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle })
      });
      const newTask = await res.json();
      setTasks([newTask, ...tasks]);
      setNewTitle('');
    } catch (err) {
      setError('Failed to add task');
      setTimeout(() => setError(''), 3000);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'done' : 'pending';
    try {
      await fetch(`${API_URL}/tasks/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, status: newStatus } : task
      ));
    } catch (err) {
      setError('Failed to update status');
      setTimeout(() => setError(''), 3000);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      setTimeout(() => setError(''), 3000);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return task.status === 'pending';
    if (filter === 'done') return task.status === 'done';
    return true;
  });

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(t => t.status === 'done').length;
  const pendingTasks = totalTasks - doneTasks;
  const progressPercent = totalTasks === 0 ? 0 : (doneTasks / totalTasks) * 100;

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader-card">
          <div className="spinner"></div>
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="animated-bg"></div>
      
      <div className="content-wrapper">
        <div className="header-section">
          <h1 className="main-title">
            <span className="title-gradient">TASK MANAGER</span>
          </h1>
        </div>

        <div className="stats-grid">
          <div className="stat-card gradient-card-1">
            <div className="stat-value">{totalTasks}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card gradient-card-2">
            <div className="stat-value">{doneTasks}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card gradient-card-3">
            <div className="stat-value">{pendingTasks}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-header">
            <span>Overall Progress</span>
            <span className="progress-percent">{Math.round(progressPercent)}%</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        {/* CHANGED: Separate input and button - not inside same wrapper */}
        <div className="add-task-section">
          <form className="add-task-form" onSubmit={addTask}>
            <div className="input-card">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Write a new task..."
                className="task-input"
              />
            </div>
            <div className="button-card">
              <button type="submit" className="add-button">
                <span>+</span> Add Task
              </button>
            </div>
          </form>
        </div>

        <div className="filter-wrapper">
          <button className={`filter-chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
            All Tasks
          </button>
          <button className={`filter-chip ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>
            Pending
          </button>
          <button className={`filter-chip ${filter === 'done' ? 'active' : ''}`} onClick={() => setFilter('done')}>
            Done
          </button>
        </div>

        <div className="tasks-grid">
          {filteredTasks.length === 0 ? (
            <div className="empty-state-card">
              <p>No tasks to show</p>
              <small>Add a new task to get started</small>
            </div>
          ) : (
            filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className={`task-card ${task.status === 'done' ? 'task-completed' : ''}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="task-card-inner">
                  <div className="task-left">
                    {/* CHANGED: Green checkmark appears when done */}
                    {task.status === 'done' && (
                      <div className="task-icon icon-done">✓</div>
                    )}
                    <span className={`task-text ${task.status === 'done' ? 'text-done' : ''}`}>
                      {task.title}
                    </span>
                  </div>
                  <div className="task-buttons">
                    {/* CHANGED: Done button is GREEN transparent */}
                    <button
                      onClick={() => toggleStatus(task.id, task.status)}
                      className={`action-btn ${task.status === 'pending' ? 'btn-done-green' : 'btn-undo-glass'}`}
                    >
                      {task.status === 'pending' ? 'Done' : 'Undo'}
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="action-btn btn-delete-glass"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {error && <div className="error-toast">{error}</div>}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .app-container {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .animated-bg {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            #151C35 0%,
            #111C4F 25%,
            #1A2857 50%,
            #111C4F 75%,
            #151C35 100%
          );
          background-size: 200% 200%;
          animation: gradientShift 15s ease infinite;
          z-index: -2;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animated-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 40%, rgba(59, 90, 182, 0.12) 0%, transparent 50%),
                      radial-gradient(circle at 80% 70%, rgba(152, 176, 245, 0.08) 0%, transparent 50%),
                      radial-gradient(circle at 50% 90%, rgba(27, 40, 79, 0.4) 0%, transparent 60%);
          animation: glowPulse 10s ease-in-out infinite;
          z-index: -1;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        .content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 50px 30px;
          position: relative;
          z-index: 1;
        }

        .header-section {
          text-align: center;
          margin-bottom: 60px;
          animation: fadeInDown 0.8s ease;
        }

        .main-title {
          font-size: 3.5rem;
          font-weight: 800;
          letter-spacing: 2px;
          margin-bottom: 12px;
        }

        .title-gradient {
          background: linear-gradient(135deg, #FFFFFF, #B5C4F0, #98B0F5, #3B5AB6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          background-size: 200% 200%;
          animation: titleShimmer 5s ease infinite;
        }

        @keyframes titleShimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
          margin-bottom: 35px;
        }

        .stat-card {
          border-radius: 24px;
          padding: 28px 20px;
          text-align: center;
          backdrop-filter: blur(8px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease;
          border: 1px solid rgba(152, 176, 245, 0.15);
        }

        .stat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          border-color: rgba(59, 90, 182, 0.4);
        }

        .gradient-card-1 {
          background: linear-gradient(135deg, rgba(21, 28, 53, 0.85), rgba(27, 40, 87, 0.75));
          border-bottom: 2px solid #3B5AB6;
        }

        .gradient-card-2 {
          background: linear-gradient(135deg, rgba(27, 40, 87, 0.85), rgba(59, 90, 182, 0.65));
          border-bottom: 2px solid #98B0F5;
        }

        .gradient-card-3 {
          background: linear-gradient(135deg, rgba(21, 28, 53, 0.85), rgba(27, 40, 87, 0.8));
          border-bottom: 2px solid #B5C4F0;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: #FFFFFF;
          margin-bottom: 8px;
        }

        .stat-label {
          color: #B5C4F0;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .progress-section {
          background: rgba(21, 28, 53, 0.6);
          backdrop-filter: blur(14px);
          border-radius: 24px;
          padding: 24px 30px;
          margin-bottom: 35px;
          border: 1px solid rgba(59, 90, 182, 0.25);
          transition: all 0.3s ease;
          animation: fadeInUp 0.7s ease;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          color: #B5C4F0;
          margin-bottom: 16px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .progress-percent {
          color: #98B0F5;
          font-weight: 800;
        }

        .progress-bar-container {
          background: rgba(0, 0, 0, 0.4);
          border-radius: 50px;
          height: 10px;
          overflow: hidden;
        }

        .progress-bar-fill {
          background: linear-gradient(90deg, #3B5AB6, #98B0F5, #B5C4F0);
          background-size: 200% 100%;
          height: 100%;
          border-radius: 50px;
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          animation: progressGlow 2s ease infinite;
        }

        @keyframes progressGlow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.15); }
        }

        /* NEW: Separate input and button styles */
        .add-task-section {
          margin-bottom: 40px;
          animation: fadeInUp 0.8s ease;
        }

        .add-task-form {
          display: flex;
          gap: 20px;
          align-items: center;
          flex-wrap: wrap;
        }

        .input-card {
          flex: 1;
          background: rgba(21, 28, 53, 0.7);
          backdrop-filter: blur(14px);
          border-radius: 60px;
          padding: 4px;
          border: 1px solid rgba(59, 90, 182, 0.35);
          transition: all 0.3s ease;
        }

        .input-card:focus-within {
          border-color: #98B0F5;
          box-shadow: 0 0 20px rgba(59, 90, 182, 0.3);
        }

        .task-input {
          width: 100%;
          padding: 16px 24px;
          background: transparent;
          border: none;
          font-size: 1rem;
          color: #FFFFFF;
          outline: none;
          border-radius: 60px;
        }

        .task-input::placeholder {
          color: rgba(181, 196, 240, 0.4);
        }

        .button-card {
          background: rgba(21, 28, 53, 0.7);
          backdrop-filter: blur(14px);
          border-radius: 60px;
          padding: 4px;
          border: 1px solid rgba(59, 90, 182, 0.35);
        }

        .add-button {
          padding: 14px 36px;
          background: linear-gradient(135deg, #3B5AB6, #1A2857);
          color: white;
          border: none;
          border-radius: 60px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .add-button:hover {
          transform: scale(1.02);
          background: linear-gradient(135deg, #5B7AD6, #2A3867);
          box-shadow: 0 5px 20px rgba(59, 90, 182, 0.4);
        }

        .filter-wrapper {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-bottom: 35px;
          flex-wrap: wrap;
        }

        .filter-chip {
          padding: 10px 28px;
          background: rgba(21, 28, 53, 0.6);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(59, 90, 182, 0.35);
          border-radius: 50px;
          color: #B5C4F0;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .filter-chip:hover {
          background: rgba(59, 90, 182, 0.25);
          transform: translateY(-2px);
        }

        .filter-chip.active {
          background: linear-gradient(135deg, #3B5AB6, #1A2857);
          border-color: #98B0F5;
          color: white;
          box-shadow: 0 5px 15px rgba(59, 90, 182, 0.4);
        }

        .tasks-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .task-card {
          background: rgba(21, 28, 53, 0.5);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          border: 1px solid rgba(59, 90, 182, 0.2);
          transition: all 0.3s ease;
          animation: slideInRight 0.5s ease both;
        }

        .task-card:hover {
          transform: translateX(8px);
          border-color: rgba(152, 176, 245, 0.4);
          background: rgba(21, 28, 53, 0.7);
        }

        .task-card-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 24px;
          gap: 20px;
        }

        .task-left {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
        }

        /* Green checkmark icon */
        .task-icon {
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(74, 222, 128, 0.15);
          border: 1px solid rgba(74, 222, 128, 0.5);
          color: #4ade80;
          font-size: 0.9rem;
          font-weight: 700;
        }

        .task-text {
          font-size: 1rem;
          color: #FFFFFF;
          font-weight: 500;
        }

        .text-done {
          text-decoration: line-through;
          opacity: 0.6;
        }

        .task-buttons {
          display: flex;
          gap: 12px;
        }

        .action-btn {
          padding: 8px 20px;
          border-radius: 50px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.8rem;
          transition: all 0.3s ease;
          background: transparent;
        }

        /* CHANGED: Green transparent button for Done */
        .btn-done-green {
          background: rgba(74, 222, 128, 0.12);
          border: 1px solid rgba(74, 222, 128, 0.5);
          color: #4ade80;
        }

        .btn-done-green:hover {
          background: rgba(74, 222, 128, 0.25);
          border-color: rgba(74, 222, 128, 0.8);
          transform: scale(1.03);
          color: #86efac;
        }

        .btn-undo-glass {
          background: rgba(181, 196, 240, 0.12);
          border: 1px solid rgba(181, 196, 240, 0.4);
          color: #B5C4F0;
        }

        .btn-undo-glass:hover {
          background: rgba(181, 196, 240, 0.25);
          border-color: rgba(181, 196, 240, 0.7);
          transform: scale(1.03);
          color: #FFFFFF;
        }

        .btn-delete-glass {
          background: rgba(255, 80, 80, 0.12);
          border: 1px solid rgba(255, 80, 80, 0.4);
          color: #ff8080;
        }

        .btn-delete-glass:hover {
          background: rgba(255, 80, 80, 0.25);
          border-color: rgba(255, 80, 80, 0.7);
          transform: scale(1.03);
          color: #ffa0a0;
        }

        .task-completed {
          opacity: 0.7;
        }

        .empty-state-card {
          background: rgba(21, 28, 53, 0.5);
          backdrop-filter: blur(12px);
          border-radius: 28px;
          padding: 60px 20px;
          text-align: center;
          border: 1px solid rgba(59, 90, 182, 0.2);
        }

        .empty-state-card p {
          color: #B5C4F0;
          font-size: 1rem;
          margin-bottom: 8px;
        }

        .empty-state-card small {
          color: rgba(181, 196, 240, 0.4);
        }

        .error-toast {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          padding: 14px 28px;
          border-radius: 50px;
          font-size: 0.85rem;
          animation: slideInRight 0.3s ease;
          z-index: 1000;
          box-shadow: 0 5px 20px rgba(239, 68, 68, 0.3);
        }

        .loader-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #151C35, #111C4F);
        }

        .loader-card {
          background: rgba(21, 28, 53, 0.8);
          backdrop-filter: blur(14px);
          border-radius: 32px;
          padding: 50px 60px;
          text-align: center;
          border: 1px solid rgba(59, 90, 182, 0.3);
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(152, 176, 245, 0.2);
          border-top-color: #98B0F5;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto;
        }

        .loader-card p {
          margin-top: 20px;
          color: #B5C4F0;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .content-wrapper {
            padding: 30px 20px;
          }
          
          .stats-grid {
            gap: 15px;
          }
          
          .stat-value {
            font-size: 1.8rem;
          }
          
          .task-card-inner {
            flex-direction: column;
            align-items: stretch;
          }
          
          .task-buttons {
            justify-content: flex-end;
          }
          
          .main-title {
            font-size: 2rem;
          }

          .add-task-form {
            flex-direction: column;
          }

          .input-card, .button-card {
            width: 100%;
          }

          .add-button {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

export default App;