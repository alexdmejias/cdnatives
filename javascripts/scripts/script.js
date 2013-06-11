$(document).ready(function(){
	var App = {
		tags: true,
		production: true,
		copy: true
	};
	// var tags = false;

	var moviePath = 'javascripts/vendor/ZeroClipboard.swf';
	var content = $('.content');
	var template;
	$.ajax({
		url: '../../data/cdn_data.json',
		success: function(data){
			ajax_success(data);
		},
		error: function(one,two,three){
			alert('failure loading ajax file');
		}
	});

	function toggle_button(elem) {
		$(elem).parents('ul').children('li').children('a').removeClass('active');
		$(elem).addClass('active');
		console.log($(elem).parents('ul').data('option'));
		if(App[$(elem).parents('ul').data('option')] === false) {
			App[$(elem).parents('ul').data('option')] = true;
		} else {
			App[$(elem).parents('ul').data('option')] = false;
		}
	}

	$('.option .button').on('click', function(e) {
		e.preventDefault();
		toggle_button(e.currentTarget);
	});

	function ajax_success(data) {
		var source   = $("#entry-template").html();
		var template = Handlebars.compile(source);
		var temp ='';
		for(var i = 0; i < data.length; i++) {
			temp += template(data[i]);
		}
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
				show_msg(args);
			});
		});
	}

	function show_msg(args) {
		var msg = args.text;
		if(App.production === true) {
			msg += '.min';
		}
		// console.log('clik');

		if (App.tags === true) {
			alert('<script src="' + msg + '.js"></script>');
		} else {
			alert(msg + ".js");
		}

	}
});