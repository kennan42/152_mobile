var MEAP = require("meap");
var qs = require("querystring");

function run(Param, Robot, Request, Response, IF) {

    var headers = Request.headers;
    var host = headers.host;
    console.log(host);
    Response.end("OK");
}

exports.Runner = run;

