const User = require('../models/User');
const Expanse = require('../models/expanse');
const bcrypt = require('bcryptjs');

exports.getSignUp = (req, res, next) => {
  res.sendFile(__dirname +'/view/form.html');
};

exports.postSignUp = async (req, res, next) => {
  try {
    if (!req.body.password) {
      throw new Error('Password number is mandatory');
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const saltround = 10;
    bcrypt.hash(password,saltround,async(err,hash) =>{
        const data = await User.create({ name, email,  password : hash });
        res.status(201).json({ newUserDetail: data });
    })
    

  } catch (err) {
    console.log(err);
  }
};

exports.getSignIn = (req, res, next) => {
  res.sendFile(__dirname + "/view/login-page.html");
};




  exports.postSignIn = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({where: {email} });
    try {
      if (!user) {
        throw new Error('User not found');
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new Error('Incorrect password');
      }
      // Redirect to another page after successful login
      res.status(200).json({ message: 'Sign in successful' });
      //res.redirect('/expanse/add-expanse');
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: 'Sign in failed' });
    }
  };
  
  

exports.getUsers = async (req, res, next) => {
  const users = await User.findAll();
  res.status(200).json({ allUsers: users });
};

exports.getExpansepage = async (req,res,next) => {
  res.sendFile(__dirname + "/view/expanses.html");
}

//expanse -psting details
exports.postAddExpanse = async (req, res, next) => {
  const description = req.body.description;
  const money = req.body.money;
  const catagory = req.body.catagory;
  const data = await Expanse.create({description:description,money:money,catagory:catagory})
  res.status(201).json({newExpDetail:data});
}

exports.getExpanse = async (req, res, next) => {
  const expanses = await Expanse.findAll();
  res.status(200).json({allExpanse:expanses})
}

exports.deleteExpanse = async (req, res, next) => {
  const eId = req.params.id;
  await Expanse.destroy({where:{id:eId}})
  res.sendStatus(200);
}

