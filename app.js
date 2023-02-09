const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const User = require('./models/User');
const Expanse = require('./models/expanse')
const userRoutes = require('./routes/user');
const Order = require('./models/orders');
const premiumFeatureRoutes = require("./routes/premiumfeature");
const Forgotpassword = require('./models/forgotpassword');
//const ExpanseRoutes = require('./routes/expanse')

const resetPasswordRoutes = require('./routes/resetpassword')

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use( userRoutes);
app.use("/premium", premiumFeatureRoutes);
app.use('/password', resetPasswordRoutes);

User.hasMany(Expanse);
Expanse.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

sequelize.sync()
.then((res) => {
app.listen(8000, () => {
console.log('server is running on port 8000')
});
})
.catch(err => console.log(err))




