/*------------------------------------------------------------
 // Copyright (C) 2015 正益无线（北京）科技有限公司  版权所有。
 // 文件名：if.js
 // 文件功能描述： 查询超标详情,封装了该接口
 //
 // 创 建 人：杨尚飞
 // 创建日期：2015.1.17
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
        //wsdl : "http://bmd.cttq.com:51200/EM_GPTRVL_OverpDetailQry/EMGPTRVLOverpDetailQryImplBean?wsdl",
        wsdl : path.join(__dirname.replace(IF.name, ""), global.wsdl, "EMGPTRVLOverpDetailQryImplBean.xml"),
        func : "EM_GPTRVL_OverpDetailQry.EM_GPTRVL_OverpDetailQry_Port.EM_GPTRVL_OverpDetailQry",
        Params : arg,
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
