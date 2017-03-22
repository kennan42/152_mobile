var MEAP=require("meap");
var path = require("path");
/**
 * 人员搜索
 * @param {Object} Param
 * @param {Object} Robot
 * @param {Object} Request
 * @param {Object} Response
 * @param {Object} IF
 */
function run(Param,Robot,Request,Response,IF)
{
   var arg = JSON.parse(Param.body.toString());
    var option = {
        //wsdl:"http://cttqqas.cttq.com:8011/sap/bc/srt/wsdl/flv_10002A111AD1/bndg_url/sap/bc/srt/rfc/sap/zhrwswf02/900/zhrwswf02/zhrwswf02?sap-client=900",
        wsdl : path.join(__dirname.replace(IF.name, ""), global.wsdl, "zhrwswf02.xml"),
        func : "ZHRWSWF02.ZHRWSWF02.Zhrwswf02",
        Params : arg,
        BasicAuth : global.TXSOAPAuth
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
