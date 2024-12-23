import jwt from 'jsonwebtoken'
import { Caption } from "../model/caption.model.js";
import { BlackToken } from "../model/blacklistToken.model.js";

const AuthCaption = async (req, res, next) => {
  try {
    const captionToken =
      req.cookies.captionToken || req.headers.authorization?.split(" ")[1];
  // console.log("hello",captionToken)
    if (!captionToken) {
      res.status(401).json({ sucess: false, message: "Unathorized" });
    }
     
    const isBlacklisted = await BlackToken.findOne({token : captionToken });  
    if (isBlacklisted) { 
      return res.status(401).json({ message: "Unauthorized2" });     
    } 

    const decodedToken =  jwt.verify(captionToken, process.env.SECRETEKEY);
    // const decodeid=   jwt.verify(token ,process.env.SECRETEKEY);  

   

    const caption = await Caption.findById(decodedToken._id);

    if (!caption) {
      res.json({ sucess: false, message: "Unauthorized" });
    }

    req.caption = caption;

    next();
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

export default AuthCaption;
