import api from "../../Api/AddingRecordsApi";
import returnErrorsAction from "../../ErrorActions/ReturnErrorsAction";

const DeleteDWHoursAction = () => {
  return (dispatch, getState) => {
    api
      .AddingRecords()
      .deleteDWHours(getState)
      .then((res) => {
        console.log(res);
        dispatch({
          type: "DELETE_DWHOURS",
          payload: res.data,
        });
      })
      .catch((err) =>
        dispatch(returnErrorsAction(err.response.data, err.response.status))
      );
  };
};
export default DeleteDWHoursAction;
