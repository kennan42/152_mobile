var view = view || {};

//#view.url 1 添加URL参数------------------------------------>> view.url
view.url = {};
//view.apiUrl="http://218.92.66.228/";
//view.apiUrl="http://10.10.1.183/";
//view.apiUrl="http://10.10.1.145:1500/";
//view.apiUrl="http://aidev.cttq.com/";
//view.wx_dev_url="http://aidev.cttq.com/";
view.wx_dev_url="http://aiqas.cttq.com/";
view.apiUrl="/";

// #view.3.2 ajax通讯 --------------------------------------------->> view.ajax
view.AJAX_CONFIG_DEFAULT = {
    url : undefined,
    type : 'post',
    dataType : 'json',
    contentType: "application/json",
  //  timeout : 60000,
    data:JSON.stringify({}),
    loading : true,
    beforeSend: undefined,
    success : undefined,
    error : undefined,
    complete : undefined,
    
};

view.ajax = function(config) {
    var p = _.extend({}, view.AJAX_CONFIG_DEFAULT, config || {});
    if(typeof p.data == 'object') {
      p.data = JSON.stringify(p.data);
    }
     if(!p.url){
        return ;
    }
    p.url = view.apiUrl + p.url;
    if(p.type=='get'&&p.data!=undefined){
      p.type='get';
    }
    console.log(p);
 
  //appcan.request.ajax(p);
  console.log(p.data);
 
    $.ajax(p);
}

// var isAndroid = (window.navigator.userAgent.indexOf('Android') >= 0) ? true : false;
// if(isAndroid){
  // if(screen.width>1000){
    // document.getElementById("zoom").style.fontSize = "100%";
  // }
// }

//alert(screen.width+"||"+screen.height);
