import axios from "axios";

///action types
const GET_TODOS = "GET_TODOS",
ADD_TODO ="ADD_TODO",
UPDATE_TODO="UPDATE_TODO",
DELETE_TODO="DELETE_TODO"
export function getTodos(date) {
  const data = axios.get(`/api/todo/${date}`).then(res=> {
    return res.data})
  return {
    type: GET_TODOS,
    payload:data
  };
}
export function addTodo(body){
  const data = axios.post(`/api/todo`,body).then(res=> {return res.data})
  return {
    type:ADD_TODO,
    payload:data
  }
}
export function updateTodo(id,body){
  const data = axios.put(`/api/todo/${id}`,body).then(res=> {return res.data})
  return {
    type:UPDATE_TODO,
    payload:data
  }
}
export function deleteTodo(id,date){
  const data = axios.delete(`/api/todo/${id}/${date}`).then(res=> {return res.data})
  return {
    type:DELETE_TODO,
    payload:data
  }
}

const initialState = {
  todos: []
};

export default function Todo(state = initialState, action) {
  switch (action.type) {
    case `${GET_TODOS}_PENDING`:
    return {
      ...state,
      isLoading:true
    };
    case `${GET_TODOS}_FULFILLED`:
      return {
        ...state,
        isLoading:false,
        todos: action.payload
      };
      case `${ADD_TODO}_FULFILLED`:
      return {
        ...state,
        todos: action.payload
      };
      case `${UPDATE_TODO}_FULFILLED`:
      return {
        ...state,
        todos: action.payload
      };
      case `${DELETE_TODO}_FULFILLED`:
      return {
        ...state,
        todos: action.payload
      };
    default:
      return state;
  }
}
