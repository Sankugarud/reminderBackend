const mongoose = require('mongoose');

 async function connectDatabase(){
    const db = await mongoose.connect('mongodb+srv://new_user:Sanket123@cluster0.pnpsdhv.mongodb.net/?retryWrites=true&w=majority')
    return db;
 }  

 module.exports = connectDatabase;
