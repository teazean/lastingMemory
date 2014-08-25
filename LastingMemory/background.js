var content=[];
$.get('http://blog.csdn.net/adimn123/article/details/36022679', function(html) {
	contentText=$(html).find('#article_content').html();
	content=contentText.split("<p>----</p>");
	console.log(content);
});
setInterval(function() {
	var len=content.length;
	if(len==0)
		return;
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tabs) {
		var id=tabs[0].id;
		var random=Math.floor(Math.random()*len);
		chrome.tabs.executeScript(id, {file: "learn.js"}, function() {
			chrome.tabs.sendMessage(id,content[random].trim("\n"));
		});
	});
}, 120000);