var MEAP=require("meap");
var path =require("path");

/**
 * 运营费用票据操作（新增、修改、删除）
 * zrx
 * 2016-10-31
 * @param {Object} Param
 * @param {Object} Robot
 * @param {Object} Request
 * @param {Object} Response
 * @param {Object} IF
 */
function run(Param,Robot,Request,Response,IF)
{
    var arg = JSON.parse(Param.body.toString());
    var option={
        //wsdl:http://bmu.cttq.com:51800/EM_GPBUS2_OpexInvOpt/EMGPBUS2OpexInvOptImplBean?wsdl,
        wsdl:path.join(__dirname.replace(IF.name,""),global.wsdl,"EMGPBUS2OpexInvOptImplBean.xml"),
        func:"EM_GPBUS2_OpexInvOpt.EM_GPBUS2_OpexInvOpt_Port.EMGPBUS2_OpexInvOpt",
        Params:arg,
        agent:false
    };
    
    MEAP.SOAP.Runner(option,function(err,res,data){
        Response.setHeader("Content-type","text/json;charset=utf-8");
        if(!err)
        {
            Response.end(JSON.stringify(data));
        }
        else
        {
            Response.end(JSON.stringify({status:'-1',message:'Error'}));
        }
    });
}

exports.Runner = run;
