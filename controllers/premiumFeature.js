// const express = require("express");
// const User = require("../models/User");
// const Expense = require("../models/expanse");
// const sequelize = require("../util/database");

// const getUserLeaderBoard = async (req, res) => {
//   try {
//     const users = await User.findAll({
//       attributes:['id','name']
//     });
//     const expenses = await Expense.findAll({
//       attributes:['SignUpFormId','money']
//     });
//     const userAggregatedExpenses = {};
//     expenses.forEach((expense) => {
//       if (userAggregatedExpenses[expense.SignUpFormId]) {
//         userAggregatedExpenses[expense.SignUpFormId] =
//           userAggregatedExpenses[expense.SignUpFormId] + expense.money;
//       } else {
//         userAggregatedExpenses[expense.SignUpFormId] = expense.money;
//       }
//     });
//     var userLeaderBoardDetails = [];
//     users.forEach((user) => {
//       // console.log(userAggregatedExpenses[user.id] === undefined);
//       if (userAggregatedExpenses[user.id] === undefined) {
//         userAggregatedExpenses[user.id] = 0;
//       }
//       userLeaderBoardDetails.push({
//         name: user.name,
//         total_cost: userAggregatedExpenses[user.id],
//       });
//     });
//     console.log(userLeaderBoardDetails);
//     userLeaderBoardDetails.sort((a, b) => b.total_cost - a.total_cost);
//     res.status(200).json(userLeaderBoardDetails);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// };

// module.exports = {
//   getUserLeaderBoard,
// };


const Expense = require("../models/expanse");
const Leaderboard = require("../models/User");



exports.leaderboard=async (req, res)=>{

let a= await Leaderboard.findAll({order:[['totalExpenses','DESC']]})
console.log(a);
res.json(a);

}