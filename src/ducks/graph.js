import axios from "axios";
import colorvalues from "../components/myaccount/Graph/body/models/colorvalues";
///action types
const
GET_PIXELS_GRAPH="GET_PIXELS_GRAPH",
GET_COLOR_RATIO="GET_COLOR_RATIO",
GET_COLOR_RATIO_MONTH="GET_COLOR_RATIO_MONTH";

// GET_PIXELS_BYDATE ="GET_PIXELS_BYDATE";

export function getPixelsGraph() {
  const data = axios.get('/api/forGraph/pixels').then(res=> {return res.data})
  return {
    type: GET_PIXELS_GRAPH,
    payload:data
  };
}
export function getColorRatio() {
  const data = axios.get('/api/colorRatio').then(res=> {
    let iniData = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    res.data.forEach(el=>{
      let index = colorvalues.indexOf(el.colorvalue);
      iniData[index] = el.count;
    })
    return iniData
  })
  return {
    type: GET_COLOR_RATIO,
    payload:data
  };
}
export function getColorRatioByMonth(month) {
  const data = axios.get(`/api/colorRatio/byMonth/${month}`).then(res=> {
    let iniData = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    res.data.forEach(el=>{
      let index = colorvalues.indexOf(el.colorvalue);
      iniData[index] = el.count;
    })
    return iniData
  })
  return {
    type: GET_COLOR_RATIO_MONTH,
    payload:data
  };
}
const initialState = {
  pixelsForGraph:[],
  colorRatio:[],
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
      case `${GET_COLOR_RATIO}_FULFILLED`:
      return {
        ...state,
        colorRatio: action.payload
      };
      
      case `${GET_COLOR_RATIO_MONTH}_FULFILLED`:
      return {
        ...state,
        colorRatio: action.payload
      };
      
    default:
      return state;
  }
}
