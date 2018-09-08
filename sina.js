    var _doc=document.getElementsByTagName('head')[0];
    var script=document.createElement('script');
    script.setAttribute('type','text/javascript');
    script.setAttribute('src','https://libs.baidu.com/jquery/1.11.1/jquery.min.js');
    _doc.appendChild(script);
    script.onload=script.onreadystatechange=function(){
        if(!this.readyState||this.readyState=='loaded'||this.readyState=='complete'){
            aaaaa=setInterval('hello()',3000);
            console.info('exec');
        }
        script.onload=script.onreadystatechange=null;
    }


function hello(){

    GoBottom();

    if($('div.WB_cardwrap.S_bg2 div.W_pages a.page.next.S_txt1.S_line1').text()=='下一页'){

        console.info('页面读取完毕！');

        clearInterval(aaaaa);

        var nowLength=0;

        for (var i = nowLength; i<$('div.WB_cardwrap.WB_feed_type.S_bg2').length; i++) {

            try{
                var mid = $('div.WB_cardwrap.WB_feed_type.S_bg2').get(i).getAttribute('mid');

                $.ajax({
                    type : "post",
                    url : "https://weibo.com/p/aj/v6/mblog/modifyvisible?ajwvr=6&domain=100505&__rnd="+(new Date().getTime()).toString(),
                    data : { "visible": 1,"mid":mid,"_t":0 },
                    async : false,
                    success : function(data){
                        console.log("转成了自己可见："+mid);
                    }
                });

                if(i==($('div.WB_cardwrap.WB_feed_type.S_bg2').length-1)){
                    var href=$('div.WB_cardwrap.S_bg2 div.W_pages a.page.next.S_txt1.S_line1').attr('href');
                    href = href.replace('#feedtop','');
                    window.location.href='http://weibo.com'+href;
                }
            }catch(e){
                throw(e.name);
                continue;
            }


        }
    }
    console.info('页面正在读取');
}


var currentPosition,timer;

function GoBottom(){
    timer=setInterval("runToBottom()",50);
}

function runToBottom(){
    currentPosition=document.documentElement.scrollTop || document.body.scrollTop;
    currentPosition+=30;
    if(currentPosition<document.body.scrollHeight && (document.body.clientHeight + document.body.scrollTop < document.body.scrollHeight))
    {
        document.body.scrollTop = currentPosition;
    }
    else
    {
        document.body.scrollTop = document.body.scrollHeight;
        clearInterval(timer);
    }
}

