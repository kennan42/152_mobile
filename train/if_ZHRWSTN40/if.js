/*------------------------------------------------------------
 // 文件名：if.js
 // 文件功能描述： 搜索人员清单（所属部门下面人员）
 //
 // 创 建 人：zrx
 // 创建日期：2016.7.1
 //
 // 修 改 人：
 // 修改日期：
 // 修改描述：
 //-----------------------------------------------------------*/

var MEAP = require("meap");
var path = require("path");
function run(Param, Robot, Request, Response, IF) {
    var arg = JSON.parse(Param.body.toString());
    var option = {
       // wsdl : global.train + "/sap/bc/srt/wsdl/flv_10002A111AD1/bndg_url/sap/bc/srt/rfc/sap/zhrwstn38/900/zhrwstn38/zhrwstn38?sap-client=900",
        wsdl: path.join(__dirname.replace(IF.name, ""), global.wsdl, "zhrwstn40.xml"),
        func : "ZHRWSTN40.ZHRWSTN40.ZHRWSTN40",
        Params : arg,
        agent : false
    };

    MEAP.SOAP.Runner(option, function(err, res, data) {
        Response.setHeader("Content-type", "text/json;charset=utf-8");
         if (!err) {
            Response.end(JSON.stringify({status:'0',msg:"调用成功",data:data}));
        }
        else {
            Response.end(JSON.stringify({status: '-1', msg: err}));
        }
    });
}

exports.Runner = run;
