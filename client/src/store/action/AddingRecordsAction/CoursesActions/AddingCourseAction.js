import api from "../../Api/AddingRecordsApi";
import returnErrorsAction from "../../ErrorActions/ReturnErrorsAction";
const PostCoursesAction = (data) => {
  return (dispatch, getState) => {
    api
      .AddingRecords()
      .createCourses(data, getState)
      .then((res) => {
        console.log(res);
        dispatch({
          type: "ADD_COURSES",
          payload: res.data,
        });
      })
      .catch((err) =>
        dispatch(returnErrorsAction(err.response.data, err.response.status))
      );
  };
};
export default PostCoursesAction;
