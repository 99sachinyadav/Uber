import express from 'express'
import { getProfile, loginUser, logout, RegisterUser } from '../controller/user.controller.js';
 import {body} from 'express-validator'
import authUser from '../middelware/userAuth.middelware.js';

const router=express.Router();

 router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('firstname').isLength({min:3}).withMessage('First name must cotain atleast 3 letter'),
    body('password').isLength({min:6}).withMessage("pasword should be 6 chararter long")
 ],RegisterUser)
 router.post("/login",[
   body('email').isEmail().withMessage('invalid Email'),
   body('password').isLength({min:6}).withMessage('pasword should be 6 chararter long')

],loginUser)

router.get('/profile',authUser,getProfile)
router.get('/logout',authUser,logout)

export default router