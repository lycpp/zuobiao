/**
 * Created by Administrator on 13-10-28.
 */
var newscript = document.createElement('script');
newscript.src = 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js';
document.getElementsByTagName('head')[0].appendChild(newscript);
if (typeof window.console == 'undefined') {
    window.console = {
        log: function () {
        }, error: function () {
        }
    }
}
seajs.config({
    base:'/assets/',
    alias: {
        'jquery': 'lib/jquery.js',
        'uri': 'scripts/uri.js',
        'uploadfile': 'scripts/uploadfile.js',
        'bootstrap':'lib/bootstrap.js',
        'bootstrap-table':'lib/bootstrap-table/bootstrap-table.js',
        'bootstrap-table-zh-CN':'lib/bootstrap-table/bootstrap-table-zh-CN.js',
        'bootstrap-table-export':'lib/bootstrap-table/export/bootstrap-table-export.js',
        'bootstrapValidator':'lib/bootstrapvalidator/js/bootstrapValidator.js',
        'jq-tableExport':'http://rawgit.com/hhurz/tableExport.jquery.plugin/master/tableExport.js',
        'html2canvas':'lib/html2canvas.min.js',
        'common':'scripts/common.js',
        'index':'scripts/index.js',
        'st-alreadyset':'scripts/st-alreadyset.js',
        'st-notset':'scripts/st-notset.js',
        'st-opt':'scripts/st-opt.js',
        'zz-alreadyset':'scripts/zz-alreadyset.js',
        'zz-notset':'scripts/zz-notset.js',
        'zz-opt':'scripts/zz-opt.js',
        'dr-role':'scripts/dr-role.js',
        'dr-opt':'scripts/dr-opt.js',
        'dc-rank':'scripts/dc-rank.js',
        'dc-opt':'scripts/dc-opt.js',
        'login':'scripts/login.js',
    },
    preload: ['jquery'],
    charset: 'utf-8',
    map: [
        [/^(.*\.(?:css|js))(?:.*)$/i, '$1?ver=20171219']
    ],
});
seajs.use('common', function (common) {
  common.init();
});
