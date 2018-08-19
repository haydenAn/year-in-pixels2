import axios from "axios";

///action types
const GET_USER = "GET_USER";

export function getUser() {
  const data = axios.get("/auth/me").then(res=> {return res.data})
  return {
    type: GET_USER,
    payload:data
  };
}

const initialState = {
  user: {}
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}
