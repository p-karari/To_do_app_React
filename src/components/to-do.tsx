import { useReducer, useState } from 'react';
import './to-do.scss';
import sun from '../images/icon-sun.svg';
import { reducer, initialState } from './reducers';

function Todo() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'COMPLETED'>('ALL');

  const handleAddTask = () => {
    if (newTaskText.trim() !== '') {
      dispatch({ type: 'ADD_TASK', payload: newTaskText });
      setNewTaskText('');
    }
  };

  const handleDeleteTask = (id: number) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const handleToggleTask = (id: number) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  const filteredTasks = state.tasks.filter(task => {
    if (filter === 'ACTIVE') return !task.completed;
    if (filter === 'COMPLETED') return task.completed;
    return true;
  });

  return (
    <>
      <div>
        <section className="background"></section>
        <section className="body">
          <div className="header">
            <div>T O D O</div>
            <div> <img src={sun} alt="" /> </div>
          </div>
          <div className="new">
            <button className="new_btn" onClick={handleAddTask}></button>
            <input 
              type="text" 
              placeholder="Create a new todo..." 
              className="new_task" 
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
            />
          </div>
          <div className="tasks">
            {filteredTasks.map(task => (
              <div key={task.id} className="task">
                <button 
                  className="btn" 
                  onClick={() => handleToggleTask(task.id)}
                >
                  {task.completed ? '✓' : ''}
                </button>
                <p className={task.completed ? 'completed' : ''}>{task.text}</p>
                <button className="del-btn" onClick={() => handleDeleteTask(task.id)}></button>
              </div>
            ))}
            <div id="footer">
              <span>{filteredTasks.length} items left</span>
              <div>
                <span className="all" onClick={() => setFilter('ALL')}>All</span>
                <span className="active" onClick={() => setFilter('ACTIVE')}>Active</span>
                <span className="completed" onClick={() => setFilter('COMPLETED')}>Completed</span>
              </div>
              <span className="clear">Clear Completed</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Todo;
