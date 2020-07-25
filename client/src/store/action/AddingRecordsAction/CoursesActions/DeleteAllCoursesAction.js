import api from "../../Api/AddingRecordsApi";
import returnErrorsAction from "../../ErrorActions/ReturnErrorsAction";

const DeleteCoursesAction = () => {
  return (dispatch, getState) => {
    api
      .AddingRecords()
      .deleteCourses(getState)
      .then((res) => {
        console.log(res);
        dispatch({
          type: "DELETE_COURSES",
          payload: res.data,
        });
      })
      .catch((err) =>
        dispatch(returnErrorsAction(err.response.data, err.response.status))
      );
  };
};
export default DeleteCoursesAction;
