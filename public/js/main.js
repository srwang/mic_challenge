$(document).ready(function(){
	console.log('linked');

	$('#load-more').click(function(){
		// if hidden article rows exist on the page, load them by 10
		console.log($('.article-hidden'));
		if($('.article-hidden').length > 0) {
			for(var i=0; i<10; i++) {
				
				(function () {
					if($('.article-hidden')[i]) {
						var article = $('.article-hidden')[i];

						console.log(i, article);

						article.style.display = "table-row";
						article.classList.remove('article-hidden');
						article.classList.add('article-visible');				
					} else {
						return
					}
				})(i); 
			}
		//else make call to more-articles.json, append to dom	
		} else {
			//grab ejs template
			$.get('templates/table.html.ejs', function (template) {
				var temp = ejs.compile(template);

				$.get('/loadmorearticles', function (res) {
		           //pass response into template
		           var html = temp(res);
		           $('#policymic-forum').append(html);
		        });

			});
		}
	});

	$('#sortby-words').click(function(){
		document.cookie = "sort=words";
	});
	$('#sortby-submit').click(function(){
		document.cookie = "sort=submit-time";
	});
});
