import { ADD_TODO, REMOVE_TODO } from "./actionCreators";

const initialState = {
  todos: [{ id: 1, task: "Learn React" }],
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
          ...newState.todos,
          { id: newState.id, task: action.payload.text, completed: false },
        ],
      };
    case REMOVE_TODO:
      newState = { ...state };
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    default:
      return state;
  }
}
