const CourseEnrollModel=require('../model/CourseEnrollModel')

module.exports.enroll__course__controller = async (req, res, next) => {
  try {
    console.log(req.body)
    const {courseName,courseDescription,courseThumbnail,createdAtUser,createdAtTime} = req.body.obj;
    const enroll = await CourseEnrollModel.findOne({
      courseName: courseName,
    });
    if (enroll) {
      console.log(enroll)
        
    } 
      const enroll_course=new CourseEnrollModel({
        courseName,courseDescription,courseThumbnail,createdAtUser,createdAtTime
      })
    enroll_course.save()
    .then(result=>{
      return res.status(200).json({
        text:"Course enrolled",
        result
      })
    })
    .catch(err=>{
      console.log(err)
    })
    
  } catch (err) {
    console.log(err);
  }
};
module.exports.enroll__get_course__controller=async(req,res,next)=>{
  console.log(req.params)
  const enroll = await CourseEnrollModel.find({
    createdAtUser:{ $exists: true }  ,
  });
  res.status(200).json({
    enroll
  })
}

module.exports.enroll__delete__controller=async(req,res,next)=>{
  console.log(req.body)
  const { createdAtUser, courseName } = req.body.obj;
  try {
    
    const result = await CourseEnrollModel.deleteOne({ createdAtUser,courseName });

    if (result.deletedCount === 1) {
    
      return res.status(200).json({ message: 'Record deleted successfully' });
    } else {
    
      return res.status(404).json({ message: 'Record not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}