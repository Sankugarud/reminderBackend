const express = require('express');
const router = express.Router();
const schedule = require('node-schedule');
const User = require('../model/usedata');
require('dotenv').config()

router.use(express.json())
router.use(express.urlencoded({ extended: true }));



const accountSid = process.env.TWILIO_ACCOUNT_SID;

const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

router.post('/medicinereminder', async (req, res)=> {
    const {number, text, time, date,selectedDays} = req.body;
  
    
    const exitingUser = await User.findOne({number:number});
    if(exitingUser){
      exitingUser.data.push({
        text: text,
        time: time,
        date: date,
        selectedDays: selectedDays,
      });

    await exitingUser.save();
   }else{
    const user = new User({
      number:number,
      data: [
        {
          text: text,
          time: time,
          date: date,
          selectedDays: selectedDays,
        },
      ],
  })

    await user.save()
   }
   const getDayOfWeek = (day) => {
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return daysOfWeek.indexOf(day.toLowerCase());
  };

    const newuser = await User.findOne({number:number});
    
    newuser.data.map(async(item)=> {
      

    const dateTime = item.time;
    const dateDate = item.date;
    const cDate = new Date(dateDate);
    const scheduleRule = {};

    if (dateDate) {
        scheduleRule.year = cDate.getFullYear();
        scheduleRule.month = cDate.getMonth();
        scheduleRule.date = cDate.getDate();
      
        scheduleRule.hour = parseInt(dateTime.split(':')[0]);
        scheduleRule.minute = parseInt(dateTime.split(':')[1]);
    }else{
      
      scheduleRule.hour = parseInt(dateTime.split(':')[0]);
      scheduleRule.minute = parseInt(dateTime.split(':')[1]);
    }
    if (item.selectedDays.length === 0) {
      const job = schedule.scheduleJob(scheduleRule, () => {
          client.messages
            .create({
              body: `your reminder about medicine ${item.text} at ${item.time}`,
              to: `+91${number}`, 
              from: '+1 866 280 3419',
            })
              .then((message) => console.log(message.sid));

              client.messages
                .create({
                  body: `why dont u replyingggg????`,
                  to: `whatsapp:+91${number}`,
                  from: 'whatsapp:+14155238886'
                })
                .then(message => console.log(message.sid));
          });
    }else{
      item.selectedDays.forEach((day) => {
        scheduleRule.dayOfWeek = getDayOfWeek(day);
        const job = schedule.scheduleJob(scheduleRule, () => {
          client.messages
            .create({
              body: `your reminder about medicine ${item.text} at ${item.time}`,
              to: `+91${number}`, 
              from: '+1 866 280 3419',
            })
              .then((message) => console.log(message.sid));



              client.messages
                .create({
                  body: `your reminder about medicine ${item.text} at ${item.time}`,
                  to: `whatsapp:+91${number}`,
                  from: 'whatsapp:+14155238886'
                })
                .then(message => console.log(message.sid));
        });
      });
      
    }

    

    })


    res.send(newuser);
  
    


 

    
})
     
   
    







module.exports = router;