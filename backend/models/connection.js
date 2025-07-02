const mongoose = require('mongoose');

//const connectionString = process.env.CONNECTION_STRING
const connectionString = "mongodb+srv://admin:whhzsSnK9MYMjD0b@cluster0.ckyrlea.mongodb.net/tickethack"


mongoose.connect(connectionString, { connectTimeoutMS: 2000 }).then(() => console.log('Database connected')) .catch(error => console.error(error));
