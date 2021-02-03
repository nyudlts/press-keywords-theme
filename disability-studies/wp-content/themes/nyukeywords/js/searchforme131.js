jQuery(document).ready(function() {
	jQuery('#searchform button.toggle-searchsites').on('click', function(e){
		e.preventDefault();
		jQuery('ul.searchsites').slideToggle();
	});

	jQuery('#searchform input[name="cc_gs_sites[]"] + label, #searchform input[name="post_type"] + label').on('click', function(){
		jQuery(this).siblings('input').trigger('click');
	});

	jQuery('#searchform input[name="cc_gs_sites[]"]').on('click', function(){
		if(jQuery(this).hasClass('all')){
			jQuery('#searchform input[name="cc_gs_sites[]"]').attr('checked', false);
			jQuery(this).attr('checked', 'checked');
		}
		else if(jQuery('#searchform input.all[name="cc_gs_sites[]"]:checked').length == 1){
			jQuery('#searchform input.all[name="cc_gs_sites[]"]:checked').attr('checked', false);
			jQuery('#searchform input[name="post_type"][value="essay"]').attr('checked', true);
		}
		setAction();
	});

	jQuery('#searchform input[name="post_type"]').on('click', function(){
		if(jQuery(this).val() != 'essays'){
			jQuery('#searchform input[name="cc_gs_sites[]"]').attr('checked', false);
			jQuery('#searchform input.all[name="cc_gs_sites[]"]').attr('checked', true);
		}
		setAction();
	});

	function setAction(){
		if(jQuery('#searchform input[name="cc_gs_sites[]"]:checked').length != 1){
			jQuery('#searchform').attr('action', formActions['1']);
		}
		else{
			action = jQuery('#searchform input[name="cc_gs_sites[]"]:checked').val();
			if(action.indexOf(",") > 0){
				action = 1;
			}
			jQuery('#searchform').attr('action', formActions[action]);
		}
	}

	jQuery('.search-results #results-pagination a').on('click', function(e){
		e.preventDefault();
		jQuery('#searchform').attr('action', jQuery(this).attr('href')).submit();
	});
});