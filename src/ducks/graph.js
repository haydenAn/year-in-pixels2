import axios from "axios";

///action types
const
GET_PIXELS_GRAPH="GET_PIXELS_GRAPH";
// GET_PIXELS_BYCOLOR ="GET_PIXELS_BYCOLOR",
// GET_PIXELS_BYDATE ="GET_PIXELS_BYDATE";

export function getPixelsGraph() {
  const data = axios.get('/api/forGraph/pixels').then(res=> {return res.data})
  return {
    type: GET_PIXELS_GRAPH,
    payload:data
  };
}
const initialState = {
  pixelsForGraph:[],
  isLoading:false
};

export default function pixel(state = initialState, action) {
  switch (action.type) {
    case `${GET_PIXELS_GRAPH}_PENDING`:
    return {
      ...state,
      isLoading:true
    };
      case `${GET_PIXELS_GRAPH}_FULFILLED`:
      return {
        ...state,
        isLoading:false,
        pixelsForGraph: action.payload
      };
      
    default:
      return state;
  }
}
