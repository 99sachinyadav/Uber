import express from 'express'
import authUser from '../middelware/userAuth.middelware.js';
import { getAddress, getDistance, getSuggestations  } from '../services/MapsServices.js';
import { query } from 'express-validator';

const mapRouter = express.Router();

mapRouter.get('/get-coordinates/:address',authUser,getAddress );
mapRouter.get('/get-distance',query('destinations').isString().isLength({min:3}),query('origins').isString().isLength({min:3}),authUser,getDistance)
mapRouter.get('/get-suggestions',query('input').isString().isLength({min:3}),authUser,getSuggestations)

export default mapRouter    