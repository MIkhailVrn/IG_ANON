var storyHelper = require('./storyHelper');
var userStorage = require('./userStorage');
var sTargetUserName;

function getUserStories(response, request, params) {
    
    // target user
    sTargetUserName = params.userName;
    
    //get random user for login
    var oLogUserData = userStorage.getRandomUserData();
    
    // login with selected user
    storyHelper.startSession(sTargetUserName, oLogUserData.userName, oLogUserData.password, response);
}


exports.getUserStories = getUserStories;
