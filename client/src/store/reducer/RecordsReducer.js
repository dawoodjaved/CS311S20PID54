const initialState = {
  roomsList: [],
  coursesList: [],
  dWHoursList: [],
  timeTable: [],
};
const recordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ROOMS":
      return {
        ...state,
        roomsList: [...state.roomsList, action.payload],
      };

    case "ADD_TIMETABLE":
      return {
        ...state,
        timeTable: [...state.timetable, action.payload],
      };

    case "ADD_DWHOURS":
      return {
        ...state,
        dWHoursList: [...state.dWHoursList, action.payload],
      };

    case "ADD_COURSES":
      return {
        ...state,
        coursesList: [...state.coursesList, action.payload],
      };

    case "FETCH_ALL_ROOMS":
      return {
        ...state,
        roomsList: [...action.payload],
      };

    case "FETCH_ALL_TIMETABLE":
      return {
        ...state,
        timeTable: [...action.payload],
      };

    case "FETCH_ALL_DWHOURS":
      return {
        ...state,
        dWHoursList: [...action.payload],
      };

    case "FETCH_ALL_COURSES":
      return {
        ...state,
        coursesList: [...action.payload],
      };

    case "DELETE_COURSES":
      return {
        coursesList: [],
      };

    case "DELETE_ROOMS":
      return {
        roomsList: [],
      };

    case "DELETE_TIMETABLE":
      return {
        timeTable: [],
      };

    case "DELETE_DWHOURS":
      return {
        dwHoursList: [],
      };
    //we make different requests and get data and then modified
    // to add data in our sata according to our own method.
    // case ACTION_TYPES.CREATE:
    //     return{
    //         ...state,
    //         itemsList:[...state.itemsList,action.payload]
    //     }
    // case ACTION_TYPES.UPDATE:
    //     return{
    //         ...state,
    //         itemsList:state.itemsList.map((thisArrayData)=>{
    //             return(
    //                 thisArrayData._id === action.payload._id ? action.payload : thisArrayData
    //             )
    //         })
    //     }
    // case ACTION_TYPES.DELETE:
    //     return{
    //         ...state,
    //         itemsList:state.itemsList.filter((thisArrayData)=>{
    //             return(
    //                 thisArrayData._id !== action.payload
    //             )
    //         })
    //     }
    default:
      return state;
  }
};
export default recordsReducer;
