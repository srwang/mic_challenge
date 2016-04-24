$(document).ready(function(){
	console.log("linked");

	$("#load-more").click(function(){ //FIX
		// if hidden article rows exist on the page, load them in 10s
		if($('.article-hidden').length > 0) {
			for(var i=0; i<10; i++) {
				console.log(i);
				console.log($('.article-hidden')[i]);
				if($('.article-hidden')[i]) {
					var article = $('.article-hidden')[i];
					//console.log(article);
					article.style.display = "table-row";
					article.classList.remove('article-hidden');
					article.classList.add('article-visible');				
				} 
			}
		//else make xhr call to more-articles.json, append to dom	
		} else {

			$.get('../views/template.html.ejs', function (template) {
				var temp = ejs.compile(template);

				//make xhr call
				var index = 0; //rethink this

				var xhr = new XMLHttpRequest();
				xhr.open('GET', 'http://localhost:3000/data/more-articles.json', true);
				xhr.send();
				xhr.onreadystatechange = processRequest;

				function processRequest(e) {
					if (xhr.readyState == 4 && xhr.status == 200) {
				        var response = JSON.parse(xhr.responseText);

				        if(index<response.length) {
				        	for(var i=0; i<10; i++) {
				        		var html = temp(response[i]);
				        		$('#policymic-forum').append(html);
				        	}
				        }
			    	}
				}
			})
		}
	});
});
