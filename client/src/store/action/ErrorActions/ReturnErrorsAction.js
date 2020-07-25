// RETURN ERRORS
const returnErrorsAction = (message, status, id) => {
    return {
      type: 'GET_ERRORS',
      payload: { message, status, id }
    };
};
export default returnErrorsAction;