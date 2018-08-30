import axios from "axios";

///action types
const GET_EVENT = "GET_EVENT",
ADD_EVENT ="ADD_EVENT",
GET_ALL_EVENT="GET_ALL_EVENT",
UPDATE_EVENT="UPDATE_EVENT",
DELETE_EVENT="DELETE_EVENT";
export function getEvent(date) {
  const data = axios.get(`/api/event/${date}`).then(res=> {
    return res.data})
  return {
    type: GET_EVENT,
    payload:data
  };
}
export function addEvent(body){
  const data = axios.post(`/api/event`,body).then(res=> {return res.data})
  return {
    type:ADD_EVENT,
    payload:data
  }
}
export function getAllEvent(){
  const data = axios.get(`/api/events`).then(res=> {return res.data})
  return {
    type:GET_ALL_EVENT,
    payload:data
  }
}
export function editEvent(id,body){
  const data = axios.put(`/api/event/${id}`,body).then(res=> {return res.data})
  return {
    type:UPDATE_EVENT,
    payload:data
  }
}
export function deleteEvent(id){
  const data = axios.delete(`/api/event/${id}`).then(res=> {return res.data})
  return {
    type:DELETE_EVENT,
    payload:data
  }
}

const initialState = {
  event: {},
  events:[]
};

export default function Event(state = initialState, action) {
  switch (action.type) {
    case `${GET_EVENT}_PENDING`:
    return {
      ...state,
      isLoading:true
    };
    case `${GET_EVENT}_FULFILLED`:
      return {
        ...state,
        isLoading:false,
        event: action.payload
      };
    case `${GET_ALL_EVENT}_PENDING`:
    return {
      ...state,
      isLoading:true
    };
    case `${GET_ALL_EVENT}_FULFILLED`:
      return {
        ...state,
        isLoading:false,
        events: action.payload
      };
      case `${ADD_EVENT}_FULFILLED`:
      return {
        ...state,
        event: action.payload
      };
      case `${UPDATE_EVENT}_FULFILLED`:
      return {
        ...state,
        event: action.payload
      };
      case `${DELETE_EVENT}_FULFILLED`:
      return {
        ...state,
        event: action.payload
      };
    default:
      return state;
  }
}
