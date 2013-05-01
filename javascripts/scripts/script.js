$(document).ready(function(){
	var moviePath = 'javascripts/vendor/ZeroClipboard.swf';
	var content = $('.content');
	var template;
	$.ajax({
		url: '../../data/cdn_data.json',
		success: function(data){
			success(data);
		},
		error: function(one,two,three){
			alert('failure loading ajax file');
		}
	});

	function success(data) {
		var source   = $("#entry-template").html();
		var template = Handlebars.compile(source);
		var temp ='';
		for(var i = 0; i < data.length; i++) {
			console.log(data);
			temp += template(data[i]);
		}
		console.log(temp);
		content.append(temp);
		bind_events();
	}
	// will bind events to buttons, called in success()
	function bind_events(){
		$('.button').each(function(){
			var $this = $(this);
			var clip = new ZeroClipboard(document.getElementById($this.attr('id')), {
				moviePath: moviePath
			});

			clip.on( 'complete', function(client, args) {
				alert("Copied text to clipboard: " + args.text );
			});
		});
	}
});