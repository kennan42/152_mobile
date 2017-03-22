var MEAP = require("meap");
var path = require("path");

function run(Param, Robot, Request, Response, IF) {
    var option = {
        //wsdl:"http://cttqdev.cttq.com:8011/sap/bc/srt/wsdl/flv_10002A111AD1/bndg_url/sap/bc/srt/rfc/sap/zhrws2113/900/zhrws2113/zhrws2113?sap-client=900",
        wsdl : path.join(__dirname.replace(IF.name, ""), global.wsdl, "zhrws2113.xml"),
        func : "ZHRWS2113.ZHRWS2113.ZHRWS2113",
        Params : {
            DOC_ID : Param.params.DOC_ID
        },
        BasicAuth : global.TXSOAPAuth,
        agent : false
    };

    MEAP.SOAP.Runner(option, function(err, res, data) {
        if (!err) {
            var d = new Buffer(data.DOCUMENT2, "base64");
            Response.setHeader("Content-Disposition", "attachment;filename=" + encodeURI(data.DOU_NAME));
            Response.write(d);
            Response.end();
        } else {
            Response.end(JSON.stringify({
                status : '-1',
                message : 'Error'
            }));
        }
    });
}

exports.Runner = run;
