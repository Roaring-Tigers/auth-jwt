const express = require('express');
const app = express();

//database
require('./database.js');
// import "./database.js"


//models 
const User = require('./models/User.models.js');



//routes:
const authRouter = require('./routes/user.routes.js');


const port = 5000;


//middlewares:
app.use(express.json());

//routes:
app.use('/api', authRouter);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
