var MEAP = require("meap");
var sqlMaps = require("../sqlMap/init_sqlMap.js");
global.sqlMaps = sqlMaps;

global.TXSOAPAuth = {username:"HRWS",password:"hrws2015"};
global.wsdl = "wsdl_qas900";
global.ntlm_url = "http://10.10.1.151:11130/ntlm/check.jsp";
global.mongodbURL = "mongodb://mobile:mobile_1234@10.10.1.152:27017/mobile";
global.nginxURL = "http://aiqas.cttq.com:8888/";
//global.pushURL = "http://10.10.1.152:8080/push/msg/sendMessage";
global.pushURL = "http://10.10.1.152:8080/push/msg/sendSingleMessage";
global.appId = "aaaao10003";
global.redisHost = "10.10.1.152";
global.redisPort = 6379;
global.emmRedisHost = "10.10.1.151";
global.baseURL = "http://10.10.1.152";
global.appInURL = "http://10.10.1.152:8080";



// HANA相关接口的用户名密码
global.HanaAuth = {
    username : "CTTQ_APP",
    password : "Hana_app_2014"
};
//HANA-qas
global.baseHANA = "http://10.10.1.108:8011";



global.pushType="emm";
global.hanaConfig = {
    "url" : "jdbc:sap://hanaqas.cttq.com:31115?reconnect=true",
    "user" : "CTTQ_HR",
    "password" : "Hana_hr_2014",
    "libpath" : "/opt/emm/lib/ngdbc.jar",
    "drivername" : "com.sap.db.jdbc.Driver"
};
global.liveTime=864000;
global.mainAppId="dss140843969510001";
global.masJavaWebURL = "http://10.10.1.151:11130/masJavaWeb";
//微信
global.appID = "wx42228f4ebb459ca2";
global.appsecret = "d4624c36b6795d1d99dcf0547af5443d";
function run(Param, Robot, Request, Response, IF)
{

    Response.end();
}
//IT服务天知道
global.its = "http://10.10.1.151:11130";
//天知道
global.iknow = "http://10.10.1.151:11230";
//新员工成长
global.train = "http://cttqqas.cttq.com:8011";

//新dev900
global.qas900="http://cttqqas.cttq.com:8011";

global.portal = "http://cpq.cttq.com:52200";
//考试接口
//global.ideuwx="http://120.26.111.54:6100";
global.ideuwx="http://121.40.171.99:6100";
//环}信配置
global.easemob = {
    clientId:"YXA6ZHoE4J2eEeWEO_fUHV3ZDQ",
    clientSecret:"YXA6Kg3Ax1w6-oDX2rMnXk5ol8sEmBI",
    orgName : "cttq",
    appName : "aiqas"
};


//jpush
global.jpush ={
     appKey : "5c83c4cf23af06b3c3e63e5e",
     MasterSecret :"2e7e4376349a628679189926"
	// appKey : "df0fc747ceb36b14a53fb940",
	// MasterSecret :"b955754bf713ff2c934ff053"
};
//阿里大于
global.sms = {
    appkey : "23448505",
    appsecret : "250c8beb200212979b26fc1376ab749e",
    url:"http://gw.api.taobao.com/router/rest"

}

global.cms ="http://cmsdev2.cttq.com";

exports.Runner = run;
