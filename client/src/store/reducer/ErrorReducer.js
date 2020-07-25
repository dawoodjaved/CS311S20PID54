const initialState = {
  msg: {},
  status: null,
  id: null
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ERRORS':
      return {
        msg: action.payload.message,
        status: action.payload.status,
        id: action.payload.id
      };
    case 'CLEAR_ERRORS':
      return {
        msg: {},
        status: null,
        id: null
      };
    default:
      return state;
  }
}
export default errorReducer;
