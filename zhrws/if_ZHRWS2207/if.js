var MEAP = require("meap");
var path = require("path");

function run(Param, Robot, Request, Response, IF) {
    var arg = JSON.parse(Param.body.toString());
    var option = {
        //wsdl : "http://cttqdev.cttq.com:8011/sap/bc/srt/wsdl/flv_10002A111AD1/bndg_url/sap/bc/srt/rfc/sap/zhrws2207/900/zhrws2207/zhrws2207?sap-client=900",
        wsdl:path.join(__dirname.replace(IF.name,""),global.wsdl,"zhrws2207.xml"),
        func : "ZHRWS2207.ZHRWS2207.ZHRWS2207",
        Params : arg,
        BasicAuth : global.TXSOAPAuth,
        agent : false
    };

    MEAP.SOAP.Runner(option, function(err, res, data) {
        Response.setHeader("Content-type", "text/json;charset=utf-8");
        if (!err) {
            Response.end(JSON.stringify(data));
        } else {
            Response.end(JSON.stringify({
                status : '-1',
                message : 'Error'
            }));
        }
    });
}

exports.Runner = run;
