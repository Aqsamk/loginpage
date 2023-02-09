const User = require('../models/User');
const Expanse = require('../models/expanse');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

/*unction generateAccessTokenHere(id,name,ispremiumuser){
  return jwt.sign({userId:id,name:name,premium:ispremiumuser},'secretkey')
}*/

  const generateAccessToken = (id, name,ispremiumuser ) => {
  return jwt.sign({ userId: id, name: name,ispremiumuser:ispremiumuser}, "secretkey");
};


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
    //const ispremiumuser = req.body.ispremiumuser;
    const saltround = 10;
    bcrypt.hash(password,saltround,async(err,hash) =>{
        const data = await User.create({ name, email,  password : hash, });
        res.status(201).json({ newUserDetail: data });
    })
    

  } catch (err) {
    console.log(err);
  }
};

exports.getSignIn = (req, res, next) => {
  res.sendFile(__dirname + "/view/login-page.html");
};

//forgot password page

exports.getforgotPage = (req,res,next) => {
  res.sendFile(__dirname+"/view/forgotpassword.html")
}




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
      res.status(200).json({ message: 'Sign in successful' ,
      //token: generateAccessToken(user.id, user.name),
            token: generateAccessToken(
              user.id,
              user.name,
              user.ispremiumuser
            ),
    });
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
  const data = await Expanse.create({description:description,money:money,catagory:catagory,SignUpFormId:req.user.id})
  
  res.status(201).json({newExpDetail:data});


  Expanse.create({money,description,catagory,userId:req.user.id}).then(expense => {
    const totalExenses = Number(req.user.totalExenses) + Number(money)
    console.log(totalExenses)
    User.update({
      totalExenses:totalExenses
    },{
      where:{id:req.user.id}
    }).then(async()=>{
      res.status(200).json({expense:expense})
    }).catch(async(err) => {
      return res.status(500).json({success:false,error:err})
    })
  }).catch(async(err) => {
    return res.status(500).json({success:false,error:err})
  })
}
exports.getExpanse = async (req, res, next) => {
 // const expanse = await Expanse.findAll();
  const expanses = await Expanse.findAll({where:{SignUpFormId:req.user.id}});
  //req.user.getExpanse();

  res.status(200).json({allExpanse:expanses})
}

exports.deleteExpanse = async (req, res, next) => {
  const eId = req.params.id;
 // const UserIdent = req.user.id
  await Expanse.destroy({where:{id:eId}})
// console.log(UserIdent);
 // .then((noofrows) => {
 //   if(noofrows === 0){
  //    return res.status(404).json({success:false,message:"Expense doesn't belong to the user"})
  //  }
    return res.sendStatus(200);
 // })
  
}

//module.exports ={ generateAccessToken,postSignIn};

