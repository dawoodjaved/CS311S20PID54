import api from "../../Api/AddingRecordsApi";
import returnErrorsAction from "../../ErrorActions/ReturnErrorsAction";

const FetchAllDWHAction = () => {
  return (dispatch, getState) => {
    // dispatch(setItemsLoadingAction());
    api
      .AddingRecords()
      .fetchAllDWHours()
      .then((res) => {
        console.log(res);
        dispatch({
          type: "FETCH_ALL_DWHOURS",
          payload: res.data,
        });
      })
      .catch((err) =>
        dispatch(returnErrorsAction(err.response.data, err.response.status))
      );
  };
};
export default FetchAllDWHAction;
