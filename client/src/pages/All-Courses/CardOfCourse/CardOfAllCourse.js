import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseInfo } from "../../../Redux/course/courseAction";
import { Col, Container, Row } from "react-bootstrap";
import Spinner_comp from "../../../components/Spinner/Spinner_comp";
import { Link } from 'react-router-dom';
import axios from "axios";
import { TextField } from "@material-ui/core";
import {useHistory} from 'react-router-dom'
import  './Cards.css'
const useStyles = makeStyles({
  media: {
    height: 140,
  },
});
const CardOfAllCourse = () => {
  const classes = useStyles();
  const [enroll,setEnroll]=useState(false)
  const [pageValue, setPageValue] = useState(10);
  const navigate=useHistory()
  const { courseInfo } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCourseInfo());
  }, []);
  const enrollHandler=(obj)=>{
    console.log(obj)
    fetch("http://localhost:5000/enroll-course/enroll", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
      body: JSON.stringify({
        obj
      }),
    })
   .then(res=>console.log(res.json()))
   .catch(err=>console.log(err))  
   navigate.push("/")
   window.location.reload();
  }
  const [enrollCourses,setenrollCourses]=useState({})
  const {userName}= JSON.parse(localStorage.getItem("user"));
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

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courseInfo.filter((val) =>
    val.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Container>
        <TextField
        label="Search by Course Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Row className="g-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.slice(0,pageValue).map((val) => {
            return (
              <Col key={val._id} className="g-4" md={4}>
               
                <Card className="m-3">
                <Link to={`/course/${val._id}`}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={val.courseThumbnail}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {val.courseName}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {val.courseDescription}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActionArea className='p-2'>
                  </CardActionArea>
                  </Link>
                  <div style={{margin:"10px",textAlign:"center"}}>
               {
                     (enrollCourses.length>0&& enrollCourses.some(obj=>obj.courseName===val.courseName))? <p>Enrolled</p>:
                  <Button onClick={()=>enrollHandler(val)} variant='contained' color="primary" >Enroll</Button>
              }
               </div>
                </Card>
               
              
              </Col>
            );
          })
        ) : (
          <div className="d-flex justify-content-center align-items-center w-100 h-100">
            <Spinner_comp />
          </div>
        )}
      </Row>
      <div className=" d-flex align-items-center my-2">
                  <Typography className="mr-3" variant="subtitle1">
                    Show
                  </Typography>
                  <select
                    className="dropdown__style"
                    onChange={(e) => setPageValue(e.target.value)}
                  >
                    {[5, 10, 20, "All"].map((val) => {
                      return <option key={val}>{val}</option>;
                    })}
                  </select>
                </div>
    </Container>
  );
};

export default CardOfAllCourse;
