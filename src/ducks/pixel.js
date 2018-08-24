import axios from "axios";

///action types
const GET_PIXEL = "GET_PIXEL",
ADD_PIXEL ="ADD_PIXEL",
GET_PIXELS="GET_PIXELS",
GET_FULL_PIXELS="GET_FULL_PIXELS"
export function getPixel(date) {
  const data = axios.get(`/api/pixel/${date}`).then(res=> {return res.data})
  return {
    type: GET_PIXEL,
    payload:data
  };
}
export function addPixel(body){
  const data = axios.post(`/api/pixel`,body).then(res=> {return res.data})
  return {
    type:ADD_PIXEL,
    payload:data
  }
}
export function getPixels() {
  const data = axios.get(`/api/pixels`).then(res=> {return res.data})
  return {
    type: GET_PIXELS,
    payload:data
  };
}
export function getFullPixels(){
  const data = axios.get(`/api/pixels/feed`).then(res=> {return res.data})
  return {
    type: GET_FULL_PIXELS,
    payload:data
  };
}

const initialState = {
  pixel: {},
  pixels:[],
  pixelsForFeed:[]
};

export default function pixel(state = initialState, action) {
  switch (action.type) {
    case `${GET_PIXEL}_PENDING`:
    return {
      ...state,
      isLoading:true
    };
    case `${GET_PIXEL}_FULFILLED`:
      return {
        ...state,
        isLoading:false,
        pixel: action.payload
      };
      case `${GET_PIXELS}_FULFILLED`:
      return {
        ...state,
        isLoading:false,
        pixels: action.payload
      };
      case `${GET_FULL_PIXELS}_PENDING`:
      return {
        ...state,
        isLoading:true
      };
      case `${GET_FULL_PIXELS}_FULFILLED`:
        return {
          ...state,
          isLoading:false,
          pixelsForFeed: action.payload
        };
      case `${ADD_PIXEL}_FULFILLED`:
      return {
        ...state,
        pixel: action.payload
      };
    default:
      return state;
  }
}
