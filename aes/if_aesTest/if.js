var MEAP = require("meap");
var crypto = require('crypto');

function run(Param, Robot, Request, Response, IF) {
    try {
        Response.setHeader("Content-Type","text/json;charset=utf-8");
        var arg = JSON.parse(Param.body.toString());
		var aesKey = arg.aesKey;
        var secretStr = arg.params;
        console.log("------>", aesKey, secretStr);
        
		iv = new Buffer(16);
		iv.fill(0);
 
		cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
		output = cipher.update(secretStr, 'utf8', 'base64');
		output += cipher.final('base64');

		
        Response.end(JSON.stringify({
            "status" : "0",
            "msg" : "解密成功",
            "dec" : output
        }));
    } catch(e) {
        console.log("e------->", e);
        Response.end(JSON.stringify({
            "status" : "-1",
            "msg" : "解密失败"
        }));
    }

}

exports.Runner = run;

