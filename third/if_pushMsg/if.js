var MEAP=require("meap");
var util = require("../../base/util.js");
var jpushUtil = require("../../jpush2/jpush_util.js");


function run(Param, Robot, Request, Response, IF)
{
    var arg = JSON.parse(Param.body.toString());
    if(arg.title == null || arg.title == ""){
        Response.end(JSON.stringify({
            "status":"-1",
            "msg":"消息标题不能为空"
        }));
        return;
    }
    if(arg.module == null || arg.module == ""){
        Response.end(JSON.stringify({
            "status":"-1",
            "msg":"消息所属模块不能为空"
        }));
        return;
    }

    if(arg.subModule == null || arg.subModule == ""){
        Response.end(JSON.stringify({
            "status":"-1",
            "msg":"消息所属子模块不能为空"
        }));
        return;
    }
    if(arg.userIds == null || arg.userIds == ""){
        Response.end(JSON.stringify({
            "status":"-1",
            "msg":"推送用户不能为空"
        }));
        return;
    }
    if(typeof arg.userIds != "object" || arg.userIds.length == undefined){
        Response.end(JSON.stringify({
            "status":"-1",
            "msg":"推送用户不能为空"
        }));
        return;
    }
	 var pushArg = {
            appId : global.appId,
            platforms : "0,1",
            title:arg.title,
            userIds:arg.userIds,
            body : new Date().getTime()  + "_" +  arg.subModule,    
            module:arg.module,
            subModule:arg.subModule
        }; 
        
     var jpushArg = {
            userid:"",
            userList:arg.userIds,
            title:"",
            content:arg.title,
            type:0,
             msgType:arg.module,
             subModule:arg.subModule
        };     
        
   
	// util.pushMsg(pushArg);	
	jpushUtil.jpush(jpushArg);
	
	
     Response.end(JSON.stringify({
            "status":"0",
            "msg":"调用消息推送成功"
        }));
    
}

exports.Runner = run;


                                

	

