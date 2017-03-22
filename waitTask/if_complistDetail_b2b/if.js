var MEAP=require("meap");
/**
 * 
 * 统一代办3.0  B2B：    已办流程和业务查询
 * 作者：xialin
 * 时间：20160830
 * 
 */
function run(Param, Robot, Request, Response, IF)
{
  
  var arg = JSON.parse(Param.body.toString());
    var userId =arg.userId;        //员工id
    var bussType  =arg.bussType ;  //单据类型
    var beginDate =arg.beginDate;  //开始日期
    var endDate =arg.endDate ; //结束日期  
    var FIELD_S6 =arg.FIELD_S6 ;//客户姓名 
    var startPage = arg.startPage;  //起始页 
    var pageSize =arg.pageSize; //每页条数
  
   // var url =global.baseHANA+"/cttqdc/services/wflow/comp_task.xsodata/complist?$expand=Expand_task&$filter=(substringof('"+userId+"',UID_FILTER1) or substringof('"+userId+"',UID_FILTER2))";
    //http://10.10.1.104:8000/cttqdc/services/wflow/comp_task_B2B_detail.xsjs?
//UID=2003794&BUSSTYPE=B2B_OrderConf&BUSSCATG=F020&BEGDAT=20160901&ENDDAT=20161030&FIELD_S6=测试&SKIP=0&TOP=10&ORDER=asc
	var url =global.baseHANA +"/cttqdc/services/wflow/comp_task_B2B_detail.xsjs?UID="+userId;
	
	var skip=(startPage-1)*pageSize;  //起始
    var top =pageSize;
    if(null==userId||userId==""){
          Response.end(JSON.stringify({
                   status:-1,
                   message:"userId不能为空"
               }));
          return ;

    }
   
      var url2 ="&BUSSCATG=F020&SKIP="+skip+"&TOP="+top+"&ORDER=desc";
    
    
    
     if(bussType!=null&&bussType!=''){
        url =url+"&BUSSTYPE="+bussType;
    }
    
    if(beginDate!=null&&beginDate!=''){
        url =url+"&BEGDAT="+beginDate;
    }
    
    if(endDate!=null&&endDate!=''){
        url =url+"&ENDDAT="+endDate;
    }
    
     if(FIELD_S6!=null&&FIELD_S6!=''){
        url =url+"&FIELD_S6="+FIELD_S6;
    }
    
    url =url+url2;
    console.log(url);
     var option = {
        agent : false,
        method : "GET",
        url : url,
        BasicAuth : global.HanaAuth

    };
    MEAP.AJAX.Runner(option, function(err, res, data) {
        Response.setHeader("Content-type", "text/json;charset=utf-8");
        if (!err) {
            console.log(data);
            var data = JSON.parse(data);
            if (data instanceof Array) {

                Response.end(JSON.stringify({
                   status:0,
                   data:data
               }));
            }else{
                Response.end(JSON.stringify({
                   status:-1,
                   message:"查询HANA出错"
               }));
            }

        } else {
            Response.end(JSON.stringify({
                   status:-1,
                   message:"查询HANA出错"
               }));
        }
            
            
    });
    
}

exports.Runner = run;