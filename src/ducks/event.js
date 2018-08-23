import axios from "axios";

///action types
const GET_EVENT = "GET_EVENT",
ADD_EVENT ="ADD_EVENT";
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

const initialState = {
  event: {}
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
      case `${ADD_EVENT}_FULFILLED`:
      return {
        ...state,
        event: action.payload
      };
    default:
      return state;
  }
}
