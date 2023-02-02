const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const jwt =  require('jsonwebtoken')



app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/get',(req,res,next) => {

})

/*app.get('/', (req,res,next) => {
    
})*/
//app.get('/user/sign-up',(req,res,next) => {
   // res.sendFile(__dirname+ "view/userexist.html")
   // if(req.body.email === email){
  //      res.send(ex)
 ////   }
//})
app.get('/user/sign-up', (req,res,next) => {

    res.sendFile(__dirname+ "/view/form.html")
    
})
app.get('/user/sign-in', (req,res,next) => {

    res.sendFile(__dirname+ "/view/login-page.html")
    
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

//For sign in

/*app.post('/user/sign-in', (req, res) => {
    const { email, password } = req.body;
  
    User.findOne({
      where: {
        email,
        password
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
       
  
        res.status(200).send({ message: 'successfully logged in ' });
      })
      .catch(error => {
        res.status(400).send({ message: document.body.innerHTML += `<div style="color:red;" >user not found </div>` });
      });
  });*/

  app.post('/user/signin',  (req, res) => {
    const { email, password } = req.body;
    console.log(password)

    User.findAll({where : {email,password}}).then(user => {
        if(user.length>0){
            if(user[0].password === password){
                res.status(200).json({success:true, message:"User logged in successfully"})
            }
            else{
                return res.status(400).json({success:false,message: "Password is incorrect"})
            }
        }else{
            return res.status(404).json({success:false,message:'user not found'})
        }
    }).catch(err => {
        res.status(500).json({message:err,success:false})
    })

});
     


  

sequelize.sync()
.then((res) => {
    app.listen(8000, () => {
    console.log('server is running on port 8000')
    });
})
.catch(err => console.log(err))