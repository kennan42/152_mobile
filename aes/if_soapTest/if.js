var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	var option={
		wsdl:"http://webservice.webxml.com.cn/WebServices/MobileCodeWS.asmx?wsdl",
		func:"MobileCodeWS.MobileCodeWSSoap.getMobileCodeInfo",
		Params:  '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://WebXml.com.cn/">'
   +'<soapenv:Header/>'
   +'<soapenv:Body>'
   +'<web:getMobileCodeInfo>'
         +'<web:mobileCode>18611383538</web:mobileCode>'
         +'<web:userID></web:userID>'
     +' </web:getMobileCodeInfo>'
   +'</soapenv:Body>'
+'</soapenv:Envelope>'
	};
	
	MEAP.SOAP.Runner(option,function(err,res,data){
	    Response.setHeader("Content-Type","text/json;charset=utf-8");
	    console.log("err--->",err);
	     console.log("data--->",data);
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
