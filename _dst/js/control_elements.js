// =================================================================================
// ============================= DOCUMENT READY  ===================================
// =================================================================================
$(document).ready(function() {
	// -----------------------------------------------------------------------------
	// ---------------------- CALENDAR FOR EVENTS WIDGET ---------------------------
	if($("#events-calendar").length > 0){
		var dates;
		calendar_events.init($("#events-calendar"), 'ru', dates);
	}
	// -----------------------------------------------------------------------------
	// ----------------------BOOTSTRAP SELECT SETTINGS -----------------------------
	$('.selectpicker').selectpicker({
		iconBase: 'sceinceIcon'
	});
	// -----------------------------------------------------------------------------
	// ------------------------BOOTSTRAP TOOLTIP INIT ------------------------------
	$(function () {
		$('[data-toggle="tooltip"]').tooltip();
	})
	// -----------------------------------------------------------------------------
});
// =================================================================================
// ========================== *DOCUMENT READY END* =================================
	// =======================================================================
// ================================ ACTIONS ========================================
// =================================================================================
// ---------------------------------------------------------------------------------
// --------------------- SCROLL STYLING BOOTSTRAP SELECT ---------------------------
$(document).on('click', '.bootstrap-select .dropdown-toggle', function(){
	var _this = $(this),
		parent = _this.parent('.bootstrap-select');
	if(parent.hasClass('open')){
		$('div.dropdown-menu', parent).jScrollPane();
	}
})
// ------------------ *SCROLL STYLING BOOTSTRAP SELECT END* ------------------------
// ---------------------------------------------------------------------------------
// --------------------------- SEARCH HEADER TOGGLE --------------------------------
$(document).on('click', '.header-button-search', function(event){
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
// ---------------------- *SEARCH HEADER TOGGLE END* -------------------------------
// ---------------------------------------------------------------------------------

// =================================================================================
// ============================= *ACTIONS END* =====================================
	// ========================================================================
// ============================= FILTERS ACTION ====================================
// =================================================================================

// ---------------------------------------------------------------------------------
// -------------------------- Science FILTER select --------------------------------
// ---------------------------------------------------------------------------------
$(document).on('changed.bs.select', '.select-parent#science .bootstrap-select', function(e){
	var parent = $('.select-parent#science'), // parent block
		select_ = $('select.selectpicker', parent), // Select
		val_ = select_.val(), // Selected result
		themes_select = $('#science-themes select.selectpicker'), // THEMES SELECT
		types_select = $('.select-parent#types select.selectpicker'), // Types select
		types_filter = types_select.val(), // Types filter value
		ajax_url = select_.attr('data-url')+val_+'/'+types_select.attr('data-url')+types_filter+'/', // *URL FOR AJAX*
		wrapper_result = $('.publications-wrapper .result-wrapper'); // Wrapper for html results

	// REMOVE
	var  success = { 
		list: [
			{ name: 'Физика конденсированных сред', value: 'ph_cond_s' },
			{ name: 'Физика аномальных явлений', value: 'ph_an_y' },
			{ name: 'Физика буддийского будущего', value: 'ph_bud_d' }
		],
		responsHTML: "Text"
	}
	console.log(val_);
	//

	// ------------ *success* ----------------
	$.each(success.list, function(key, value) {
		themes_select.append('<option value="'+value.value+'" data-tokens="'+value.name+'">'+value.name+'</option>');
	});
	$('#science-themes select.selectpicker').removeAttr('disabled').selectpicker('refresh');

	results.html_(wrapper_result, success.responsHTML+'<br><b>AJAX URL: </b>'+ajax_url);
	// ---------------------------------------

});
// ---------------------------------------------------------------------------------
// -------------------------- Science themes FILTER select -------------------------
// ---------------------------------------------------------------------------------
$(document).on('changed.bs.select', '.select-parent#science-themes .bootstrap-select', function(e){
	var parent = $('.select-parent#science-themes'), // parent block
		select_ = $('select.selectpicker', parent), // Select
		val_ = select_.val(), // Selected result
		types_select = $('.select-parent#types select.selectpicker'), // Types select
		types_filter = types_select.val(), // Types filter value
		science_filter = $('.select-parent#science select.selectpicker').val(),// Science filter value
		ajax_url = select_.attr('data-url')+val_+'/'+types_select.attr('data-url')+types_filter+'/', // *URL FOR AJAX*
		wrapper_result = $('.publications-wrapper .result-wrapper'); // Wrapper for html results

	//remove
	console.log(val_);
	var results_ = '<b>Types selected:</b> ' + types_filter+'<br><b>Science:</b> '+science_filter+'<br><b>Theme:</b> '+val_+'<br><b>URL AJAX:</b> '+ajax_url ;
	//
	
	// ------------ *success* ----------------
	results.html_(wrapper_result, results_);
	// ---------------------------------------
});
// ---------------------------------------------------------------------------------
// --------------------------- Types FILTER select ---------------------------------
// ---------------------------------------------------------------------------------
// Change (select option) action
$(document).on('changed.bs.select', '.select-parent#types .bootstrap-select', function(e){
	var parent = $('.select-parent#types'), // parent block
		select = $('select.selectpicker', parent), // $('select')
		val_ = select.val(), // Selected result
		length_selected = select.val().length, // Length of selected options
		length_options = select.children('option').length, // Sum of all options
		science_select = $('#science select.selectpicker'), // SCIENCE SELECT
		science_filter = science_select.val(),// Science filter value
		themes_select = $('#science-themes select.selectpicker'), // THEMES SELECT
		science_themes_filter = themes_select.val(),// Science Themes filter value
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

	var val_ = $('select.selectpicker', parent).val(), // Selected result
		// ------------ *URL FOR AJAQ REQUEST* ----------------
		ajax_url = science_themes_filter !== '' ? themes_select.attr('data-url')+science_themes_filter+'/'+select.attr('data-url')+val_+'/' : (science_filter !== '' ? science_select.attr('data-url')+science_filter+'/'+select.attr('data-url')+val_+'/' : select.attr('data-single-url')+select.attr('data-url')+val_+'/');
		// ----------------------------------------------------
	
	// ------------ *success* ----------------
	results.html_(wrapper_result, ajax_url);
	// ---------------------------------------
});
// open dropdown menu of types action
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
// =================================================================================
// ========================== *FILTERS ACTION END* =================================
// =================================================================================

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++ PRINT RESULT AJAX FUNCTIONS +++++++++++++++++++++++++++
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
// ++++++++++++++++++++++ *PRINT RESULT AJAX FUNCTIONS END* ++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var calendar_events = {
	init: function(obj, lang, date){
		obj.zabuto_calendar({
			/* de	Deutsch (German)	 	nl	Nederlands (Dutch)
			 en	English [default value]	 	pt	Portugues (Portuguese)
			 es	Espanol (Spanish)	 	ru	ру́сский язы́кR (Russian)
			 fr	Francais (French)	 	se	Svenska (Swedish)
			 it	Italiano (Italian)	 	tr	Türkçe (Turkish) */
			language: lang,
			data: date,
			nav_icon: {
		        prev: '<i class="fa fa-chevron-circle-left"></i>',
		        next: '<i class="fa fa-chevron-circle-right"></i>'}
	    });
	}
}