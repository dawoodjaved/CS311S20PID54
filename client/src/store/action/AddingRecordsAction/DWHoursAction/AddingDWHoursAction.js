import api from "../../Api/AddingRecordsApi";
import returnErrorsAction from "../../ErrorActions/ReturnErrorsAction";
const PostDWHoursAction = (data) => {
  return (dispatch, getState) => {
    api
      .AddingRecords()
      .createDWHours(data, getState)
      .then((res) => {
        console.log(res);
        dispatch({
          type: "ADD_DWHOURS",
          payload: res.data,
        });
      })
      .catch((err) =>
        dispatch(returnErrorsAction(err.response.data, err.response.status))
      );
  };
};
export default PostDWHoursAction;
