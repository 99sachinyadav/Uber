  import express from 'express'

import { captionProfile, loginCaption, logoutcaption, registercaption } from '../controller/caption.controller.js';
import { body } from 'express-validator';
import AuthCaption from '../middelware/captionAuth.middelware.js';

  const captionRouter = express.Router();
captionRouter.post('/register',
  [body('email').isEmail().withMessage('please enter a valid email'),
    body('firstname').isLength({min:3}).withMessage('firstname  must contain atleast 3 letter'),
    body('password').isLength({min:6}).withMessage('password  must contain atleast 6 letter'),
    body('color').isLength({min:3}).withMessage('color must contain atleast 3 letter'),
    body('plate').isLength({min:3}).withMessage('plate must contain atleast 3 letter'),
    body('capacity').isInt({min:1}).withMessage(' capacity must be atleast 1'),
    body('vehicalType').isIn(['car','bike','auto']).withMessage('invalid vehical type'),
   
  ]
  ,registercaption)
  captionRouter.post('/login',[
    body('email').isEmail().withMessage('please enter a valid email'),
    body('password').isLength({min:6}).withMessage('password must contain atleast 6 letter')
  ],loginCaption)
  captionRouter.get('/profile',AuthCaption,captionProfile);
  captionRouter.get('/logout',AuthCaption,logoutcaption);


  export default captionRouter