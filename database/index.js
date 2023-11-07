const mongoose = require('mongoose');

 async function connectDatabase(){
    const db = await mongoose.connect('mongodb+srv://new_user:Sanket123@cluster.mongodb.net/MedicineReminder')
    return db;
 }  

 module.exports = connectDatabase;
