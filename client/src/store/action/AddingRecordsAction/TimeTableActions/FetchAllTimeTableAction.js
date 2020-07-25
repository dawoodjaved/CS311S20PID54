import api from "../../Api/AddingRecordsApi";
import returnErrorsAction from "../../ErrorActions/ReturnErrorsAction";

const FetchAllTimeTableAction = () => {
  return (dispatch, getState) => {
    // dispatch(setItemsLoadingAction());
    api
      .AddingRecords()
      .fetchAllTimeTable()
      .then((res) => {
        console.log(res);
        dispatch({
          type: "FETCH_ALL_TIMETABLE",
          payload: res.data,
        });
      })
      .catch((err) =>
        dispatch(returnErrorsAction(err.response.data, err.response.status))
      );
  };
};
export default FetchAllTimeTableAction;
