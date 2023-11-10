import { Container, Paper, Typography } from "@material-ui/core";

import React ,{useEffect, useState}from "react";
import CommonHeader from "../../components/Common/CommonHeader";
import Styles from "./CourseInfo.module.css";
import NoticeToggle from "./NoticeToggle/NoticeToggle";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch,useSelector } from "react-redux";
import { getOneCourse,postOneEnrolledCourse } from "../../Redux/course/courseAction";
import { Button } from "react-bootstrap";
const CourseInfo = () => {
  const[buttonClicked,setButtonClicked]=useState(false)
  const user = JSON.parse(localStorage.getItem("user"));
  const {courseId} = useParams()
  console.log(courseId)
  const userDetails={
    userId:user._id,
    courseId
  }
  const dispatch = useDispatch();
  const { course,enrolledResult} = useSelector((state) => state.course);
  console.log("enrolled Result"+enrolledResult)
  useEffect(() => {
    dispatch(getOneCourse(courseId));
  }, [dispatch, courseId]);
  const enrollHandler=async ()=>{
   setButtonClicked(true)
  }
  return (
    <div>
      <CommonHeader title={course.courseName}  />
      <Container className="my-5">
        <Paper className="px-5 py-3">
          <div className="">
            <div className="d-flex justify-content-between align-items-center my-4">
              <Typography variant="h6">Course Content</Typography>
              <Typography style={{ color: "GrayText" }} variant="subtitle2">
            
              </Typography>
            </div>
            <NoticeToggle />
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default CourseInfo;
