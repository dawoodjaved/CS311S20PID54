import api from "../../Api/AddingRecordsApi";
import returnErrorsAction from "../../ErrorActions/ReturnErrorsAction";

const DeleteTimeTableAction = () => {
  return (dispatch, getState) => {
    api
      .AddingRecords()
      .deleteTimeTable(getState)
      .then((res) => {
        console.log(res);
        dispatch({
          type: "DELETE_TIMETABLE",
          payload: res.data,
        });
      })
      .catch((err) =>
        dispatch(returnErrorsAction(err.response.data, err.response.status))
      );
  };
};
export default DeleteTimeTableAction;
