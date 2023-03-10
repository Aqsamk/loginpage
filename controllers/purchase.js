const Razorpay = require('razorpay');
const Order = require('../models/orders');
const userController = require('./user')
const jwt = require('jsonwebtoken')


/*exports.getpaymentpage = (req, res, next) => {
    res.sendFile(__dirname +'/view/expanse.html');
  };*/
 function newtoken(id,premiumuser,name){
    jwt.sign({id:id,premiumuser:premiumuser,name:name}, "secretkey")
 }
  
  

const purcahsepremium = async(req,res) => {
    try {
        var rzp = new Razorpay( {
            key_id : process.env.Razorpay_KEY_ID,
            key_secret: process.env.Razorpay_KEY_SECRET
        })
        const amount = 2500;

        rzp.orders.create({amount,currency: "INR"}, (err,order) => {
            if(err){
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({orderid:order.id,status:'PENDING'}).then(() => {
                return res.status(201).json({order,key_id:rzp.key_id});
            }).catch(err => {
                throw new Error(err)
            })
        })
    }
    catch(err) {
        console.log(err);
        res.status(403).json({message:'something went wrong ',error:err})

    }
}


const UpdateTransactionStatus = async(req,res) => {
    try {
        const {payment_id,order_id} = req.body;
        const order = await Order.findOne({where : {orderid:order_id}})
        const promise1 =  order.update({paymentid:payment_id,status:'SUCCESSFULL'})
        const prmoise2 = req.user.update({ispremiumuser:true})
       
            
                
        Promise.all([promise1,prmoise2]).then(() => {
            return res.status(202).json({success:true,message:"Transaction Successful",token: newtoken(undefined,true)});
        }).catch((err) => {throw new Error(err)})
    }
    catch(err){
        console.log(err);
        res.status(403).json({error:err,message:'Something went wrong'})
    }

}

module.exports = {
    purcahsepremium,
    UpdateTransactionStatus
}