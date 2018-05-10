var MongoClient = require('mongodb').MongoClient;

// Connection URL 
var url = "mongodb://Admin2:InstaAnon811@ds161029.mlab.com:61029/heroku_chq8wgqb";

async function connect(callback) {
  // Use connect method to connect to the server
  let DBInst = await MongoClient.connect(url);
  return DBInst;
}

async function recordUserSearch(userName) {
  // Get the documents collection
  var collection = DBInst.collection('users');
  // update
  var date = new Date().getDate();
  var user = await collection.findOne({ userName: userName, date: date });
  if (user) {
    user.count++;
    let pro = collection.update({
      userName: user.userName,
      date: user.userName,
      }, oUser, {
        upsert: true
      });
  } else {
    user.userName = userName,
    user.date = date,
    user.count = 1;
    collection.insert(user);
  }


}

exports.connect = connect;

