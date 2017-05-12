$(document).ready(function() {
	$('.selectpicker').selectpicker({
		iconBase: 'sceinceIcon'
	});
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
	$('[data-toggle="tooltip"]').tooltip();
})

// -----------------------------------------------------------------------------
// ----------------- SCROLL STYLING BOOTSTRAP SELECT ---------------------------
$(document).on('click', '.bootstrap-select .dropdown-toggle', function(){
	var _this = $(this),
		parent = _this.parent('.bootstrap-select');
	if(parent.hasClass('open')){
		$('div.dropdown-menu', parent).jScrollPane();
	}
})
// -------------- *SCROLL STYLING BOOTSTRAP SELECT END* ------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -------------------- FILTERS SELECT ACTION ----------------------------------
// --------------
// Science select
// --------------
$(document).on('changed.bs.select', '.select-parent#science .bootstrap-select', function(e){
	var parent = $('.select-parent#science'), // parent block
		val_ = $('select.selectpicker', parent).val(), // Selected result
		themes_select = $('#science-themes select.selectpicker'), // Wrapper for print results themes
		types_filter = $('.select-parent#types select.selectpicker').val(), // Types filter value
		science_themes_filter = $('.select-parent#science-themes select.selectpicker').val(),// Science Themes filter value
		wrapper_result = $('.publications-wrapper .result-wrapper'); // Wrapper for html results

		console.log(val_);
	
	//*success*
	var  success = { 
		list: [
			{ name: 'Физика конденсированных сред', value: 'ph_cond_s' },
			{ name: 'Физика аномальных явлений', value: 'ph_an_y' },
			{ name: 'Физика буддийского будущего', value: 'ph_bud_d' }
		],
		responsHTML: "Text"
	}

	// ---------------------------------------
	$.each(success.list, function(key, value) {
		themes_select.append('<option value="'+value.value+'" data-tokens="'+value.name+'">'+value.name+'</option>');
	});
	$('#science-themes select.selectpicker').removeAttr('disabled').selectpicker('refresh');

	results.html_(wrapper_result, success.responsHTML);
	// ---------------------------------------

});
// --------------------
// Science-theme select
// --------------------
$(document).on('changed.bs.select', '.select-parent#science-themes .bootstrap-select', function(e){
	var parent = $('.select-parent#science-themes'), // parent block
		val_ = $('select.selectpicker', parent).val(), // Selected result
		types_filter = $('.select-parent#types select.selectpicker').val(), // Types filter value
		science_filter = $('.select-parent#science select.selectpicker').val(),// Science filter value
		wrapper_result = $('.publications-wrapper .result-wrapper'); // Wrapper for html results

	console.log(val_);

	//remove
	var results_ = '<b>Types selected:</b> ' + types_filter+'<br><b>Science:</b> '+science_filter+'<br><b>Theme:</b> '+val_ ;

	//
	results.html_(wrapper_result, results_);
});
// ------------
// Types filter
// ------------
// open action
$(document).on('show.bs.select', '.select-parent#types .bootstrap-select', function(e){
	var parent = $('.select-parent#types'), // parent block
		select = $('select.selectpicker', parent); // $('select')

	if($(select.children('option')[0]).prop('selected')){
		$('.dropdown-menu li a', parent).addClass('select-main');
	}else{
		if($('.dropdown-menu li a', parent).hasClass('select-main')){
			$('.dropdown-menu li a', parent).removeClass('select-main');
			$(select.children('option')[0]).prop('selected', false);
		}
	}
});
// Change action
$(document).on('changed.bs.select', '.select-parent#types .bootstrap-select', function(e){
	var parent = $('.select-parent#types'), // parent block
		select = $('select.selectpicker', parent), // $('select')
		length_selected = select.val().length, // Length of selected options
		length_options = select.children('option').length, // Sum of all options
		science_filter = $('.select-parent#science select.selectpicker').val(),// Science filter value
		science_themes_filter = $('.select-parent#science-themes select.selectpicker').val(),// Science Themes filter value
		wrapper_result = $('.publications-wrapper .result-wrapper'); // Wrapper for html results

	if($(select.children('option')[0]).prop('selected')){
		$(select.children('option')[0]).prop('selected', false);
		$('.dropdown-menu li a', parent).removeClass('select-main');
		select.selectpicker('refresh');
	}else if(length_selected == length_options - 1 && !$(select.children('option')[0]).prop('selected') || length_selected == 0){
		select.children('option').prop('selected', false);
		$(select.children('option')[0]).prop('selected', true);
		select.selectpicker('refresh');
		$('.dropdown-menu li a', parent).addClass('select-main');
	}
	
	var val_ = $('select.selectpicker', parent).val(); // Selected result
	//remove
	var results_ = '<b>Types selected:</b> ' + val_+'<br><b>Science:</b> '+science_filter+'<br><b>Theme:</b> '+science_themes_filter ;
	//
	results.html_(wrapper_result, results_);
	console.log(val_);
});
// ------------------ *FILTERS SELECT ACTION END* ------------------------------
// -----------------------------------------------------------------------------

var results = {
	// .html function 
		html_: function (wrapper, text){
			$(wrapper).html(text);
		},
	// .print function 
		print_: function (wrapper, text){
			$(wrapper).html(text);
		} 
}