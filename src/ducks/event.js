import axios from "axios";

///action types
const GET_EVENT = "GET_EVENT",
ADD_EVENT ="ADD_EVENT";
export function getEvent(pixel_id) {
  const data = axios.get(`/api/Event/${pixel_id}`).then(res=> {return res.data})
  return {
    type: GET_EVENT,
    payload:data
  };
}
export function addEvent(body){
  const data = axios.post(`/api/Event`,body).then(res=> {return res.data})
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
        Event: action.payload
      };
      case `${ADD_EVENT}_FULFILLED`:
      return {
        ...state,
        Event: action.payload
      };
    default:
      return state;
  }
}
