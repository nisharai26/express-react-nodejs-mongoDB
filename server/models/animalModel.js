const {Schema,model}= require('mongoose');


const animal = new Schema({
    name:{type:String , required:true},
    type:{type:String , required:true},
    age:{type:String , required:true},
    sound:{type:String , required:true},
})


module.exports=model('animals',animal);
