define(function (require, exports, module) {
  var $ = require('jquery');
          require('bootstrap');
          require('bootstrap-table');
          require('bootstrap-table-zh-CN');
  var common = require('common');
  var uri=require('uri');
  var providerobj={
    columns: [{
      field: 'id',
      title:'商户id',
    }, {
      field: 'name',
      title: '商户名称'
    }, {
      field: 'phone',
      title: '商户电话'
    }, {
      field: 'operator',
      title: '注册人'
    }, {
      field: 'id',
      title: '操作',
      formatter: operateFormatter,
    }],
    data:[],
  }

  function operateFormatter(value, row, index) {
    return [
      '<a href="tpl/editproviderinfo.html?pid='+value+'">',
      '修改店铺信息 ',
      '</a>',
      '<a href="tpl/releaseimgs.html?pid='+value+'" >',
      '发图文 ',
      '</a>',
      '<a href="tpl/qrcodes.html?pid='+value+'">',
      '二维码生成',
      '</a>'
    ].join('');
  }

  var getProviderlist=function(){
    common.post(uri.uri.CGI__GET_QUICKLIST,{},uri.uri.CGI__GET_QUICKLIST__CODE);
  }
  var getUserinfo=function(){
    var t=common.cache('token');
    common.user(uri.uri.CGI__GETUSERINFO,{},uri.uri.CGI__GETUSERINFO__CODE);
  }


  common.postSuccessfun=function(json,uri_code){
    switch(uri_code){
      case uri.uri.CGI__GET_QUICKLIST__CODE:
        json.data.map(function(r,n){
          providerobj.data.push({id:r.id,name:r.name,phone:r.phone,operator:r.operator})
        });
        $('#table').bootstrapTable(providerobj);
      break;
      case uri.uri.CGI__GETUSERINFO__CODE:
          getProviderlist();
      break;
    }
  }

  exports.init = function () {
    //getUserinfo();
  }
})
