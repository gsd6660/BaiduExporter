!function(t){function a(n){if(e[n])return e[n].exports;var i=e[n]={exports:{},id:n,loaded:!1};return t[n].call(i.exports,i,i.exports,a),i.loaded=!0,i.exports}var e={};return a.m=t,a.c=e,a.p="",a(0)}([function(t,a,e){!function(){function t(t){var a=window.location.hash;a=a.substr(1).split("&");for(var e=0;e<a.length;e++){var n=a[e],i=n.split("=");if(i[0]==t)return decodeURIComponent(decodeURIComponent(i[1]))}}function a(){return"single_file_page"==yunData.SHAREPAGETYPE?[{isdir:!1,path:yunData.PATH,id:yunData.FS_ID}]:void window.postMessage({type:"get_selected"},"*")}function n(){u.reset();var t=a();if(t){for(var e=0;e<t.length;e++){var n=t[e];n.isdir?u.addFolder(n.path):u.addFile(n.id)}u.start()}}function i(t){var a={encrypt:"0",product:"share",uk:yunData.SHARE_UK,primaryid:yunData.SHARE_ID,fid_list:JSON.stringify(t)};yunData.SHARE_PUBLIC||(a.extra=JSON.stringify({sekey:s})),r(a)}function o(t,a){var e=t.request_id,n=$("<div>").attr("id","alert_div"+e).addClass("b-panel b-dialog alert-dialog"),i=['<div class="dlg-hd b-rlv">','<div title="关闭" id="alert_dialog_close" class="dlg-cnr dlg-cnr-r"></div>',"<h3>提示</h3>","</div>",'<div class="dlg-bd">','<div class="alert-dialog-msg center">','<div class="download-verify">','<div class="verify-body">请输入验证码：<input id="verification" type="text" class="input-code" maxlength="4">','<img id="vcode" class="img-code" alt="验证码获取中"  width="100" height="30">','<a href="javascript:;" class="underline" id="change">换一张</a>',"</div>",'<div class="verify-error">',t.auth?"验证码输入错误，请重新输入":"","</div>","</div>","</div>","</div>",'<div class="dlg-ft b-rlv">','<div class="alert-dialog-commands clearfix center">','<a href="javascript:;" id="okay" class="sbtn okay"><b>确定</b></a>','<a href="javascript:;" id="ignore" class="dbtn cancel"><b>取消</b></a>',"</div>","</div>"];n.html(i.join("")),n.appendTo($("body")),n.find("*[id]").each(function(t,a){$(a).attr("id",$(a).attr("id")+e)}),n.show();var o=(new Date).getTime().toString().slice(-2),d=$(window).width(),s=$(window).height(),l=$(document).scrollTop(),c=(d-n.width())/2+parseInt(o),p=(s-n.height())/2+l-parseInt(o);n.css({left:c+"px",top:p+"px","z-index":2e3}),$("#vcode"+e).attr("src",t.vcode_img),$("#change"+e).unbind().click(function(){var a="//pan.baidu.com/genimage";$("#vcode"+e).attr("src",a+"?"+t.vcode_str+"&"+(new Date).getTime())}),$("#okay"+e).unbind().click(function(){a.vcode_input=$("#verification"+e).val(),a.vcode_str=t.vcode_str,r(a),n.remove()}),$("#ignore"+e).unbind().click(function(){n.remove(),_.showToast("唉.....","MODE_CAUTION")}),$("#alert_dialog_close"+e).unbind().click(function(){n.remove()})}function r(t){$.post("/api/sharedownload?"+$.param({timestamp:yunData.TIMESTAMP,sign:yunData.SIGN,bdstoken:yunData.MYBDSTOKEN,app_id:yunData.FILEINFO[0].app_id,channel:"chunlei",clienttype:0,web:1}),t,null,"json").done(function(a){if(-20==a.errno)$.getJSON("/api/getcaptcha",{prod:"share",bdstoken:yunData.MYBDSTOKEN,app_id:yunData.FILEINFO[0].app_id,channel:"chunlei",clienttype:0,web:1}).done(function(a){return 0!=a.errno?(_.showToast("未知错误","MODE_FAILURE"),void console.log(a)):(t.vcode_input&&(a.auth=!0),o(a,t),void _.showToast("请输入验证码以继续下载","MODE_CAUTION"))}).fail(function(t){_.showToast("获取验证码失败","MODE_FAILURE"),console.log(t)});else if(0==a.errno){var e=[];if("single_file_page"==yunData.SHAREPAGETYPE){var n=a.list[0];e.push({name:yunData.FILENAME,link:n.dlink})}else for(var i=0;i<a.list.length;i++){var n=a.list[i];e.push({name:n.path.substr(p),link:n.dlink})}if("TXT"==l)_.dataBox.show(),_.dataBox.fillData(e);else{var r=_.parseAuth(c),s=_.aria2Data(e,r[0],r[2]);d(s)}}else _.showToast("未知错误","MODE_FAILURE"),console.log(a)}).fail(function(t){_.showToast("网络请求失败","MODE_FAILURE"),console.log(t)})}function d(t){for(var a=_.parseAuth(c),e=0;e<t.length;e++){var n={url:a[1],dataType:"json",type:"POST",data:JSON.stringify(t[e]),headers:{Authorization:a[0]}};_.sendToBackground("rpc_data",n,function(t){t?_.showToast("下载成功!赶紧去看看吧~","MODE_SUCCESS"):_.showToast("下载失败!是不是没有开启aria2?","MODE_FAILURE")})}}var s,l="RPC",c="http://localhost:6800/jsonrpc",p=0,u=function(){function t(s){if(s==e)if(0!=n.length){r++,_.showToast("正在获取文件列表... "+r+"/"+(r+n.length-1),"MODE_SUCCESS");var l=n.pop();$.getJSON("/share/list",{dir:l,bdstoken:yunData.MYBDSTOKEN,uk:yunData.SHARE_UK,shareid:yunData.SHARE_ID,channel:"chunlei",clienttype:0,web:1}).done(function(e){if(setTimeout(function(){t(s)},a),0!=e.errno)return _.showToast("未知错误","MODE_FAILURE"),void console.log(e);for(var i=0;i<e.list.length;i++){var r=e.list[i];r.isdir?n.push(r.path):o.push(r.fs_id)}}).fail(function(e){_.showToast("网络请求失败","MODE_FAILURE"),console.log(e),setTimeout(function(){t(s)},a)})}else 0!=o.length?(_.showToast("正在获取下载地址... ","MODE_SUCCESS"),i(o),d.reset()):(_.showToast("一个文件都没有哦","MODE_CAUTION"),d.reset())}var a,e=0,n=[],o={},r=0,d={};return d.addFolder=function(t){n.push(t)},d.addFile=function(t){o.push(t)},d.start=function(){a=parseInt(localStorage.getItem("rpc_delay"))||300,e=(new Date).getTime(),t(e)},d.reset=function(){e=0,n=[],o=[],r=0},d}();window.addEventListener("message",function(a){if(a.source==window&&"selected"==a.data.type){u.reset();var e=a.data.data;if(0==e.length)return void _.showToast("请选择一下你要保存的文件哦","failure");var n=t("parentPath");"/"==n||void 0==n?(n=yunData.PATH.slice(0,yunData.PATH.lastIndexOf("/")),p=1):p=n.length+1;for(var i=0;i<e.length;i++){var o=e[i];o.isdir?u.addFolder(o.path):u.addFile(o.fs_id,n+"/"+o.server_filename)}u.start()}});var _=e(1);_.init(),_.requestCookies([{url:"http://pan.baidu.com/",name:"BDUSS"},{url:"http://pcs.baidu.com/",name:"pcsett"}]),_.sendToBackground("get_cookies",[{url:"http://pan.baidu.com/",name:"BDCLND"}],function(t){s=decodeURIComponent(t.BDCLND);var a=_.addMenu.init("share");a.on("click",".rpc_export_list",function(){l="RPC",c=$(this).data("id"),n()}),a.on("click","#aria2_download",function(){l="TXT",_.dataBox.init("share"),_.dataBox.onClose(u.reset),n()}),setTimeout(function(){if("single_file_page"!=yunData.SHAREPAGETYPE){var t=document.createElement("script");t.src=chrome.runtime.getURL("js/convert.js"),document.body.appendChild(t)}},1e3),_.showToast("初始化成功!","MODE_SUCCESS")})}()},function(t,a){var e=function(){const t="netdisk;5.3.4.5;PC;PC-Windows;5.1.2600;WindowsBaiduYunGuanJia",a="http://pan.baidu.com/disk/home";var n=null;return{init:function(){this.startListen(),"undefined"!=typeof browser&&(chrome=browser,chrome.storage.sync||(chrome.storage.sync=chrome.storage.local)),chrome.storage.sync.get(null,function(t){for(var a in t)localStorage.setItem(a,t[a])})},escapeString:function(t){if(-1!=navigator.platform.indexOf("Win"))return t;var a="'"+t.replace("'","'\\''")+"'";return a},setCenter:function(t){var a=$(window).width(),e=$(window).height(),n=$(document).scrollTop(),i=(a-t.width())/2,o=(e-t.height())/2+n;t.css({left:i+"px",top:o+"px"})},startListen:function(){function t(t,a){var e=new Object;e[t]=a,chrome.storage.sync.set(e,function(){})}window.addEventListener("message",function(a){if(a.source==window){if(a.data.type&&"config_data"==a.data.type)for(var e in a.data.data)localStorage.setItem(e,a.data.data[e]),a.data.data.rpc_sync===!0?t(e,a.data.data[e]):chrome.storage.sync.clear();a.data.type&&"clear_data"==a.data.type&&chrome.storage.sync.clear()}},!1)},sendToBackground:function(t,a,e){chrome.runtime.sendMessage({method:t,data:a},e)},showToast:function(t,a){window.postMessage({type:"show_toast",data:{message:t,type:a}},"*")},getVersion:function(){var t={jsonrpc:"2.0",method:"aria2.getVersion",id:1,params:[]},a=$("#rpc_url_1").val(),e=this.parseAuth(a);e[0]&&e[0].startsWith("token")&&t.params.unshift(e[0]);var n={url:e[1],dataType:"json",type:"POST",data:JSON.stringify(t)};e[0]&&e[0].startsWith("Basic")&&(n.headers={Authorization:e[0]}),this.sendToBackground("rpc_version",n,function(t){t?$("#send_test").html("ARIA2版本为： "+t.result.version):$("#send_test").html("错误,请查看是否开启Aria2")})},parseAuth:function(t){var a=new URL(t),e=""!=a.username?a.username+":"+decodeURI(a.password):null,n=[];e&&0!=e.indexOf("token:")&&(e="Basic "+btoa(e));var i=a.hash.substr(1);i&&i.split("&").forEach(function(t){t=t.split("="),t[0].length>1&&n.push([t[0],2==t.length?t[1]:"enabled"])});var o=a.origin+a.pathname;return[e,o,n]},addMenu:{init:function(t){if(0!=$("#export_menu").length)return $("#export_menu");var a=$("<span>").attr("id","export_menu"),n=$("<div>").addClass("menu").attr("id","aria2_list").hide().appendTo(a);$("<a>").text("导出下载").addClass("g-button-menu").attr("id","aria2_download").appendTo(n);var i=$("<a>").text("设置").addClass("g-button-menu").appendTo(n);return"home"==t?(a.addClass("g-dropdown-button").prepend($("<a>").addClass("g-button").append($("<span>").addClass("g-button-right").append($("<em>").addClass("icon icon-download"),$("<span>").addClass("text").text("导出下载")))),$(".g-dropdown-button").eq(3).after(a)):"share"==t?(a.addClass("g-dropdown-button").prepend($("<a>").addClass("g-button").append($("<span>").addClass("g-button-right").append($("<em>").addClass("icon icon-download"),$("<span>").addClass("text").text("导出下载")))),$('a[data-button-id="b3"]').parent().prepend(a)):"album"==t&&(a.addClass("save-button").append('<em class="global-icon-download"></em><b>导出下载</b>'),$("#albumFileSaveKey, #emphsizeButton").parent().prepend(a)),a.mouseenter(function(){a.toggleClass("button-open"),n.show()}),a.mouseleave(function(){a.toggleClass("button-open"),n.hide()}),i.click(function(){0==$("#setting_div").length&&e.setting.init(),$("#setting_divtopmsg").html(""),$("#setting_div").show()}),this.update(),a},update:function(){$(".rpc_export_list").remove();for(var t=JSON.parse(localStorage.getItem("rpc_list")||'[{"name":"ARIA2 RPC","url":"http://localhost:6800/jsonrpc"}]');t.length>0;){var a=t.pop();$("<a class='rpc_export_list'>").addClass("g-button-menu").attr("data-id",a.url).text(a.name).prependTo($("#aria2_list"))}}},setting:{init:function(){var t=this,a=document.createElement("div");if(a.id="setting_div",0!=$("#setting_div").length)return a.id;var n=['<div class="top"><div title="关闭" id="setting_div_close" class="close"></div><h3>导出设置</h3></div>','<div style=" margin: 20px 10px 10px 10px; ">','<div id="setting_divtopmsg" style="position:absolute; margin-top: -18px; margin-left: 10px; color: #E15F00;"></div>','<table id="setting_div_table" >',"<tbody>",'<tr><td><label>开启配置同步:</label></td><td><input id="rpc_sync" type="checkbox"></td></tr>','<tr><td><label>文件夹结构层数：</label></td><td><input type="text" id="rpc_fold" class="input-small">(默认0表示不保留,-1表示保留完整路径)</td></tr>','<tr><td><label>递归下载延迟：</label></td><td><input type="text" id="rpc_delay" class="input-small">(单位:毫秒)<div style="position:absolute; margin-top: -20px; right: 20px;"><a id="send_test" type="0" href="javascript:;" >测试连接，成功显示版本号。</a></div></td></tr>','<tr><td><label>下载路径:</label></td><td><input type="text" placeholder="只能设置为绝对路径" id="setting_aria2_dir" class="input-large"></td></tr>','<tr><td><label>User-Agent :</label></td><td><input type="text" id="setting_aria2_useragent_input" class="input-large"></td></tr>','<tr><td><label>Referer ：</label></td><td><input type="text" id="setting_aria2_referer_input" class="input-large"></td></tr>','<tr><td colspan="2"><div style="color: #656565;">Headers<label style="margin-left: 65px;">※使用回车分隔每个headers。</label></div><li class="b-list-item separator-1"></li></td></tr>','<tr><td><label>headers ：</label></td><td><textarea id="setting_aria2_headers" ></textarea></td></tr>',"</tbody>","</table>",'<div style="margin-top:10px;">','<div id="copyright">© Copyright <a href="https://github.com/acgotaku/BaiduExporter">雪月秋水 </a><br/> Version:0.8.7 更新日期: 2016/10/10 </div>','<div style="margin-left:50px; display:inline-block"><a href="javascript:;" id="apply" class="button">应用</a><a href="javascript:;" id="reset" class="button">重置</a></div>',"</div>","</div>"];return a.innerHTML=n.join(""),document.body.appendChild(a),$("#setting_divtopmsg").html(""),t.update(),$("#setting_div").on("click",function(a){switch(a.target.id){case"setting_div_close":$("#setting_div").hide();break;case"apply":t.save(),setTimeout(function(){e.addMenu.update()},60),$("#setting_divtopmsg").html("设置已保存.");break;case"reset":localStorage.clear(),window.postMessage({type:"clear_data"},"*"),$("#setting_divtopmsg").html("设置已重置."),t.update();break;case"send_test":e.getVersion();break;case"add_rpc":var n=$(".rpc_list").length+1,i='<tr class="rpc_list"><td><input id="rpc_name_'+n+'" type="text" value="ARIA2 RPC '+n+'" class="input-medium">：</td><td><input id="rpc_url_'+n+'" type="text" class="input-large"></td></tr>';$(i).insertAfter($(".rpc_list").eq(n-2))}}),e.setCenter($("#setting_div")),a.id},save:function(){var t={};t.UA=document.getElementById("setting_aria2_useragent_input").value,t.rpc_delay=$("#rpc_delay").val(),t.referer=$("#setting_aria2_referer_input").val(),t.rpc_dir=$("#setting_aria2_dir").val(),t.rpc_fold=$("#rpc_fold").val(),t.rpc_headers=$("#setting_aria2_headers").val(),t.rpc_sync=$("#rpc_sync").prop("checked");for(var a=[],n=0;n<$(".rpc_list").length;n++){var i=n+1;""!=$("#rpc_url_"+i).val()&&""!=$("#rpc_name_"+i).val()&&a.push({name:$("#rpc_name_"+i).val(),url:$("#rpc_url_"+i).val()})}t.rpc_list=JSON.stringify(a),e.sendToBackground("config_data",t),window.postMessage({type:"config_data",data:t},"*")},update:function(){$("#rpc_delay").val(localStorage.getItem("rpc_delay")||"300"),$("#rpc_fold").val(localStorage.getItem("rpc_fold")||"0");var e=localStorage.getItem("rpc_sync");"false"==e?$("#rpc_sync").prop("checked",!1):$("#rpc_sync").prop("checked",!0),$("#setting_aria2_dir").val(localStorage.getItem("rpc_dir")),$("#setting_aria2_useragent_input").val(localStorage.getItem("UA")||t),$("#setting_aria2_referer_input").val(localStorage.getItem("referer")||a),$("#setting_aria2_headers").val(localStorage.getItem("rpc_headers"));var n=JSON.parse(localStorage.getItem("rpc_list")||'[{"name":"ARIA2 RPC","url":"http://localhost:6800/jsonrpc"}]');$(".rpc_list").remove();for(var i in n){var o=+i+1,r=1==o?'<a id="add_rpc" href="javascript:;" >ADD RPC</a>':"",d='<tr class="rpc_list"><td><input id="rpc_name_'+o+'" type="text" value="'+n[i].name+'" class="input-medium">：</td><td><input id="rpc_url_'+o+'" type="text" class="input-large" value="'+n[i].url+'">'+r+"</td></tr>";$(".rpc_list").length>0?$(d).insertAfter($(".rpc_list").eq(o-2)):$(d).prependTo($("#setting_div_table>tbody"))}}},copyText:function(t){var a=document.createElement("textarea");document.body.appendChild(a),a.style.position="fixed",a.style.left="0",a.style.top="0",a.value=t,a.focus(),a.select();var e=document.execCommand("copy");a.remove(),console.log(e),e?this.showToast("拷贝成功~","MODE_SUCCESS"):this.showToast("拷贝失败 QAQ","MODE_FAILURE")},requestCookies:function(t){this.sendToBackground("get_cookies",t,function(t){n=t})},getHeader:function(e){var i=[],o=localStorage.getItem("UA")||t,r=localStorage.getItem("headers"),d=localStorage.getItem("referer")||a;if(i.push("User-Agent: "+o),i.push("Referer: "+d),r)for(var s=r.split("\n"),l=0;l<s.length;l++)i.push(s[l]);if(n){var c=[];for(var p in n)c.push(p+"="+n[p]);i.push("Cookie: "+c.join(";"))}var u="";if("aria2c_line"==e){for(l=0;l<i.length;l++)u+=" --header "+JSON.stringify(i[l]);return u}if("aria2c_txt"==e){for(l=0;l<i.length;l++)u+=" header="+i[l]+" \n";return u}if("idm_txt"==e){for(l=0;l<i.length;l++)0!=i[l].indexOf("Referer")&&(u+=i[l].split(": ")[0].toLowerCase()+": "+i[l].split(": ")[1]+"\n");return u.replace(/\n$/,"")}return i},aria2Data:function(t,a,e){var n=[],i=this;if(t.length>0)for(var o=t.length,r=0;o>r;r++){var d={jsonrpc:"2.0",method:"aria2.addUri",id:(new Date).getTime(),params:[[t[r].link],{out:t[r].name,dir:localStorage.getItem("rpc_dir")||null,header:i.getHeader()}]};if(console.log(e),e.length>0){var s=d.params[d.params.length-1];e.forEach(function(t){s[t[0]]=t[1]})}a&&0==a.indexOf("token:")&&d.params.unshift(a),n.push(d),console.log(d)}return n},dataBox:{init:function(t){if(0!=$("#download_ui").length)return this;var a=$("<div>").attr("id","download_ui").append('<div class="top"><a href="javascript:;" title="关闭" id="aria2_download_close" class="close"></a><h3><em></em>ARIA2导出</h3></div>'),n=$("<div>").addClass("content").attr("id","content_ui").appendTo(a);a.hide().appendTo($("body")),n.empty();var i=$("<div>").css({"margin-bottom":"10px"}).appendTo(n);$("<a>").attr("id","aria2c_btn").attr({download:"aria2c.down",target:"_blank"}).addClass("save-button ").html('<em class="global-icon-download"></em><b>存为aria2文件</b>').appendTo(i),$("<a>").attr("id","idm_btn").attr({download:"idm.ef2",target:"_blank"}).addClass("save-button ").html('<em class="global-icon-download"></em><b>存为IDM文件</b>').appendTo(i),$("<a>").attr("id","download_txt_btn").attr({download:"download_link.txt",target:"_blank"}).addClass("save-button ").html('<em class="global-icon-download"></em><b>保存下载链接</b>').appendTo(i),$("<a>").attr("id","copy_txt_btn").attr({href:"javascript:void(0);",data:""}).addClass("save-button ").html('<em class="global-icon-download"></em><b>拷贝下载链接</b>').appendTo(i),$("<textarea>").attr({id:"download_link",wrap:"off",spellcheck:!1}).css({width:"100%",overflow:"scroll",height:"180px",resize:"none"}).appendTo(n),e.setCenter($("#download_ui")),$("#download_ui").on("click","#aria2_download_close",function(){navigator.msSaveBlob?$("#aria2c_btn, #idm_btn, #download_txt_btn").data("href",""):$("#aria2c_btn, #idm_btn, #download_txt_btn").attr("href","data:text/plain;charset=utf-8,"),$("#copy_txt_btn").attr("data",""),$("#download_link").val(""),a.hide()}),$("#download_ui").on("click","#copy_txt_btn",function(){e.copyText($("#copy_txt_btn").attr("data"))}),navigator.msSaveBlob?$("#aria2c_btn, #idm_btn, #download_txt_btn").click(function(t){t.preventDefault();var a=$(this);navigator.msSaveBlob(new Blob([a.data("href")]),a.attr("download"))}):$("#aria2c_btn, #idm_btn, #download_txt_btn").attr("href","data:text/plain;charset=utf-8,")},show:function(){$("#download_ui").show()},onClose:function(t){$("#download_ui").on("click","#aria2_download_close",t)},fillData:function(t){var a=[],n=[],i=[],o=[];if(t.length>0){for(var r=t.length,d=0;r>d;d++){var s=-1!=navigator.platform.indexOf("Win")?JSON.stringify(t[d].name):e.escapeString(t[d].name);a.push("aria2c -c -s10 -k1M -x10 --enable-rpc=false -o "+s+e.getHeader("aria2c_line")+" "+JSON.stringify(t[d].link)+"\n"),n.push([t[d].link,e.getHeader("aria2c_txt")," out="+t[d].name," continue=true"," max-connection-per-server=10"," split=10"," min-split-size=1M","\n"].join("\n")),i.push(["<",t[d].link,e.getHeader("idm_txt"),"out="+t[d].name,">"].join("\r\n")),o.push(t[d].link+"\n")}navigator.msSaveBlob?($("#aria2c_btn").data("href",$("#aria2c_btn").data("href")+n.join("")),$("#idm_btn").data("href",$("#idm_btn").data("href")+i.join("")),$("#download_txt_btn").data("href",$("#download_txt_btn").data("href")+o.join(""))):($("#aria2c_btn").attr("href",$("#aria2c_btn").attr("href")+encodeURIComponent(n.join(""))),$("#idm_btn").attr("href",$("#idm_btn").attr("href")+encodeURIComponent(i.join("\r\n"))),$("#download_txt_btn").attr("href",$("#download_txt_btn").attr("href")+encodeURIComponent(o.join("")))),$("#copy_txt_btn").attr("data",$("#copy_txt_btn").attr("data")+o.join("")),$("#download_link").val($("#download_link").val()+a.join(""))}}}}}();t.exports=e}]);