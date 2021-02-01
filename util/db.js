var mongoose = require('mongoose');


module.exports = () => {
  if (mongoose.connections[0].readyState) return new Promise(function(resolve,reject){resolve();});
  // Using new database connection
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
};