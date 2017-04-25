$(document).ready(function() {
	// -----------------------------------------------------------------------------
	// ---------------------------- SEARCH HEADER ----------------------------------
	$('.header-button-search').click(function(event){
		var parent = $('header'),
			search = $('.searsh-wrapper', parent),
			padding_size = $('.header-menu', parent).css('padding-left'),
			a = Number(padding_size.replace("px", ""));
			hide_elements = $('.header-menu, .header-section-search .header-button-search', parent),
			left_position = $('.header-menu', parent).offset().left + a,
			width_block = $('.header-menu', parent).outerWidth() + $('.header-section-search', parent).outerWidth() - a,
			close_button = $('.close-serch', search);

		hide_elements.animate({
			'opacity': 0},
			300, function() {
				search.width(width_block).show('slow').css('left', left_position);
				$('#search', search).focus();

			close_button.click(function(event){
				search.hide('slow', function(){
					hide_elements.animate({'opacity': 1},200);	
				});
			});
		});
	});
	// ------------------------- *SEARCH HEADER END* -------------------------------
	// -----------------------------------------------------------------------------
});
$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})
