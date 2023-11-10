import { GET__COURSES,FETCH_ONE_COURSE ,POST_ENROLL_COURSE} from "./courseTypes";
import Axios from "axios";

export const getCourses = (courseInfo) => {
  return {
    type: GET__COURSES,
    payload: courseInfo,
  };
};
export const fetchOneCourse= (course)=>{
  return{
    type:FETCH_ONE_COURSE,
    payload: course
  }
}
export const postEnrolledCourse=(enrolledResult)=>{
  return{
    type:POST_ENROLL_COURSE,
    payload:enrolledResult
  }
}

export const fetchCourseInfo = () => {
  return (dispatch) => {
    Axios.get("/get-courses", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
    })
      .then((result) => {
        dispatch(getCourses(result.data.courses));
        //console.log(result.data.courses)
      })
      .catch((err) => {
        console.log(err);
      });
    //console.log(courseData)
  };
};
export const getOneCourse = (courseId) => async (dispatch) => {
  try {
    const response = await Axios.get(`http://localhost:5000/get-course/${courseId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
    });
    dispatch(fetchOneCourse(response.data.course));
  } catch (error) {
    console.error(error);
  }
};
export const postOneEnrolledCourse=(userDetails)=>async (dispatch)=>{
  try {
    const response = await Axios.get('http://localhost:5000/enroll-course',userDetails,{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
    })
    console.log("enrolled Response : "+response)
    dispatch(postEnrolledCourse(response.data.enrolledResult))
    
  } catch (error) {
    console.log(error)
  }
}
export const deleteCourseItem = (courseId) => {
  return (dispatch) => {
    try {
        fetch("/delete", {
            method: "delete",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("auth_token"),
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
              courseId
            }) 
          })
            .then((res) => res.json())
            .then((result) => {
                dispatch(fetchCourseInfo())
              
            })
            .catch((err) => {
              console.log(err);
            });
    } catch (err) {
      console.log(err);
    }
  };
};
