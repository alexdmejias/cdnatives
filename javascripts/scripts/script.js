jQuery(document).ready(function($) {
	var moviePath = 'javascripts/vendor/ZeroClipboard.swf';

	$('.button').on('click', function(e){
		e.preventDefault();
		var $this = $(this);
		var clip = new ZeroClipboard(document.getElementById($this.attr('id')), {
			moviePath: moviePath
		});

		clip.on( 'complete', function(client, args) {
			alert("Copied text to clipboard: " + args.text );
		});
	});


	// $('.button').each(function(){
	// 	var $this = $(this);

	// 	var cdn = $this.attr('url');
	// 	$this.attr('data-clipboard-text', cdn);

	// 	var temp_clip = new ZeroClipboard(document.getElementById($this.attr('id')),
	// 		{
	// 			moviePath: moviePath
	// 		}
	// 	);

	// });



});