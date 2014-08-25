var Toast = function (config) {
    this.context = config.context == null ? document.body : config.context;//上下文
    this.message = config.message;//显示内容  
    this.time = config.time == null ? 20000 : config.time;//持续时间
    if (!config.left) config.left = '63%';//原来默认left:"50%"
    if (!config.top) config.top = '10%';//top:"61.8%"
    this.left = config.left;//距容器左边的距离  
    this.top = config.top;//距容器上方的距离  
    this.init();
};

Toast.prototype = {
    //初始化显示的位置内容等  
    init: function () {
        var old=document.getElementById('toastMessage');
        if(old){
            old.parentNode.removeChild(old);
        }
        //设置消息体 
        var msgDIV=document.createElement('div');
        msgDIV.id="toastMessage";
        msgDIV.innerHTML='<span>' + this.message + '</span>';
        this.context.appendChild(msgDIV);

        //设置消息样式  
        var left = this.left == "" ? parseInt(this.context.style.width) / 2 - parseInt(msgDIV.getElementsByTagName('span')[0].style.width)/ 2 : this.left;
        var top = this.top == "" ? '20px' : this.top;
        msgDIV.style.position="fixed";
        msgDIV.style.top=top;
        msgDIV.style.zIndex="6000";
        msgDIV.style.left=left;
        msgDIV.style.backgroundColor="black";
        msgDIV.style.color="white";
        msgDIV.style.fontSize="18px";
        msgDIV.style.padding="10px";
        msgDIV.style.margin="10px";
        msgDIV.style.display="none";
        msgDIV.style.opacity="0.85";
        msgDIV.style.borderRadius="10px";
        msgDIV.style.maxWidth="32%";
        msgDIV.style.whiteSpace="pre-wrap";
        msgDIV.style.wordWrap="break-word";
        msgDIV.style.wordBreak="keep-all";
        
        var spans=msgDIV.getElementsByTagName('span');
        for(var i=0;i<spans.length;i++){
        	spans[i].style.padding='0';
        	spans[i].style.margin='0';
        	spans[i].style.color="white";
        	spans[i].style.backgroundColor="black";
        	spans[i].style.fontSize="18px";
        	spans[i].style.fontFamily="Consolas,微软雅黑";
        }
        msgDIV.getElementsByTagName('span')[0].style.padding="0";
        msgDIV.getElementsByTagName('span')[0].style.margin="0";
        var ps=msgDIV.getElementsByTagName('p');
        for(var i=0;i<ps.length;i++){
        	ps[i].style.padding='0';
        	ps[i].style.margin='0';
        	ps[i].style.color="white";
        	ps[i].style.backgroundColor="black";
        	ps[i].style.fontSize="18px";
        	ps[i].style.fontFamily="Consolas,微软雅黑";
        }
        msgDIV.onclick=function(){
        	 msgDIV.style.display="none";
        }
    },
    //显示动画  
    show: function () {
        var msgDIV=document.getElementById('toastMessage');
        msgDIV.style.display="block";
        setTimeout(function(){
            msgDIV.style.display="none";
        },this.time);
    }
};

chrome.runtime.onMessage.addListener(function(msg){
	new Toast({message:msg}).show();
});