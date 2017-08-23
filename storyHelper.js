var Client = require('instagram-private-api').V1;
var _ = require('underscore');

async function startSession (sTargetUserName, userName, password, response){
    
    // set Device
    var device = new Client.Device(userName);
    
    //get cookies file
    var sFileName = userName.split('.').join("");
    sFileName = './cookies/' + sFileName + '.json'
    var storage = new Client.CookieFileStorage(sFileName);
    
    Client.Session.create(device, storage, userName, password, response)
    .then(function(session) {
       
        // search for Target user by name, to get his ID
        return [session, Client.Account.searchForUser(session, sTargetUserName).catch(function() {sendNotFoundResponse(response)}), response];
        
    })
    .spread(getStoriesForAccount);
}

async function getStoriesForAccount(session, account, response) {
    
    if (!account.id){
        return;
    }
    
    var feed = new Client.Feed.UserStory(session, [account.id.toString()]);
    var results = await feed.get();
    var arrStories = _.flatten(results);
    
    sendResponse(arrStories, response);
}

function sendResponse(arrStories, response) {
    // prepare array of links to stories in the best qualities
    var arrMedia = [];
    arrStories.forEach(function(item){
        if (item._params.video){
            arrMedia.push({url : item._params.video.versions[0].url, type: 'video'});
        } else if (item._params.images){
            arrMedia.push({url :item._params.images, type: 'image'});
        }
    });
    
    var finalJSON = JSON.stringify(arrMedia);
    
    // write and send response
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(finalJSON);
    response.end();
    
}

function sendNotFoundResponse (response){
    // write and send response
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    response.writeHead(201, {"Content-Type": "application/json"});
    response.end();
}


exports.startSession = startSession;