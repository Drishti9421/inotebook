const mongoose=require('mongoose');
const {Schema}=mongoose;
const UserSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    },
    age:{
        type: Number,
    }
  });
  const User = mongoose.model('user', UserSchema);//registers our schema with mongoose. Mongoose models allow us to access data from MongoDB in an object-oriented fashion
//   User.createIndexes();    //The createIndexes() method creates one or more indexes on the specified collection. It is used to create one or more indexes based on the field of the document.
  module.exports=User