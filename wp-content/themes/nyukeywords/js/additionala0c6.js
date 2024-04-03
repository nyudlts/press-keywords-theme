jQuery(document).ready(function() {

	var iOS = ( navigator.userAgent.match(/(iPhone|iPod)/g) ? true : false );
	if(iOS) {
		jQuery('body').addClass('ios');
	}

	if(isMobile()){
		jQuery('body').addClass('isMobile');
	}

	jQuery( window ).resize(function() {
		if(!jQuery('body').hasClass('isMobile') && isMobile()){
			if(jQuery('#main-menu li:first-child').hasClass('open')){
				jQuery('body').css({'overflow': 'auto'});
				jQuery('#everything,header').css({position:'relative', 'left':'0px'});
				jQuery('#clickoverlay').show();
				jQuery('#clickoverlay2').hide();
				jQuery('#access').show();
			}
			else if(jQuery('#main-menu li:last-child').hasClass('open')){
				jQuery('body').css({'overflow': 'auto'});
				jQuery('#everything,header').css({position:'relative', 'left':'0px'});
				jQuery('#clickoverlay').show();
				jQuery('#clickoverlay2').hide();
				jQuery('#secondary-access').show();
			}
		}
		else if(jQuery('body').hasClass('isMobile') && !isMobile()){
			jQuery('#secondary-access').show();
			jQuery('#access').show();
			if(jQuery('#main-menu li:first-child').hasClass('open')){
				jQuery('body').css({'overflow': 'hidden'});
				jQuery('#everything,header,#clickoverlay2').css({position:'fixed', 'left':'340px'});
				jQuery('#clickoverlay').hide();
				jQuery('#clickoverlay2').show();
			}
			else if(jQuery('#main-menu li:last-child').hasClass('open')){
				jQuery('body').css({'overflow': 'hidden'});
				jQuery('#everything,header,#clickoverlay2').css({position:'fixed', 'left':'-340px'});
				jQuery('#clickoverlay').hide();
				jQuery('#clickoverlay2').show();
			}
		}

		if(isMobile()){
			jQuery('body').addClass('isMobile');
		}
		else{
			jQuery('body').removeClass('isMobile');
		}
	});


	jQuery('#master-menu > li.menu-item-has-children > a').on('click', function(e){
		if(isMobile()){
			e.preventDefault();
			jQuery(this).parent().toggleClass('opened');
		}
	});

	/* SEARCH */
	jQuery('#search').hide();
	jQuery('.icon-search').click(function(e) {
		e.preventDefault();
	if(jQuery('#main-menu li.open').length>0) {
console.log('into return false');
			return false;
				}
		if(jQuery(this).hasClass('xopen')) {
			jQuery('#search').slideUp();
			jQuery(this).removeClass('xopen');
//			jQuery('#clickoverlay').fadeOut();
			jQuery('#searchoverlay').fadeOut();
			jQuery('#searchoverlay2').fadeOut();
			
		} else {
			jQuery('#search').slideDown();
			jQuery(this).addClass('xopen');

			jQuery('#searchoverlay').fadeIn();
			jQuery('#searchoverlay2').fadeIn();

//			if(jQuery(window).width() <768) {
//				jQuery('#clickoverlay').fadeIn();
//			}
			
		}
	});
	jQuery('#clickoverlay, #searchoverlay, #searchoverlay2').click(function() {
		if(jQuery('.icon-search').hasClass('xopen')) {
			jQuery('#search').slideUp();
			jQuery('.icon-search').removeClass('xopen');
			
			
		}
		jQuery('#access,#secondary-access').slideUp();
		jQuery('li.open').removeClass('open');
		jQuery('#clickoverlay, #searchoverlay, #searchoverlay2').fadeOut();
	});

jQuery('#clickoverlay2').click(function() {
		if(jQuery('#main-menu li:first-child').hasClass('open')) { flyout('left',jQuery('#main-menu li:first-child')); }
		else if(jQuery('#main-menu li:last-child').hasClass('open')) { flyout('right',jQuery('#main-menu li:last-child')); }
	
		jQuery('#clickoverlay2').fadeOut();
	});

	/* CITE POPUP */
	jQuery('.action-cite').on('click', function(e){
		e.preventDefault();
		jQuery('#cite-box-overlay, #cite-box').fadeIn(500);
	});

	jQuery('#cite-box-overlay, #cite-box button').on('click', function(){
		jQuery('#cite-box-overlay, #cite-box').fadeOut(500);
	});

	/* SCROLL HELP */
	jQuery('#scroll-help').hide();
	 jQuery( window ).scroll(function() {
	 	if(jQuery(window).scrollTop()>100) {
			jQuery('#scroll-help').fadeIn();
		}
		else {
			jQuery('#scroll-help').fadeOut();
		}
		if(jQuery(window).width() >767) {
			//jQuery('header').css({'top':jQuery(window).scrollTop()+'px'});
		}
		if(jQuery(window).scrollTop()>0 && jQuery(window).width() <768) {
			jQuery('.icon-cart').fadeOut();
		}
		else if(jQuery(window).scrollTop()== 0 && jQuery(window).width() <768) {
			jQuery('.icon-cart').fadeIn();
		}
		
	 });
	jQuery('#up').click(function(e) {
		e.preventDefault();
		jQuery('html,body').animate({
          scrollTop: jQuery(window).scrollTop()-400
        }, 500);
	});	 
	jQuery('#down').click(function(e) {
		e.preventDefault();
		jQuery('html,body').animate({
          scrollTop: jQuery(window).scrollTop()+400
        }, 500);
	});	 
	
  jQuery('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = jQuery(this.hash);
      target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        jQuery('html,body').animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
	});
	
	/* NAVIGATION */
	jQuery('#main-menu li:first-child').click(function(e) {
		e.preventDefault();
		flyout('left',jQuery(this));
	});
	jQuery('#main-menu li:last-child').click(function(e) {
		e.preventDefault();
		flyout('right',jQuery(this));
	});

    jQuery('.home #content a.button[href="#"]').click(function(e) {
		e.preventDefault();
		flyout('left',jQuery('#main-menu li:first-child'));
	});
	
	jQuery('nav li.menu-item-has-children > a').click(function(e) {
			e.preventDefault();
		if(jQuery(this).parent('li').hasClass('open')) {
			jQuery(this).siblings('ul').slideUp();
			jQuery(this).parent('li').removeClass('open');
		}
		else {
			jQuery(this).siblings('ul').slideDown();
			jQuery(this).parent('li').addClass('open');
		}
	});
	
	/* FUNCTION TO HANDLE LEFT AND RIGHT FLYOUT NAVI 
	direction = left or right
	el = the element clicked to trigger the flyout */
	
	function flyout(direction, el) {
		if(jQuery(window).width() >767) {
			if(direction == "right") {
				var offset = "-340px";
			}
			else {
				var offset = "340px";
			}
			if(el.hasClass('open')) {
				jQuery('#clickoverlay2').fadeOut();
				jQuery('body').css({'overflow': 'auto'});
				jQuery('#everything').css({position:'relative'}).animate({'left':'0'}, 300, function() {
				
				});
				jQuery('header').animate({'left':'0'}, 300, function() {
				
				});
				jQuery('.open').removeClass('open');
			}
			else {
				
				jQuery('body').css({'overflow': 'hidden'});
				jQuery('#everything,header,#clickoverlay2').css({position:'fixed'}).animate({'left':offset}, 300, function() {
					jQuery('#clickoverlay2').fadeIn();	
				});
				jQuery('.open').removeClass('open');
				el.addClass('open');
			}
		}
		else {
			jQuery('#access,#secondary-access').fadeOut('fast');
			
	
			if(el.children('a').text() == "Essays") {
				var navi = jQuery('#access');
			}
			else {
				var navi = jQuery('#secondary-access');
			}
			if(el.hasClass('open')) {
				jQuery('#clickoverlay').fadeOut();
				navi.slideUp();
				jQuery('.open').removeClass('open');
			}
			else {
				navi.slideDown();
				jQuery('#clickoverlay').fadeIn();
				jQuery('.open').removeClass('open');
				el.addClass('open');
			}
			jQuery('.sub-menu').fadeOut();
		}
	}

	function isMobile(){
		if(jQuery(window).width() >767) {
			return false;
		}
		else{
			return true;
		}
	}
});
