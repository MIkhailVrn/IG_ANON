var storyHelper = require('./storyHelper');
var userStorage = require('./userStorage');
var sTargetUserName;

function getUserStories(response, request, params, DBInst) {
    
    // target user
    sTargetUserName = params.userName;
    //record request to the database
    DBInst.recordUserSearch(sTargetUserName);

    //get random user for login
    var oLogUserData = userStorage.getRandomUserData();
    
    // login with selected user
    storyHelper.startSession(sTargetUserName, oLogUserData.userName, oLogUserData.password, response);
}


exports.getUserStories = getUserStories;
