const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const dbConnection = () => {
  mongoose
    .connect(
      'mongodb+srv://Yahia:5zWu1tXNnkqiJ9dI@cluster0.z0wznpm.mongodb.net/E-Commerce'
    )
    .then((conn) => {
      console.log(`Database Connected: ${conn.connection.host}`);
    });
};

module.exports = dbConnection;
