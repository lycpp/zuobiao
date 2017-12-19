define(function(require, exports, module) {
  var $ = require('jquery');
          require('bootstrap')
          require('bootstrapValidator')
  var common = require('common');

  var forminit=function(){
    $('#formlogin').bootstrapValidator({
      message: 'This value is not valid',
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
        sysno: {
          message: '系统号验证失败',
          validators: {
            notEmpty: {
              message: '系统号不能为空'
            }
          }
        },
        password: {
          validators: {
            notEmpty: {
              message: '密码不能为空'
            }
          }
        }
      }
    });
  }

  exports.init=function() {
    forminit();
    $("#loginbtn").on('click',function () {
      console.log("denglu");
      var formdata=$("#formlogin").serializeObject();
      if(formdata.sysno&&formdata.password){
        $.ajax({
          url:'http://localhost:9000/assets/scripts/datastore/login.json',
          type:"get",
          success:function(res){
            console.log(res.data);
            console.log(formdata);
            var right=false;
            var userdata={};
            $.each(res.data,function(n,r){
              if(formdata.sysno==r.username&&formdata.password==r.password){
                right=true;
                userdata=r;
              }
            })
            if(right){
              common.cache("user",userdata)
              history.go(-1);
            }else{
              alert("账号或密码错误！")
            }
          }
        })
      }
    })
  }
})
