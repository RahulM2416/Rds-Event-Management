require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());

const routes = require('./routes/routes');
app.use('/api',routes);

app.listen(process.env.PORT,()=>{
    console.log("Connected to Server..");
});

