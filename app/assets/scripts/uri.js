define(function (require, exports, module) {
  var uri = {
    HOST__DEV: 'https://wxapp.cun.com/colorcun-ser/wwwroot/apido/',
    HOST__TEST: 'https://www1.cun.com/apido/',
    HOST__LINE: 'https://cun.com/apido/',

    //师徒已设置列表
    CGI__ST_ALREADYSET: 'st-alreadysetlist.json',
    CGI__ST_ALREADYSET__CODE: 10001,
    //师徒未设置列表
    CGI__ST_NOTSET: 'st-notsetlist.json',
    CGI__ST_NOTSET__CODE: 10002,
    //师徒操作列表
    CGI__ST_OPT: 'st-opt.json',
    CGI__ST_OPT__CODE: 10003,
    //登陆
    CGI__LOGIN: 'login.json',
    CGI__LOGIN__CODE: 10011,

    //下载资源图片
    CGI__DOWNLOAD: 'download',
    CGI__DOWNLOAD__CODE: 100081,
    //头像图片
    CGI__AVATAR: 'avatar',
    CGI__AVATAR__CODE: 100082,

    //图片尺寸
    IMAGE__MAX: 720,
    IMAGE__MED: 360,
    IMAGE__MIN: 180,

    //over
    end: 0
  }
  exports.uri = uri;
})
