const express = require('express');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');
const cors = require('cors');

const AnimalModel = require('./models/animalModel');


const app = express();

mongoose.connect('mongodb+srv://nisha:passwordabc123@cluster0.kstue.mongodb.net/animal?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});


app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.get('/animal/all', async (req, res) => {
    let animals = await AnimalModel.find({});

    if (animals.length == 0) {
        res.send({
            success: false,
            message: 'No animals found in database'
        });
        return;
    }

    animals = animals.map(animal => animal.toObject());

    res.send({
        success: true,
        message: `${animals.length} animals found`,
        data: animals
    });
});

app.post('/animal/create',(req,res)=>{
    const {name,type,age,sound}=req.body;
    const animal = new AnimalModel({
        name,
        type,
        age,
        sound
    });
    animal.save();

    res.send({
        success:true,
        message:'New animal was created'
    });

});
app.delete('/animal/delete/:id',(req,res)=> {
    AnimalModel.deleteOne({_id:req.params.id},(err)=>{
        if(err){
            res.send({
                success:false,
                message:err
            });
        } else {
            res.send({
                success:true,
                message:'Animal was removed sucessfully'
            })
        }
    });
  

});
app.put('/animal/update/:id', async(req, res) => {
    let {name, type, age, sound} = req.body;

    if (!name) {
        name = undefined;
    }
    if (!type) {
        type = undefined;
    }
    if (!age) {
        age = undefined;
    }
    if (!sound) {
        sound = undefined;
    }

    let result = await AnimalModel.updateOne({_id: req.params.id}, {
        name,
        type,
        age,
        sound
    }, {omitUndefined: true});

    res.send({
        success: true,
        message: `${result.nModified} document changed`
    });
});

// app.delete('/animal/delete', (req, res) => {

// });

// CRUD create - read - update - delete

app.listen(3001);