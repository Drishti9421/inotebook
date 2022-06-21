const mongoose =require('mongoose');
const mongoURI="mongodb://localhost:27017/inotebook"

const connectToMongo=()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo. Huraaaayyyy!!!");
    })
}


module.exports = connectToMongo; //shares the connectToMomgo code to other files when called