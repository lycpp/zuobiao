define(function (require, exports, module) {
  var $ = require('jquery');
          require('bootstrap');
  var uri= require('uri');

  var APIHOST='assets/scripts/datastore/';
  exports.APIHOST=APIHOST;

  //modal
  var modal=function(title,desc,surefunc){
    if($("#page-main").find("#exampleModal").length>0){
      $("#exampleModal").remove();
    }
    var modalhtml='<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">\n' +
      '  <div class="modal-dialog" role="document">\n' +
      '    <div class="modal-content">\n' +
      '      <div class="modal-header">\n' +
      '        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
      '        <h4 class="modal-title" id="exampleModalLabel">'+title+'</h4>\n' +
      '      </div>\n' +
      '      <div class="modal-body">'+desc+'</div>\n' +
      '      <div class="modal-footer">\n' +
      '        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>\n' +
      '        <button type="button" class="btn btn-primary confirmdialogbtn" tagevent='+surefunc+'>确认</button>\n' +
      '      </div>\n' +
      '    </div>\n' +
      '  </div>\n' +
      '</div>'
    $('#page-main').append(modalhtml);
  }
  exports.modal=modal;

  //关闭弹出框
  var closeDialog=function (id) {
    $(id).modal("hide");
  }
  exports.closeDialog=closeDialog;

  //打开弹出框
  var openDialog=function (id) {
    $(id).modal("show");
  }
  exports.openDialog=openDialog;

  //获取链接参数

  var GetQueryString = function (name) {
    var reg = new RegExp(name + '=([^&#]*)', 'i');
    var r = window.location.href.match(reg);
    if (r != null) return (r[1]);
    return null;
  }
  exports.GetQueryString = GetQueryString;

  var APIHOST="/assets/scripts/datastore/"

  exports.APIHOST=APIHOST;

  var post=function(act,data,uri_code){
    console.log('data:',data);
    //var n_token=exports.cache('token');
      $.ajax({
        url:exports.APIHOST+act,
        data:data,
        success:function(res){
          if(res.code==-1){
            window.location.href="/tpl/login.html";
          }else {
            exports.postSuccessfun(res,uri_code);
          }
        }
      })
  }
  exports.post=post;

  var postSuccessfun=function(json,uri_code){
    console.log("APP::postSuccessFun",uri_code,json);
  }
  exports.postSuccessfun=postSuccessfun;

  //本地存储
  var cache = function (dataname, data) {
    if (typeof data != "undefined") {
      if (typeof data == "object" || typeof data == "array") {
        data = JSON.stringify(data);
      }
      localStorage.setItem(dataname, data);
    } else {
      data = localStorage.getItem(dataname);
      try {
        data = JSON.parse(data);
        return data;
      } catch (e) {
        return data;
      }
    }
  }
  exports.cache=cache;

  //取图片
  var image=function(id,width){
    var url=this.APIHOST+uri.uri.CGI__DOWNLOAD+'/id/'+id;
    if(width){
      url+='/width/'+width;
    }
    return url;
  }
  exports.image=image;

  //载入页面
  var loadhtml=function(htmllink){
    $.ajax({
      url: htmllink,
      dataType: "html",
      data: {},
      type: 'GET', //静态页用get方法，否则服务器会抛出405错误
      success: function(data){
        $("#page-main").html(data);
        sidbarClass(htmllink)
      }
    });
  }

  //左菜单样式
  var sidbarClass=function(link){
    $(".nav-list").addClass("collapse").removeClass("in").attr("style","height: 0;");
    $("#main-nav .nav-list li").find("a").each(function(n,r){
      if($(r).attr("href").indexOf(link)!=-1){
        $(r).addClass("active")
        $(r).parent().parent().removeClass("collapse").addClass("in").attr("style","height: auto;");
      }else{
        $(r).removeClass("active")
      }
    })
  }

  //网站头部用户信息
  var headUserinfo=function(){
    if(exports.cache("user")){
      $("#useravatar").attr("src",exports.cache("user").avatar);
      $("#username").text(exports.cache("user").username);
      $("#userinfo").attr("data-toggle","dropdown");
    }
  }

  //dialog确认按钮回调
  confirmDialog=function(){
    $("#exampleModal").modal('hide');
  }
  exports.confirmDialog=confirmDialog;

  exports.init = function () {
    $.ajaxSetup({
      dataType: 'json',
      timeout: 60000,
      type: 'get',
      beforeSend: function (jqXHR, settings) {
        /*var n_user = exports.cache('user');
        if(n_user){
          if (typeof settings.data == 'object') {
            // settings.data.append('token',n_token)
          } else {
            jqXHR.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            // settings.data += '&token=' + n_token;
          }
          return true;
        }else{
          window.location.href='/tpl/login.html'
          return false;
        }*/

      },
      complete: function (res) {
        if (typeof res.responseJSON == 'object') {
          if (res.responseJSON.code != '200') {
            // /alert(res.responseJSON.message);
            //exports.postSuccessfun(res,uri_code);
          }
        }
      },
      error: function (xhr, text, error) {
        //alert('网络繁忙，请重试!');
      },
      success: function (res) {
      },
    });

    //序列化表单
    $.fn.serializeObject = function () {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function () {
        if (o[this.name]) {
          if (!o[this.name].push) {
            o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
        } else {
          o[this.name] = this.value || '';
        }
      });
      return o;
    };

    //载入页面
    $(".loadhtml").on("click", function () {
      console.log(this);
      var url = $(this).attr("href").replace("#", "");
      loadhtml(url);

    })
    /*$(window).bind( 'hashchange', function(e) {
      var hashlink=location.hash.replace("#","");
      loadhtml(hashlink);
      sidbarClass(hashlink)
    });*/
    $(window).bind('pageshow', function () {
      console.log('pageshowpageshow');
      var nlink = '';
      console.log(location.href);
      if (location.href.indexOf('#') > -1) {
        nlink = location.href.substr(location.href.indexOf('#')).replace("#", "");
      }
      console.log("nlink：",nlink);
      if (!nlink.length > 0) {
        window.location.href = location.href + "#tpl/st-alreadyset.html";
        nlink="tpl/st-alreadyset.html";
      }
      loadhtml(nlink);
      headUserinfo();
      sidbarClass(nlink)
    })

    //退出
    $("#logoutbtn").on("click", function () {
      localStorage.removeItem("user");
      window.location.href = "tpl/login.html"
    })

    //dialog弹出框确认事件
    $("#page-main").on("click",".confirmdialogbtn", function () {
      exports.confirmDialog($(this).attr("tagevent"));
    })
  }
})
