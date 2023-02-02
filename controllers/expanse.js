const Expanse = require('../models/expanse');

//exports.getAddExpanse = (req, res, next) => {
 //   res.sendFile(__dirname + "/view/form.html")
//}

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