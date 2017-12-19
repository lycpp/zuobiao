define(function(require, exports, module) {
  var $ = require('jquery');
          require('bootstrap');
          require('bootstrap-table');
          require('bootstrap-table-zh-CN');
  var common = require('common');
  var uri=require('uri');


  getdatalist=function(){
    common.post(uri.uri.CGI__ST_ALREADYSET,null,uri.uri.CGI__ST_ALREADYSET__CODE);
  }

  function operateFormatter(value, row, index) {
    return [
      '<a class="break" href="javascript:void(0)">',
      '解散',
      '</a>',
    ].join('');
  }

  function detailFormatter(index, row) {
    var html = '<table class="table table-bordered tabeldetailformatter">';
    html+='<tr><td rowspan="'+row.tudi.length+'" style="width: 30px">&nbsp;</td>',
    $.each(row.tudi,function(n,r){
      console.log(r)
      html+='<td>'+r.name+'</td><td>'+r.no+'</td><td>'+r.role+'</td><td>'+r.rank+'</td><td>'+r.adddate+'</td>'
      if(r.rank=="A3"){
        html+='<td></td>'
      }else{
        html+='<td><a class="removeItem" tagid="'+r.id+'" tagname="'+r.name+'" tagno="'+r.no+'" href="javascript:void(0)">移出</a></td>'
      }
      html+='</tr>'
    })
    html+='</table>'
    return html;
  }

  var inittable=function(dd){
    console.log("0000");
    $('#table').bootstrapTable({
      columns: [ {
        field: 'name',
        title: '组长/人数',
        width:'100px'
      },{
        field: 'no',
        title:'系统号',
        width:'100px'
      }, {
        field: 'role',
        title: '角色',
        width:'100px'
      }, {
        field: 'rank',
        title: '职级',
        width:'100px'
      }, {
        field: 'adddate',
        title: '建立关系时间',
        width:'100px'
      }, {
        field: 'id',
        title: '操作',
        events: operateEvents,
        formatter: operateFormatter,
        width:'100px'
      }],
      detailFormatter:detailFormatter,
      operateEvents:window.operateEvents,
      data:dd.data,
      totalRows:dd.total,
    });
  }


  var removeItem=function(){
    console.log("removeItem");
  }

  exports.init=function() {
    getdatalist();

    common.postSuccessfun=function(json,uri_code){
      switch (uri_code){
        case uri.uri.CGI__ST_ALREADYSET__CODE:
          inittable(json);
          break;
      }
    }

    window.operateEvents = {
      'click .break': function (e, value, row, index) {
        console.log(row.id);
        common.modal('提示信息','解散该组后， 所有成员的师徒制关系将被解除，是否确认解散该组！','breakRank');
        common.openDialog("#exampleModal")
      },
    };
    common.confirmDialog=function(e){
      switch (e){
        case "removeItem":
          console.log("removeItem");
        break;
        case "breakRank":
          console.log("breakRank");
          break;
      }
      common.closeDialog("#exampleModal");
    }

    $("#page-main").on('click','.removeItem',function(){
      var itemname=$(this).attr('tagname');
      var itemno=$(this).attr('tagno');
      common.modal('提示信息','是否将'+itemname+'('+itemno+'）移出？','removeItem');
      common.openDialog("#exampleModal")
    })
  }
})
