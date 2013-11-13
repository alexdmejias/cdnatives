$(document).ready(function(){
	App = {
		tags: true,
		production: true,
		copy: true
	};

	var moviePath = 'js/vendor/ZeroClipboard.swf';
	var content = $('.content');
	var template;
	$.ajax({
		url: '../data/cdn_data.json',
		success: function(data){
			ajax_success(data);
		},
		error: function(one,two,three){
			alert('failure loading ajax file');
		}
	});

	function toggle_button(button) {
		$(button).siblings().removeClass('active').end().addClass('active');
	}

	function change_option(button) {
		var target = $(button).parent('div').data('option');
		if(App[target] == true) {
			App[target] = false;
		} else {
			App[target] = true;
		}
	}

	$('.options').on('click','.button', function(e){
		e.preventDefault();
		toggle_button(e.currentTarget);
		change_option(e.currentTarget);
	})

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