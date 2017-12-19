define(function(require, exports, module) {
  var $ = require('jquery');
      require('bootstrap');
      require('bootstrap-table');
      require('bootstrap-table-zh-CN');
  var common = require('common');
  var uri=require('uri');

  var inittable=function(dd){
    $('#table').bootstrapTable({
      columns: [ {
        field: 'name',
        title: '姓名',
        width:'100px'
      },{
        field: 'no',
        title:'系统号',
        width:'100px'
      }, {
        field: 'rank',
        title: '职级',
        width:'100px'
      }, {
        field: 'id',
        title: '操作',
        events: operateEvents,
        formatter: operateFormatter,
        width:'100px'
      }],
      data:dd.data,
      operateEvents:window.operateEvents,
    });
  }

  function operateFormatter(value, row, index) {
    return [
      '<a class="break" href="javascript:void(0)">',
      row.rank=='A3'?'设为师父':'加入分组',
      '</a>',
    ].join('');
  }

  var getdata=function(){
    common.post(uri.uri.CGI__ST_NOTSET,null,uri.uri.CGI__ST_NOTSET__CODE);
  }
  exports.init=function() {
    getdata();
  //  inittable()

    common.postSuccessfun=function(json,uri_code){
      switch (uri_code){
        case uri.uri.CGI__ST_NOTSET__CODE:
          inittable(json);
          break;
      }
    }

    window.operateEvents = {
      'click .break': function (e, value, row, index) {
        console.log(row.id);
        if(row.rank!='A3'){
          common.modal('提示信息','加入分组','addTeam');
          $('#addteamdialog').modal('show')
        }
      },
    };

    $(".searchdialog").on("click",function(){
      $('#searchdialog').modal('show')
    })
    $("#searchconfirmbtn").on("click",function(){
      console.log("zhaodaole");
      $('#searchdialog').modal('hide')
    })
    $("#selectconfirmbtn").on("click",function(){
      console.log("jiutale");
      $('#addteamdialog').modal('hide')
    })
  }
})
