const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const User = require('./models/User');


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/get',(req,res,next) => {

})

/*app.get('/', (req,res,next) => {
    
})*/

app.get('/user/sign-up', (req,res,next) => {

    res.sendFile(__dirname+ "/view/form.html")
    
})

app.post('/user/sign-up', async (req,res,next) => {

    try{
        if(!req.body.password){
            throw new Error('Password number is mendatory')
        }

   const name = req.body.name;
   const email = req.body.email;
   const password = req.body.password;

   const data = await User.create({name:name,email:email,password:password})
   res.status(201).json({newUserDetail:data});
   //res.redirect('/user/get-users')
    }
    catch(err){
        console.log(err);
    }

})

app.get('/user/get-users', async (req,res,next) => {
    const users = await User.findAll();
    res.status(200).json({allUsers:users})
})

/*app.delete('/user/delete-user/:id', async (req,res,next) => {
    const uId = req.params.id;
    await User.destroy({where:{id:uId}})
    res.sendStatus(200);
})
*/

sequelize.sync()
.then((res) => {
    app.listen(8000, () => {
    console.log('server is running on port 8000')
    });
})
.catch(err => console.log(err))