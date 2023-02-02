const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const User = require('./models/User');
const userRoutes = require('./routes/user');
const ExpanseRoutes = require('./routes/expanse')

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use( userRoutes);
app.use(ExpanseRoutes)

sequelize.sync()
.then((res) => {
app.listen(8000, () => {
console.log('server is running on port 8000')
});
})
.catch(err => console.log(err))




