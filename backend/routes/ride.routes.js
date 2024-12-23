import express  from "express"
  import { body,query  } from "express-validator";
import { Confirmride, createRide, Endride, generateFare, StartRide } from "../controller/ride.controller.js";
import authUser from "../middelware/userAuth.middelware.js";
import AuthCaption from "../middelware/captionAuth.middelware.js";
const  Riderouter = express.Router();

Riderouter.post('/getride',authUser 
                           ,body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address')
                            ,body('destination').isString().isLength({min:3}).withMessage('invalid destination')
                            ,body('vehicalType').isString().isIn(['auto','car','moto']).withMessage('invalid vehicalType'),createRide)
Riderouter.get('/genfare',authUser,generateFare)

Riderouter.post('/confirmride',AuthCaption
  ,[body("rideId").isMongoId().withMessage('Invalid ride id')]
  , Confirmride)

  Riderouter.get('/start-ride',AuthCaption ,
      query("rideId").isMongoId().withMessage('invalid ride id')
      ,query('otp').isString().isLength({max:6,min:6}).withMessage("Invalid otp"),StartRide
  )


  Riderouter.post('/end-ride',AuthCaption,
       body('rideId').isMongoId().withMessage("invalid ride id"),
       Endride
  )
 export default Riderouter;                            