jQuery(document).ready(function() {
	jQuery('#searchform button.toggle-searchsites').on('click', function(e){
		e.preventDefault();
		jQuery('ul.searchsites').slideToggle();
	});
});
