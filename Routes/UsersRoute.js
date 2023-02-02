const express = require("express");
const router = express.Router();
const {createUser,updateUser,deleteUser,listUsers,getUserById} = require('../Controller/UsersController')

router.post('/create',createUser)
router.patch('/update',updateUser)
router.get('/list',listUsers)
router.get('/getById',getUserById)
router.delete('/delete',deleteUser)



module.exports = router;
