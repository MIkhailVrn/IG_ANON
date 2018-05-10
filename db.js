var MongoClient = require('mongodb').MongoClient;

// Connection URL 
var url = "mongodb://Admin2:InstaAnon811@ds161029.mlab.com:61029/heroku_chq8wgqb";

// async function connect(callback) {
//   // Use connect method to connect to the server
//   let DBInst = await MongoClient.connect(url);
//   return DBInst;
// }


// db class
class DBClass {
  constructor() {
    this.DBInst = {};
    //this.connect();
  }

  async connect() {
    var client = await MongoClient.connect(url);
    this.DBInst = client.db("heroku_chq8wgqb");
  }

  async recordUserSearch(userName) {
    // Get the documents collection
    var collection = this.DBInst.collection("users");
    // update
    var currDate = new Date(),
        date = currDate.getDate() + '.' + (currDate.getMonth() + 1) + '.' + currDate.getFullYear();
    var user = await collection.findOne({ userName: userName, date: date });
    if (user) {
      user.count++;
      let pro = collection.update({
        userName: user.userName,
        date: user.date,
      }, user, {
        upsert: true
      });
    }
    else {
      user = {
        userName : userName,
        date : date,
        count : 1
      };
      collection.insert(user);
    }

  }

}

exports.DBClass = DBClass;
