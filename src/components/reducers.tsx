

type Task = {
    id: number;
    text: string;
    completed: boolean;
  };
  
  type TaskAction = 
    | { type: 'ADD_TASK'; payload: string }
    | { type: 'DELETE_TASK'; payload: number }
    | { type: 'UPDATE_TASK'; payload: { id: number; text: string } }
    | { type: 'TOGGLE_TASK'; payload: number }
    | { type: 'INCREMENT' }
    | { type: 'DECREASE' };
  
  type State = {
    count: number;
    tasks: Task[];
  };
  
  export const initialState: State = {
    count: 0,
    tasks: [],
  };
  
  export const reducer = (state: State, action: TaskAction): State => {
    switch (action.type) {
      case 'INCREMENT':
        return { ...state, count: state.count + 1 };
      case 'DECREASE':
        return { ...state, count: state.count - 1 };
      case 'ADD_TASK':
        const newTask: Task = {
          id: Date.now(),
          text: action.payload,
          completed: false,
        };
        return { ...state, tasks: [...state.tasks, newTask] };
      case 'DELETE_TASK':
        return {
          ...state,
          tasks: state.tasks.filter(task => task.id !== action.payload),
        };
      case 'UPDATE_TASK':
        return {
          ...state,
          tasks: state.tasks.map(task =>
            task.id === action.payload.id ? { ...task, text: action.payload.text } : task
          ),
        };
      case 'TOGGLE_TASK':
        return {
          ...state,
          tasks: state.tasks.map(task =>
            task.id === action.payload ? { ...task, completed: !task.completed } : task
          ),
        };
      default:
        return state;
    }
  };
  