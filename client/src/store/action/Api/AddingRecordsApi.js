import axios from "axios";
import tokenConfig from "../TokenConfig";
const baseUrl = "http://localhost:4000/";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//making https requests from client side.

//making an object that has a function and that function returns
//another functions, object is due to that it can be accessed
//by access operator(.) and then it is exported.
export default {
  AddingRecords(url = baseUrl + "api") {
    const getRoomsUrl = url + "/rooms";
    const postRoomsUrl = url + "/rooms";
    const getTimeTableUrl = url + "/timetable";
    const postTimeTableUrl = url + "/timetable";
    const getDWHoursUrl = url + "/dwhours";
    const postDWHoursUrl = url + "/dwhours";
    const getCoursesUrl = url + "/courses";
    const postCoursesUrl = url + "/courses";
    const deleteCoursesUrl = url + "/deletecourses";
    const deleteRoomsUrl = url + "/deleterooms";
    const deleteDWHoursUrl = url + "/deletedwhours";
    const deleteTimeTableUrl = url + "/deletetimetable";

    return {
      fetchAllTimeTable: () => axios.get(getTimeTableUrl),
      fetchAllRooms: () => axios.get(getRoomsUrl),
      fetchAllDWHours: () => axios.get(getDWHoursUrl),
      fetchAllCourses: () => axios.get(getCoursesUrl),
      fetchById: (id) => axios.get(url + id),

      createRooms: (newRecord, getState) =>
        axios.post(postRoomsUrl, newRecord, tokenConfig(getState)),
      createTimeTable: (newRecord, getState) =>
        axios.post(postTimeTableUrl, newRecord, tokenConfig(getState)),
      createDWHours: (newRecord, getState) =>
        axios.post(postDWHoursUrl, newRecord, tokenConfig(getState)),
      createCourses: (newRecord, getState) =>
        axios.post(postCoursesUrl, newRecord, tokenConfig(getState)),

      // updateItems:(id,updatedRecord,getState) => axios.put(url+id,updatedRecord,tokenConfig(getState)),
      deleteCourses: (getState) =>
        axios.delete(deleteCoursesUrl, tokenConfig(getState)),
      deleteRooms: (getState) =>
        axios.delete(deleteRoomsUrl, tokenConfig(getState)),
      deleteDWHours: (getState) =>
        axios.delete(deleteDWHoursUrl, tokenConfig(getState)),
      deleteTimeTable: (getState) =>
        axios.delete(deleteTimeTableUrl, tokenConfig(getState)),
    };
  },
};
