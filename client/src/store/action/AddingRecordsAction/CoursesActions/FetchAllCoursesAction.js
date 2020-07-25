import api from "../../Api/AddingRecordsApi";
import returnErrorsAction from "../../ErrorActions/ReturnErrorsAction";

const FetchAllCoursesAction = () => {
  return (dispatch, getState) => {
    // dispatch(setItemsLoadingAction());
    api
      .AddingRecords()
      .fetchAllCourses()
      .then((res) => {
        console.log(res);
        dispatch({
          type: "FETCH_ALL_COURSES",
          payload: res.data,
        });
      })
      .catch((err) =>
        dispatch(returnErrorsAction(err.response.data, err.response.status))
      );
  };
};
export default FetchAllCoursesAction;
