import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./Dashboard.css";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import {
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CourseCard from "./CourseCard/CourseCard";


import { useDispatch, useSelector } from "react-redux";
import { fetchCourseInfo } from "../../Redux/course/courseAction";

const Dashboard = () => {
  const [pageValue, setPageValue] = useState(5);
  const { user } = useSelector((state) => state.auth);
  const { courseInfo } = useSelector((state) => state.course);
  const [enrollCourses,setenrollCourses]=useState({})
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(1);
  const {userName}= JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  useEffect(() => {
    if (pageValue === "All") {
      dispatch(fetchCourseInfo());
      setPageValue(courseInfo.length);
    } else {
      dispatch(fetchCourseInfo());
    }
  }, [pageValue]);
 useEffect(()=>{
  console.log("use...")
  fetch(`http://localhost:5000/enroll-course/get-enroll/${userName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
      
    })
   .then(res=>res.json())
   .then(data=>{
    setenrollCourses(data.enroll);
    console.log(data);
  })
   .catch(err=>console.log(err))  
 },[])
  return (
    <div className="dashboard">
      <div className="left__sidebar__dashboard">
        <Sidebar Icon={DashboardIcon} title="Dashboard" link="/" />
        <Sidebar Icon={ExitToAppIcon} title="Logout" />
      </div>
     
      <div className="main__body__dashboard">
      
          <div className='dashboard__header__name'>
            <h2 >Welcome..! {user && user.userName}</h2>
          </div>
       
        <Container fluid className="my-5">
          <Row>
            <Col md={9} xs={12} sm={12}>
              <Container>
                <div>
                  <Row>
                    <Col>
                      <Paper className="d-flex justify-content-between align-items-center p-2 flex-wrap">
                        <Typography variant="h6">
                          Your Courses.!
                        </Typography>

                        <div className={styles.icon__style}>
                          <IconButton
                            onClick={() => {
                              if (start==0 || end==0) {
                                setEnd(courseInfo.length);
                                setStart(courseInfo.length-1);
                              } else {
                               
                                setStart(start - 1);
                                setEnd(end - 1);
                              }
                              console.log(start,end)
                            }}

                          >
                            <ArrowBackIosIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              if (courseInfo.length == end) {
                                setStart(0);
                                setEnd(1);
                              } else {
                                setStart(start + 1);
                                setEnd(end + 1);
                              }
                            }}
                          >
                            <ArrowForwardIosIcon />
                          </IconButton>
                        </div>
                      </Paper>
                    </Col>
                  </Row>
                </div>

                <Divider />
                {enrollCourses.length > 0 ? (
                  enrollCourses.slice(start, end).map((val) => (
                    <CourseCard
                        key={Math.random(2) * 10}
                        title={val.courseDescription}
                        name={val.courseName}
                        id={val._id}
                        img={val.courseThumbnail}
                        userName={val.createdAtUser}
                        buttonName="Mark As Complete"
                    />
                    ))
                  ) : (
                    <p className="display-para">No courses yet</p>
                  )}

              </Container>

              <Container className="mt-5">
                <Paper className="d-flex justify-content-between align-items-center p-4">
                  <Typography variant="h6">Courses</Typography>
                </Paper>
                <Divider />

                {courseInfo.length > 0 &&
                  courseInfo.slice(0, pageValue).map((val) => {
                    return (
                      <CourseCard
                        key={Math.random(2) * 10}
                        title={val.courseDescription}
                        name={val.courseName}
                        id={val._id}
                        img={val.courseThumbnail}
                      />
                    );
                  })}

                <div className=" d-flex align-items-center my-2">
                  <Typography className="mr-3" variant="subtitle1">
                    Show
                  </Typography>
                  <select
                    className={styles.dropdown__style}
                    onChange={(e) => setPageValue(e.target.value)}
                  >
                    {[5, 10, 20, "All"].map((val) => {
                      return <option key={val}>{val}</option>;
                    })}
                  </select>
                </div>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
