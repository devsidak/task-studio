import { ADD_TODO, REMOVE_TODO, FETCH_TODOS } from "../actions/tasks";

const initialState = {
  todos: [],
  id: 1,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      var newState = { ...state };
      newState.id++;
      return {
        ...newState,
        todos: [
          { id: newState.id, task: action.payload.text, completed: false },
          ...newState.todos,
        ],
      };
    case REMOVE_TODO:
      newState = { ...state };
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case FETCH_TODOS:
      newState = { ...state };
      console.log("FETCH_TODOS action.payload : ", action.payload);
      return {
        ...state,
        todos: action.payload.todosList,
        id: action.payload.todosList[0].id,
      };

    default:
      return state;
  }
}
