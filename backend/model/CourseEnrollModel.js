
const mongoose =require('mongoose')

const CourseEnrollSchema=mongoose.Schema({
    courseName: {
        type: String,
        required: true
      },
      courseDescription: {
        type: String,
        required: true
      },
      courseThumbnail: {
        type: String,
        required: true
      },
      createdAtUser: {
        type: String,
        required: true
      },
      createdAtTime: {
        type: Date,
        required: true
      }
},{
    timestamps:true
})

const CourseEnrollModel=mongoose.model("EnrollCourses",CourseEnrollSchema)

module.exports=CourseEnrollModel