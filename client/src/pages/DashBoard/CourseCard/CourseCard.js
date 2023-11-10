import { Button, Divider } from '@material-ui/core';
import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import Styles from './CourseCard.module.css'
import LazyLoad from 'react-lazyload';


const CourseCard = ({title,name,id,img,userName,buttonName}) => {
const deleteHandler=(obj)=>{
    
        fetch("http://localhost:5000/enroll-course/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
      body: JSON.stringify({
        obj
      }),
    })
   .then(res=>res.json())
   .then(data=>{
    console.log(data)
    if (data.message === 'Record deleted successfully') {
        window.location.reload();}
  })
   .catch(err=>console.log(err))  
    
}
    return (
        <LazyLoad height={200} offset={100} once={true} >
        <div className={Styles.course__Card}>
            <Link to={`/course/${id}`} className={Styles.container}>
            <img className={Styles.image} src={img}alt=""/>
            <div className={Styles.overlay}>
            <p className={Styles.text}>View</p>
            </div>
            </Link>
            
            
            <div className={Styles.course__content}>
           
                <span>Jan-Jun 2021</span>
                <h5>{name}</h5>
                <h5>{title}</h5>
                {buttonName==="Mark As Complete"?
                 <Button color='primary' variant="contained" onClick={()=>deleteHandler({createdAtUser:userName,courseName:name,})} >Mark As Complete</Button>
                 :
                 <Button  color='primary' variant="contained">Published</Button>
                 }
                 
            </div>
            
        </div>
        <Divider/>
        </LazyLoad>
    );
};

export default CourseCard;