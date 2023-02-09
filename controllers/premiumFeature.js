// const express = require("express");
// const User = require("../models/User");
// const Expense = require("../models/expanse");
// const sequelize = require("../util/database");
// const { Sequelize } = require("sequelize");

// const getUserLeaderBoard = async (req, res) => {
// try {
// const users = await User.findAll({
//   attributes:['id','name']
// });
// const userAggregatedExpenses = await Expense.findAll({
//   attributes: ['SignUpFormId',Sequelize.fn("sum",sequelize.col("money")),'total_cost'],
//   group:['SignUpFormId']
// });
// //console.log(expenses);
// //const userAggregatedExpenses = {};

// // expenses.forEach((expense) => {
// //   if (userAggregatedExpenses[expense.SignUpFormId]) {
// //     userAggregatedExpenses[expense.SignUpFormId] =
// //       userAggregatedExpenses[expense.SignUpFormId] + expense.money;
// //   } else {
// //     userAggregatedExpenses[expense.SignUpFormId] = expense.money;
// //   }
// // });

// let userLeaderBoardDetails = [];
// users.forEach((user) => {
//   if (userAggregatedExpenses[user.id] === undefined) {
//     userAggregatedExpenses[user.id] = 0;
//   }
//   userLeaderBoardDetails.push({
//     name: user.name,
//     total_cost: userAggregatedExpenses[user.id],
//   });
// });

// userLeaderBoardDetails.sort((a, b) => b.total_cost - a.total_cost);
// res.status(200).json(userAggregatedExpenses);
// } catch (err) {
//   console.log(err);
//   res.status(500).json(err);
//   }
//   };
  
//   module.exports = {
//   getUserLeaderBoard,
//   };
const express = require("express");
const User = require("../models/User");
const Expense = require("../models/expanse");
const sequelize = require("../util/database");
const { Sequelize } = require("sequelize");

const getUserLeaderBoard = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name"],
    });
    const userAggregatedExpenses = await Expense.findAll({
      attributes: [
        "SignUpFormId",
        Sequelize.fn("sum", sequelize.col("money")),
        "total_cost",
      ],
      group: ["SignUpFormId"],
    });
    userAggregatedExpenses.sort(
      (a, b) => b.total_cost - a.total_cost
    );

    const userLeaderBoardDetails = users.map((user) => {
      const userExpense = userAggregatedExpenses.find(
        (expense) => expense.SignUpFormId === user.id
      );
      return {
        name: user.name,
        total_cost: userExpense ? userExpense.total_cost : 0,
      };
    });

    res.status(200).json(userLeaderBoardDetails);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  getUserLeaderBoard,
};
