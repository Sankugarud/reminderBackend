const mongoose = require('mongoose');

 async function connectDatabase(){
    const db = await mongoose.connect('mongodb://localhost:27017/MedicineReminder')
    return db;
 }  

 module.exports = connectDatabase;
