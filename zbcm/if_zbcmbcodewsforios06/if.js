var MEAP=require("meap");
var path = require("path");

function run(Param,Robot,Request,Response,IF)
{
	var arg = JSON.parse(Param.body.toString());
	var option={
		wsdl:path.join(__dirname.replace(IF.name,""),global.wsdl,"zbcmbcodewsforios06.xml"),
		func:"ZBCMBCODEWSFORIOS06.ZBCMBCODEWSFORIOS06.ZBCMBCODEFORIOS06",
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