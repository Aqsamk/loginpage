const uuid = require("uuid");
const Sib = require("sib-api-v3-sdk");
require("dotenv").config();
const bcrypt = require("bcrypt");

const User = require("../models/User");
const Forgotpassword = require("../models/forgotpassword");

const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      const id = uuid.v4();
      user.createForgotpassword({ id, active: true }).catch((err) => {
        throw new Error(err);
      });
      const client = Sib.ApiClient.instance;

      const apiKey = client.authentications["api-key"];
      apiKey.apiKey = process.env.API_KEY;

      const tranEmailApi = new Sib.TransactionalEmailsApi();
      const sender = {
        email: "aqsam.khan1999@gmail.com",
        name: "aqsam",
      };

      const receivers = [
        {
          email: email,
        },
      ];

      tranEmailApi
        .sendTransacEmail({
          sender,
          to: receivers,
          subject: "Send a reset password mail",
          textContent: "I will teach you how to reset a password",
          htmlContent: `<a href="http://localhost:8000/password/resetpassword/${id}">Reset password</a>`,
        })
        .then((response) => {
          // console.log(response[0].statusCode)
          // console.log(response[0].headers)
          return res.status(204).json({
            message: "Link to reset password sent to your mail ",
            sucess: true,
          });
        })
        .catch((err) => {
          throw new Error(err);
        });

      // send mail
    } else {
      throw new Error("User doesnt exist");
    }
  } catch (err) {
    console.error(err);
    return res.json({ message: err, sucess: false });
  }
};

const resetpassword = (req, res) => {
  const id = req.params.id;
  Forgotpassword.findOne({ where: { id } }).then((forgotpasswordrequest) => {
    if (forgotpasswordrequest) {
      forgotpasswordrequest.update({ active: false });
      res.status(200).send(`<html>
                                  <script>
                                      function formsubmitted(e){
                                          e.preventDefault();
                                          console.log('called')
                                      }
                                  </script>
                                  <form action="/password/updatepassword/${id}" method="get">
                                      <label for="newpassword">Enter New password</label>
                                      <input name="newpassword" type="password" required></input>
                                      <button>reset password</button>
                                  </form>
                              </html>`);
      res.end();
    }
  });
};

const updatepassword = (req, res) => {
  try {
    const { newpassword } = req.query;
    const { resetpasswordid } = req.params;
    Forgotpassword.findOne({ where: { id: resetpasswordid } }).then(
      (resetpasswordrequest) => {
        User.findOne({ where: { id: resetpasswordrequest.userId } }).then(
          (user) => {
            // console.log('userDetails', user)
            if (user) {
              //encrypt the password

              const saltRounds = 10;
              bcrypt.genSalt(saltRounds, function (err, salt) {
                if (err) {
                  console.log(err);
                  throw new Error(err);
                }
                bcrypt.hash(newpassword, salt, function (err, hash) {
                  // Store hash in your password DB.
                  if (err) {
                    console.log(err);
                    throw new Error(err);
                  }
                  user.update({ password: hash }).then(() => {
                    res
                      .status(201)
                      .json({ message: "Successfuly update the new password" });
                  });
                });
              });
            } else {
              return res
                .status(404)
                .json({ error: "No user Exists", success: false });
            }
          }
        );
      }
    );
  } catch (error) {
    return res.status(403).json({ error, success: false });
  }
};

module.exports = {
  forgotpassword,
  updatepassword,
  resetpassword,
};