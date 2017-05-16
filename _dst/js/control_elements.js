var log_status = true; // Логировать инициализацию и события (по умолчанию false)
// =================================================================================
// ============================= DOCUMENT READY  ===================================
// =================================================================================
$(document).ready(function() {
	application.init(log_status);
	if(log_status){
		console.log('Инициализация документа - application.init');
	}
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
	
	if(log_status){
		console.log('on click событие - .bootstrap-select .dropdown-toggle');
	}	
	if(parent.hasClass('open')){
		$('div.dropdown-menu', parent).jScrollPane();
		if(log_status){
			console.log('Инициализация jScrollPane - .bootstrap-select .dropdown-toggle div.dropdown-menu');
		}
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

	if(log_status){
		console.log('on click событие - .header-button-search');
	}	

	hide_elements.animate({
		'opacity': 0},
		300, function() {
			search.width(width_block).show('slow').css('left', left_position);
			$('#search', search).focus();

		close_button.click(function(event){
			search.hide('slow', function(){
				hide_elements.animate({'opacity': 1},200);	
			});
			if(log_status){
				console.log('on click событие - search.hide');
			}
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

		if(log_status){
			console.log('on change событие - #science filter');
		}

	// REMOVE
	var  success = { 
		list: [
			{ name: 'Физика конденсированных сред', value: 'ph_cond_s' },
			{ name: 'Физика аномальных явлений', value: 'ph_an_y' },
			{ name: 'Физика буддийского будущего', value: 'ph_bud_d' }
		],
		responsHTML: "Text"
	}
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

		if(log_status){
			console.log('on change событие - #science-themes filter');
		}

	//remove
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

		if(log_status){
			console.log('on change событие - #types filter');
		}

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

		if(log_status){
			console.log('on show событие - #types filter');
		}

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
// ++++++++++++++++++++++++++++ APPLICATION FUNCTIONS ++++++++++++++++++++++++++++++
var application = {
	init: function(log_status = false) {
		// -----------------------------------------------------------------------------
		// ---------------------- CALENDAR FOR EVENTS WIDGET ---------------------------
		if($("#events-calendar").length > 0){
			$(function (){
				var dates = [
						{
							"date":"2017-05-08",
							"badge":true,
							"title":"Tonight",
							"body":"<p class=\"lead\">Party<\/p><p>Like it's 1999.<\/p>",
							"footer":"At Paisley Park",
							"classname":"purple-event",
						},
						{
							"date":"2017-05-20",
							"badge":true,
							"title":"Tonight",
							"body":"<p class=\"lead\">Party<\/p><p>Like it's 1999.<\/p>",
							"footer":"At Paisley Park",
							"classname":"purple-event"
						}
					];
				calendar_events.init($("#events-calendar"), 'ru', dates, log_status);
				if(log_status){
					console.log('Вызов скрипта календаря событий (виджет) - calendar_events.init');
				}
			});
		}
		// -----------------------------------------------------------------------------
		// ----------------------BOOTSTRAP SELECT SETTINGS -----------------------------
		$('.selectpicker').selectpicker({
			iconBase: 'sceinceIcon',
		});
		if(log_status){
			console.log('SelectPicker - иницализация');
		}
		// -----------------------------------------------------------------------------
		// ------------------------BOOTSTRAP TOOLTIP INIT ------------------------------
		$('[data-toggle="tooltip"]').tooltip();
		if(log_status){
			console.log('Bootstrap Tooltips - иницализация');
		}
		// -----------------------------------------------------------------------------
	}
},
// +++++++++++++++++++++++++ *APPLICATION FUNCTIONS END* +++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++ PRINT RESULT AJAX FUNCTIONS +++++++++++++++++++++++++++
results = {
	// .html function 
		html_: function (wrapper, text){
			$(wrapper).html(text);
			if(log_status){
				console.log('Вывод результата Ajax в объект '+wrapper+' - results.html_');
			}
		},
	// .print function 
		print_: function (wrapper, text){
			$(wrapper).html(text);
			if(log_status){
				console.log('Вывод результата Ajax в объект '+wrapper+' - results.print_');
			}
		} 
}
// ++++++++++++++++++++++ *PRINT RESULT AJAX FUNCTIONS END* ++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++ CALENDAR EVENTS WIDGET FUNCTIONS ++++++++++++++++++++++++
calendar_events = {
	// http://zabuto.com
	init: function(obj, lang, date, log_status){
		obj.zabuto_calendar({
			/* de	Deutsch (German)	 	nl	Nederlands (Dutch)
			 en	English [default value]	 	pt	Portugues (Portuguese)
			 es	Espanol (Spanish)	 	ru	ру́сский язы́кR (Russian)
			 fr	Francais (French)	 	se	Svenska (Swedish)
			 it	Italiano (Italian)	 	tr	Türkçe (Turkish) */
			data: date,
			language: lang,
			action: function () {
                return calendar_events.myDateFunction(this.id, false);
            },
            action_nav: function (log_status) {
                return calendar_events.myNavFunction(this.id);
            },
			nav_icon: {
		        prev: '<i class="fa fa-chevron-circle-left"></i>',
		        next: '<i class="fa fa-chevron-circle-right"></i>'},
	    });
	    if(log_status){
			console.log('Инициализация календаря событий (виджет) - calendar_events.init');
		}
	},
	myDateFunction: function(id, log_status) {
		// Событие при выборе дня
	  var date = $("#" + id).data("date");
	  var hasEvent = $("#" + id).data("hasEvent");
	},
	myNavFunction: function(id, log_status) {
		// Событие при перелистывании месяца
	  var nav = $("#" + id).data("navigation");
	  var to = $("#" + id).data("to");
	}
}
// ++++++++++++++++++++ *CALENDAR EVENTS WIDGET FUNCTIONS END* +++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++