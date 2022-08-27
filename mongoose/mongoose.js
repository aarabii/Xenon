// const mongoose = require('mongoose');
// const MongooseConectionString = process.env.MONGODB_URI;

// module.exports = async (client) => {
//     if(!MongooseConectionString)
//         return console.log('Mongoose is not connected...');

//     await mongoose.connect(MongooseConectionString, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     }).then(() => {
//         console.log('Mongoose is connected...');
//     }).catch((error) => {
//         console.error(error);
//     })

//     const db = mongoose.connection;

//     db.on('error', () => {
//         console.log('> error occurred from the database');
//     });
//     db.once('open', () => {
//         console.log('> successfully opened the database');
//     });
// }