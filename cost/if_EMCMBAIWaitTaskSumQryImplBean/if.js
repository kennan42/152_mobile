var MEAP = require("meap");
var path = require("path");

/**
 * 统一待办-待办数量
 *
 * @param Param
 * @param Robot
 * @param Request
 * @param Response
 * @param IF
 *
 * @author cky
 */
function run(Param, Robot, Request, Response, IF) {
    var arg = JSON.parse(Param.body.toString());
    var option = {
        //wsdl: "http://bmd.cttq.com:51200/EM_CMB_AIWaitTaskSumQry_Service/EMCMBAIWaitTaskSumQryImplBean?wsdl",
        wsdl: path.join(__dirname.replace(IF.name, ""), global.wsdl, "EMCMBAIWaitTaskSumQryImplBean.xml"),
        func: "EM_CMB_AIWaitTaskSumQry.EM_CMB_AIWaitTaskSumQry_Port.EMCMBAIWaitTaskSumQry",
        Params: arg,
        agent: false
    };

    MEAP.SOAP.Runner(option, function (err, res, data) {
        Response.setHeader("Content-type", "text/json;charset=utf-8");
        if (!err) {
            Response.end(JSON.stringify(data));
        } else {
            Response.end(JSON.stringify({
                status: '-1',
                message: 'Error'
            }));
        }
    });
}

exports.Runner = run;
