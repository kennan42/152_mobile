var MEAP=require("meap");
var sha1 = require("sha1");
function run(Param, Robot, Request, Response, IF)
{
   // var arg = JSON.parse(Param.body.toString());
    var AppKey = "pvxdm17jx8gir";
    var NONCE = parseInt( Math.random() * 0xffffff );
    var APPSECRET = "vXUE4m91sS";
    var TIMESTAMP = Date.parse( new Date() );
    var SIGNATURE = sha1( APPSECRET + NONCE + TIMESTAMP  );
    var option={
        method : "POST",
        url : "https://api.cn.rong.io/message/private/publish.json",
        Enctype:"application/x-www-form-urlencoded",
        Body:{
            "fromUserId":"110",
            "toUserId":"8104017",
            "objectName":"RC:TxtMsg",
            "content":JSON.stringify({
                "content":"抓起来"
            })
        },
        Headers:{
          "App-Key":AppKey,
          "Nonce":NONCE,
          "Timestamp":TIMESTAMP,
          "Signature":SIGNATURE
        }
    };
    MEAP.AJAX.Runner(option,function(err,res,data){
        if(!err)
        {
            Response.end(data);
        }
        else
        {
            Response.end(JSON.stringify({
                code:-1,
                msg:"发送获取token信息请求失败"
            }));
        }
    },Robot);
}

exports.Runner = run;


                                

	

