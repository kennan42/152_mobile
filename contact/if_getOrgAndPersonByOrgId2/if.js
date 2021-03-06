var MEAP = require("meap");
var mongoose = require("mongoose");
var util = require("../../base/util.js");
var async = require("async");
var contactSchema = require("../Contact.js");
var contactUtil = require("../util.js");

/**
 * 查询当前部门人员和下级部门
 * @author donghua.wang
 * @date  2015年9月1日 19:00
 * */
function run(Param, Robot, Request, Response, IF) {
    Response.setHeader("Content-Type", "text/json;charset=utf8");
    var arg = JSON.parse(Param.body.toString());
    var orgId = arg.orgId;
    var userId = arg.userId;

    var conn = mongoose.createConnection(global.mongodbURL);
    var orgModel = conn.model("base_org", contactSchema.BaseOrgSchema);
    var userModel = conn.model("base_user", contactSchema.BaseUserSchema);
    async.parallel([
    //查询当前部门人员
    function(cb) {
        userModel.find({
            "ORGEH" : orgId,
            "STAT1" : {
                "$in" : ["A", "B", "C", "D"]
            }
        }).sort({
            "STELL" : 1,
            "VORNA" : 1
        }).exec(function(err, data) {
            if (err) {
                console.log(err, "查询部门人员失败");
            }
            cb(err, data);
        });
    },
    //查询下级部门
    function(cb) {
        var param = {
            "orgId" : orgId,
            "userId" : userId
        };
        var option = {
            agent : false,
            "url" : global.baseURL + "/contact/getChildOrg",
            "method" : "POST",
            "Body" : param
        };
        MEAP.AJAX.Runner(option, function(err, res, data) {
            if (err) {
                console.log(err, "查询下级部门失败");
            }
            cb(err, JSON.parse(data));
        });
    }], function(err, data) {
        conn.close();
        if (err) {
            Response.end(JSON.stringify({
                "status" : "-1",
                "msg" : "查询部门或者人员信息失败"
            }));
        } else {
            //部门内的员工头像缓存对象
            var users = data[0];
            var orgs = data[1].data;
            var userIds = getUserIds(users);
            var remarks = null;
			var conn1 = mongoose.createConnection(global.mongodbURL);
            async.series([
            //查询员工备注
            function(cb) {
                var remarkModel = conn1.model("contact_user_remark", contactSchema.ContactUserRemarkSchema);
                remarkModel.find({
                    "userId" : userId,
                    "linkmanId" : {
                        "$in" : userIds
                    }
                }, {
                    "linkmanId" : 1,
                    "remark" : 1
                }, function(err, data) {
                    remarks = data;
                    cb(err, "");
                });
            }], function(err, data) {
				  conn1.close();
                if (err) {
                    Response.end(JSON.stringify({
                        "status" : "-1",
                        "msg" : "查询备注信息失败"
                    }));
                } else {
                    Response.end(JSON.stringify({
                        "status" : "0",
                        "orgs" : orgs,
                        "users" : users,
                        "remarks" : remarks
                    }));
                }
            });
        }
    });
}

//得到员工id数组
function getUserIds(users) {
    var rs = [];
    for (var i in users) {
        var userId = users[i].PERNR;
        rs.push(userId);
    }
    return rs;
}

exports.Runner = run;

