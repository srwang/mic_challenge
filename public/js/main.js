$(document).ready(function(){
	console.log('linked');

	$('#load-more').click(function(){
		// if hidden article exist on the page, load the first group
		if($('.hidden-rows')[0]) {

			var rows = $('.hidden-rows')[0];

			rows.style.display = 'table-row-group';
			rows.classList.remove('hidden-rows');
			rows.classList.add('visible-rows');								
		//else make call to more-articles.json, append to dom	
		} else {
			//grab ejs template
			console.log('clicked')
			$.get('templates/table.html.ejs', function (template) {

				var temp = ejs.compile(template);

				var request = $.get('/loadmorearticles', function (res) {
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
