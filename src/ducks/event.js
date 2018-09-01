import axios from "axios";

///action types
const GET_EVENT = "GET_EVENT",
ADD_EVENT ="ADD_EVENT",
GET_ALL_EVENTS="GET_ALL_EVENTS",
UPDATE_EVENT="UPDATE_EVENT",
GET_IMPORTANTS="GET_IMPORTANTS",
DELETE_EVENT="DELETE_EVENT";
export function getEvent(date) {
  const data = axios.get(`/api/event/${date}`).then(res=> {
    return res.data})
  return {
    type: GET_EVENT,
    payload:data
  };
}
export function getImportants() {
  const data = axios.get(`/api/event/important`).then(res=> {
    return res.data})
  return {
    type: GET_IMPORTANTS,
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
export function getAllEvents(){
  const data = axios.get(`/api/events`).then(res=> {return res.data})
  return {
    type:GET_ALL_EVENTS,
    payload:data
  }
}
export function updateEvent(id,body){
  const data = axios.put(`/api/event/${id}`,body).then(res=> {return res.data[0]})
  console.log(data)
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
    case `${GET_IMPORTANTS}_FULFILLED`:
      return {
        ...state,
        events: action.payload
      };
    case `${GET_ALL_EVENTS}_PENDING`:
    return {
      ...state,
      isLoading:true
    };
    case `${GET_ALL_EVENTS}_FULFILLED`:
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
