import api from "../../Api/AddingRecordsApi";
import returnErrorsAction from "../../ErrorActions/ReturnErrorsAction";
const PostRoomsAction = (data) => {
  return (dispatch, getState) => {
    api
      .AddingRecords()
      .createRooms(data, getState)
      .then((res) => {
        console.log(res);
        dispatch({
          type: "ADD_ROOMS",
          payload: res.data,
        });
      });
  };
};
export default PostRoomsAction;
