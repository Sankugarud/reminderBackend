const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    number:Number,
    data:[{
        text:String,
        time:String,
        date:String,
        selectedDays:[String],
    }]
    
})

const User = new mongoose.model('User', userSchema);
module.exports = User