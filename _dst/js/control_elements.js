var log_status = true; // Логировать инициализацию и события (по умолчанию false)
// =================================================================================
// ============================= DOCUMENT READY  ===================================
// =================================================================================
$(document).ready(function() {
	application.init(log_status);
	if(log_status){
		console.log('Инициализация документа - application.init');
	}
	// if($('.filter-section').length > 0){filters.init();}
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
	},
	setLocation: function(curLoc){
		if(curLoc != window.location){
			curLoc = curLoc.replace('ajax/', '');
            window.history.pushState(null, null, curLoc);
            return false;
        }
	},
	// PRINT RESULT AJAX
	print_result: function(wrapper, text, method = 'html_'){
		if(method == 'html_'){
			$(wrapper).html(text);
		}else if(method == 'text_'){
			$(wrapper).text(text);
		}
		if(log_status){
			console.log('Вывод результата Ajax в объект '+wrapper+' - application.print_result('+method+')');
		}
	}
},
// +++++++++++++++++++++++++ *APPLICATION FUNCTIONS END* +++++++++++++++++++++++++++
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