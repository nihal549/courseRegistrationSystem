const router=require('express').Router()

const { enroll__course__controller
    ,enroll__get_course__controller,
    enroll__delete__controller } = require('../controllers/enrollController')
const {requireLogin}=require('../middlewares/requireLogin')


router.post('/enroll',requireLogin,enroll__course__controller)
router.get('/get-enroll/:name',requireLogin,enroll__get_course__controller)
router.post('/delete',requireLogin,enroll__delete__controller)

module.exports=router