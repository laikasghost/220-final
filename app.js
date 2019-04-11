//app.js creates the server and passes info to module
var http = require('http');
var url = require('url');
var utils = require('./server-utils.js');
var nodeRetriever = require("./node-retriever.js");

function ProcessQuery(query, res) {
    switch (query["request"]) {
        case "GetNextNodes":
            nodeRetriever.GetNextNodes(res, query["text"]);
            break;
        case "UpdatePhoto":
            //write a function for this
            break;
        case "UpdateSound":
            //write a function for this
            break;
        default:
            var errObj = {message: "Query not supported"};
            utils.sendJSONObj(res, 500, errObj);
            break;
    }
}

function ServeStuff(req, res) {
    //extracts possible query from req
    var query = url.parse(req.url).query;
    if (query) {
        //parse the query into a dictionary
        query = utils.StringToQuery(query);
        //call a function to deal with queries
        ProcessQuery(query, res);
    }
}

//creates a server
var server = http.createServer(ServeStuff);

//listens for an incoming request from the client
server.listen(8080);