var MEAP = require("meap");

function run(Param, Robot, Request, Response, IF) {
    for (var i = 0; i < 6; i++) {
        var option = {
            method : "POST",
            url : "http://10.10.1.152:8080/push/msg/sendMessage",
            Body : {
                appId : "aaaao10003",
                platforms : "0,1",
                title : "push test" + i,
                body : "asdfadfaf_AddMeetingRoom",
                userCodeListStr : "8104017",
                badgeNum : 3,
                module : "MeetingRoomBooking",
                subModule : "AddMeetingRoom",
                type : "remind"
            },
            Enctype : "application/x-www-form-urlencoded"
        };
        setTimeout(function(){
            MEAP.AJAX.Runner(option, function(err, res, data) {
            console.log("push result--->", data);
        }, null);
        },10000);
        
    }

    Response.end("test");
}

exports.Runner = run;

