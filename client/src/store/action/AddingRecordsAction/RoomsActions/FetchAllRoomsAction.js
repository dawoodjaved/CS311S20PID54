import api from "../../Api/AddingRecordsApi";
import returnErrorsAction from "../../ErrorActions/ReturnErrorsAction";

const FetchAllRoomsAction = () => {
  return (dispatch, getState) => {
    // dispatch(setItemsLoadingAction());
    api
      .AddingRecords()
      .fetchAllRooms()
      .then((res) => {
        console.log(res);
        dispatch({
          type: "FETCH_ALL_ROOMS",
          payload: res.data,
        });
      })
      .catch((err) =>
        dispatch(returnErrorsAction(err.response.data, err.response.status))
      );
  };
};
export default FetchAllRoomsAction;
