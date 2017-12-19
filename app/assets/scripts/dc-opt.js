define(function(require, exports, module) {
  var $ = require('jquery');
  require('bootstrap');
  require('bootstrap-table');
  require('bootstrap-table-zh-CN');
  var common = require('common');
  var sid=common.GetQueryString("id");

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
    $.ajax({
      url:'http://localhost:9000/assets/scripts/datastore/st-opt.json',
      type:"get",
      success:function(res){
        console.log(res);
        inittable(res);
      }
    })
  }
  exports.init=function() {
    getdatalist()
    console.log(sid);
  }
})
