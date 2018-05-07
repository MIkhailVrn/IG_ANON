var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname,
        params =  url.parse(request.url, true).query;
    
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, params, response, request);
  }

  http.createServer(onRequest).listen(process.env.PORT);
  console.log("Server has started.");
}
 
exports.start = start;