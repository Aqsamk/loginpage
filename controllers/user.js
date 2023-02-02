const User = require('../models/User');
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

/*exports.postSignIn = (req, res, next) => {
  const { email, password } = req.body;

  User.findAll({ where: { email, password } })
    .then((user) => {
      if (user.length > 0) {
        if (user[0].password === password) {
          res.status(200).json({ success: true, message: "User logged in successfully" });
        } else {
          return res.status(400).json({ success: false, message: "Password is incorrect" });
        }
      } else {
        return res.status(404).json({ success: false, message: 'user not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err, success: false });
    });
};*/

exports.postSignIn = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({where: {email} });
    try {
      
      if (!user) {
        throw new Error('User not found');
      }
      console.log(password,user.password)
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new Error('Incorrect password');
        //console.log('incorrect password')
      }
  
      res.status(200).json({ message: 'Sign in successful' });
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: 'Sign in failed' });
    }
  };
  

exports.getUsers = async (req, res, next) => {
  const users = await User.findAll();
  res.status(200).json({ allUsers: users });
};
