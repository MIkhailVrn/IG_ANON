var users = [
    { 
        userName : 'chudo.sredstvo1',
        password : 'InstFake1' //should be 811
    }//,
    //{ 
    //    userName : 'world.best.hotties',
    //    password : 'HotRep811Hotties' 
    //}
];

// get random user name and password
function getRandomUserData(){
    //return {userName : "world.best.hotties", password : "HotRep811Hotties"};
    var randomIndex = Math.floor(Math.random() * (users.length));
    return users[randomIndex];
}

exports.getRandomUserData = getRandomUserData;