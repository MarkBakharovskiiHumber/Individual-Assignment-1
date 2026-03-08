'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PRIORITIES = ['High', 'Medium', 'Low'];
const FILTERS = ['All', 'Active', 'Completed'];

let nextId = 4;

const INITIAL_TODOS = [
  { id: 1, text: 'Read the Next.js documentation', completed: true, priority: 'High' },
  { id: 2, text: 'Build the assignment project', completed: false, priority: 'High' },
  { id: 3, text: 'Review CSS flexbox and grid', completed: false, priority: 'Medium' },
];

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {/* EVENT HANDLER: checkbox toggle */}
      <button
        className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && '✓'}
      </button>
      <span className={`todo-text ${todo.completed ? 'done' : ''}`}>
        {todo.text}
      </span>
      <span className={`todo-priority priority-${todo.priority.toLowerCase()}`}>
        {todo.priority}
      </span>
      {/* EVENT HANDLER: delete */}
      <button className="todo-delete" onClick={() => onDelete(todo.id)} aria-label="Delete task">
        ×
      </button>
    </div>
  );
}

function StatsBar({ todos }) {
  const total = todos.length;
  const done = todos.filter(t => t.completed).length;
  const active = total - done;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div>
      <div className="todo-stats">
        <div className="stat-item">
          <span className="stat-value">{total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item">
          <span className="stat-value" style={{ color: 'var(--accent)' }}>{active}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-item">
          <span className="stat-value" style={{ color: 'var(--success)' }}>{done}</span>
          <span className="stat-label">Done</span>
        </div>
        <div className="stat-item" style={{ marginLeft: 'auto' }}>
          <span className="stat-value">{pct}%</span>
          <span className="stat-label">Complete</span>
        </div>
      </div>
      {/* CONDITIONAL RENDERING: progress bar only if there are tasks */}
      {total > 0 && (
        <div className="progress-bar-track" style={{ marginTop: 8 }}>
          <div className="progress-bar-fill" style={{ width: `${pct}%`, background: 'var(--success)' }} />
        </div>
      )}
    </div>
  );
}

export default function TodoPage() {
  const [todos, setTodos] = useState(INITIAL_TODOS);
  const [inputText, setInputText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [filter, setFilter] = useState('All');
  const [successMsg, setSuccessMsg] = useState('');

  // EVENT HANDLER: add new task (form submission)
  function handleAdd() {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    const newTodo = { id: nextId++, text: trimmed, completed: false, priority };
    setTodos(prev => [newTodo, ...prev]);
    setInputText('');
    setSuccessMsg(`"${trimmed}" added!`);
    setTimeout(() => setSuccessMsg(''), 2500);
  }

  // Handle Enter key in input
  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAdd();
  }

  function handleToggle(id) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  function handleDelete(id) {
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  function handleClearCompleted() {
    setTodos(prev => prev.filter(t => !t.completed));
  }

  // Filtered list for display
  const filtered = todos.filter(t => {
    if (filter === 'Active') return !t.completed;
    if (filter === 'Completed') return t.completed;
    return true;
  });

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="main-content">
        <div className="todo-container">
          <div className="page-header animate-fade-in-up">
            <p className="overline">Productivity</p>
            <h1>Task Manager</h1>
            <p>Add, complete, and organise your tasks. Set priorities and track your progress.</p>
          </div>

          {/* ADD TASK FORM */}
          <div className="card animate-fade-in-up stagger-2" style={{ marginBottom: 24 }}>
            <div className="todo-input-row">
              <input
                type="text"
                className="form-input"
                placeholder="What needs to be done?"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                maxLength={120}
              />
              <select
                className="form-select"
                style={{ width: 120, flexShrink: 0 }}
                value={priority}
                onChange={e => setPriority(e.target.value)}
              >
                {PRIORITIES.map(p => <option key={p}>{p}</option>)}
              </select>
              <button
                className="btn btn-accent"
                onClick={handleAdd}
                disabled={!inputText.trim()}
              >
                Add Task
              </button>
            </div>

            {/* CONDITIONAL RENDERING: success flash */}
            {successMsg && (
              <div className="alert alert-success animate-fade-in" style={{ marginBottom: 0 }}>
                ✓ {successMsg}
              </div>
            )}
          </div>

          {/* STATS */}
          <div className="animate-fade-in-up stagger-3">
            <StatsBar todos={todos} />
          </div>

          {/* FILTERS */}
          <div className="todo-filters animate-fade-in-up stagger-3" style={{ marginTop: 20 }}>
            {FILTERS.map(f => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
            {/* CONDITIONAL RENDERING: clear button only when there are completed tasks */}
            {completedCount > 0 && (
              <button
                className="filter-btn"
                style={{ marginLeft: 'auto', color: 'var(--accent)', borderColor: 'var(--accent-light)' }}
                onClick={handleClearCompleted}
              >
                Clear {completedCount} done
              </button>
            )}
          </div>

          {/* TASK LIST */}
          <div className="todo-list animate-fade-in-up stagger-4">
            {filtered.length === 0 ? (
              <div className="empty-state">
                {/* CONDITIONAL RENDERING: different empty states */}
                {filter === 'Completed' ? (
                  <>
                    <div className="empty-icon">🎯</div>
                    <p>No completed tasks yet. Start checking things off!</p>
                  </>
                ) : filter === 'Active' ? (
                  <>
                    <div className="empty-icon">🎉</div>
                    <p>All caught up! No active tasks remaining.</p>
                  </>
                ) : (
                  <>
                    <div className="empty-icon">📋</div>
                    <p>No tasks yet. Add one above to get started!</p>
                  </>
                )}
              </div>
            ) : (
              filtered.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
