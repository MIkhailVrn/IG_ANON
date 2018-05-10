var http = require("http"),
url = require("url"),
DB = require("./db.js");


async function start(route, handle) {

var DBInst = new DB.DBClass();
await DBInst.connect();

function onRequest(request, response) {
var pathname = url.parse(request.url).pathname,
    params =  url.parse(request.url, true).query;

console.log("Request for " + pathname + " received.");
route(handle, pathname, params, response, request, DBInst);
}

http.createServer(onRequest).listen(process.env.PORT);
console.log("Server has started.");
}

exports.start = start;