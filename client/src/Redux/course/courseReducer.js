import { GET__COURSES, UPDATE__COURSE__LIST,FETCH_ONE_COURSE,POST_ENROLL_COURSE } from "./courseTypes"

const init={
    courseInfo:[],
    updateCourseList: false,
    course:[],
    enrolledResult:[]
}


const courseReducer=(state=init,action)=>{
    
    switch(action.type){
        case GET__COURSES: return{
            ...state,
            courseInfo: action.payload
        }
        case UPDATE__COURSE__LIST: return{
            ...state,
            updateCourseList: action.payload
        }
        case FETCH_ONE_COURSE: return{
            ...state,
            course:action.payload
       }
       case POST_ENROLL_COURSE:return{
        ...state,
        enrolledResult:action.payload
       }

        default : return state
    }
}

export default courseReducer