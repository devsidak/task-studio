export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const FETCH_TODOS = "FETCH_TODOS";

export const addTodo = (text) => {
  return {
    type: ADD_TODO,
    payload:{text},
    
  };
};

export const fetchTodos = (todosList) =>{
 
  return {
    type: FETCH_TODOS,
    payload: {todosList},
  }
}
export const removeTodo = (id) => {
  return {
    type: REMOVE_TODO,
    payload: {
      id: id,
    },
  };
};
