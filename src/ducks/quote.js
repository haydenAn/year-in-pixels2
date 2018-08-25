import axios from "axios";

///action types
const GET_QUOTE = "GET_QUOTE",
ADD_QUOTE ="ADD_QUOTE",
UPDATE_QUOTE="UPDATE_QUOTE",
DELETE_QUOTE="DELETE_QUOTE"
export function getQuote() {
  const data = axios.get(`/api/quote`).then(res=> {
    return res.data})
  return {
    type: GET_QUOTE,
    payload:data
  };
}
export function addQuote(body){
  const data = axios.post(`/api/quote`,body).then(res=> {return res.data})
  return {
    type:ADD_QUOTE,
    payload:data
  }
}
export function updateQuote(id,body){
  const data = axios.put(`/api/quote/${id}`,body).then(res=> {return res.data})
  return {
    type:UPDATE_QUOTE,
    payload:data
  }
}
export function deleteQuote(id){
  const data = axios.delete(`/api/quote/${id}`).then(res=> {return res.data})
  return {
    type:DELETE_QUOTE,
    payload:data
  }
}

const initialState = {
  quote: {}
};

export default function Quote(state = initialState, action) {
  switch (action.type) {
    case `${GET_QUOTE}_PENDING`:
    return {
      ...state,
      isLoading:true
    };
    case `${GET_QUOTE}_FULFILLED`:
      return {
        ...state,
        isLoading:false,
        quote: action.payload
      };
      case `${ADD_QUOTE}_FULFILLED`:
      return {
        ...state,
        quote: action.payload
      };
      case `${UPDATE_QUOTE}_FULFILLED`:
      return {
        ...state,
        quote: action.payload
      };
      case `${DELETE_QUOTE}_FULFILLED`:
      return {
        ...state,
        quote: action.payload
      };
    default:
      return state;
  }
}