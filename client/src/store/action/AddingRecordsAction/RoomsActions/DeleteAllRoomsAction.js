import api from "../../Api/AddingRecordsApi";
import returnErrorsAction from "../../ErrorActions/ReturnErrorsAction";

const DeleteRoomsAction = () => {
  return (dispatch, getState) => {
    api
      .AddingRecords()
      .deleteRooms(getState)
      .then((res) => {
        console.log(res);
        dispatch({
          type: "DELETE_ROOMS",
          payload: res.data,
        });
      })
      .catch((err) =>
        dispatch(returnErrorsAction(err.response.data, err.response.status))
      );
  };
};
export default DeleteRoomsAction;
