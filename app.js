const express = require('express');
const connectDatabase = require('./database');
const router = require('./routes/index');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

connectDatabase()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

app.use('/', router);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server started on port 5000');
});
