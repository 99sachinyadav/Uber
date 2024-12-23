import mongoose  from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const captionSchema = mongoose.Schema({
    firstname:{
        type:String,
        require:true,
        minlength:[3,'firstname must contain atleast 3 letter']
    },
    lastname:{
        type:String,
        minlength:[3,'lastname must contain atleast 3 letter']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[6,'email must contain atleast 6 letter']
    },
    socketId:{
        type:String,
    },
    password:{
        type:String,
        required:true,
        minlength:[6,'lastname must contain atleast 3 letter'],
        select:false
    },

    status:{
         type:String,
         enum:['active','Inactive'],
         default:'Inactive',
    },
    vehicals:{
        color:{
            type:String,
        require:true,
        minlength:[3,'color must contain atleast 3 letter']
        },
        plate:{
            type:String,
        require:true,
        minlength:[3,'plate must contain atleast 3 letter']
        },
        capacity:{
              type:Number,
              required:true,
              min:[1,'Capacity shold be atleast 1']
        },
          
        vehicalType:{
            type:String,
            required:true,
            enum:['car','bike','auto'],
        }

    },
    location:{
       ltd:{
        type:Number,
       },
       lng:{
        type:Number,
       }
    }
})
captionSchema.methods.genAuthToken = function (){
      const captionToken = jwt.sign({_id:this._id},process.env.SECRETEKEY,{expiresIn:'24h'})
      return captionToken;
}
captionSchema.methods.ComparePassword = async function(password){
          return  await bcrypt.compare(password,this.password)
}
captionSchema.statics.hashPassword = async (password)=>{
         return await bcrypt.hash(password,10);
}

export const Caption = mongoose.model('Caption',captionSchema);