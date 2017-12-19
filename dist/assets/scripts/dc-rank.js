define(function(require, exports, module) {
  var $ = require('jquery');
    require('bootstrap');
    require('bootstrap-table');
    require('bootstrap-table-zh-CN');
    require('jq-tableExport');
    require('bootstrap-table-export');
  var common = require('common');
  var uri=require('uri');

  var inittable=function(dd){
    $('#table').bootstrapTable({
      columns: [ {
        field: 'name',
        title: '操作人',
        width:'100px'
      },{
        field: 'no',
        title:'系统号',
        width:'100px'
      }, {
        field: 'adddate',
        title: '时间',
        width:'100px'
      }, {
        field: 'name',
        title: '内容',
        width:'100px'
      }],
      data:dd.data,
      operateEvents:window.operateEvents,
    });
  }

  var getdatalist=function(){
    common.post(uri.uri.CGI__ST_ALREADYSET,null,uri.uri.CGI__ST_ALREADYSET__CODE);
  }

  common.postSuccessfun=function(json,uri_code){
    switch (uri_code){
      case uri.uri.CGI__ST_ALREADYSET__CODE:
        inittable(json);
        break;
    }
  }
  exports.init=function() {
    getdatalist()
   // / console.log(sid);
  }
})
