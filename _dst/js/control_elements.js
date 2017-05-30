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
		// DATA INIT JS init()
		if($(document).find('[data-js-init]').length > 0){
			if(log_status){
				console.log('$([DATA-JS-INIT]).init()');
			}
			for (var i = 0; i < $(document).find('[data-js-init]').length; i++) {
				var _val_js = $($('[data-js-init]')[i]).attr('data-js-value') !== undefined ? $($('[data-js-init]')[i]).attr('data-js-value') : '';
				eval($($('[data-js-init]')[i]).attr('data-js-init')).init(_val_js);
			}
		}
		// DATA JS ACTION init()
		if($(document).find('[data-action-click]').length > 0){
			if(log_status){
				console.log('$([data-action-click]).init()');
			}
			$(document).on('click', '[data-action-click]', function() {
				eval($(this).attr('data-action-click'));
				if(log_status){
					console.log('$([data-action-click]).click()');
				}
			});
		}

		//ICHECK
		$('input[type="checkbox"]').iCheck();
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
		}else if(method == 'append'){
			$(wrapper).append(text);
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
},
// ++++++++++++++++++++ *CALENDAR EVENTS WIDGET FUNCTIONS END* +++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++ TINYMCE EDITOR FUNCTION INIT ++++++++++++++++++++++++++++
editor = { 
	init: function(
				selector, 
				height = 325, 
				toolbar = 'bold italic underline | undo redo',
				css,
				menubar = false,
				plugins = ''
			){
		tinymce.init({
			selector: selector,
			height: height,
			menubar: menubar,
			plugins: [plugins],
			toolbar: toolbar,
			content_css: css
		});
		if(log_status){
			console.log('Инициализация TINYMCE EDITOR - editor.init("'+selector+'")');
		}
	}
},
// ++++++++++++++++++++ *TINYMCE EDITOR FUNCTION INIT END* +++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++ jQuery UI AUTOCOMPLETE FUNCTIONS +++++++++++++++++++++++++
autocomplete = {
	init: function(selector, data, minLength = 2, appendTo){
		if(log_status){
			console.log('Инициализация autocomplete.init("'+selector+'")');
		}

		$(selector).autocomplete({
	      source: data,
	      minLength: minLength,
	      appendTo: appendTo,
	    });
	},
	destroy: function(selector){
		if(log_status){
			console.log('Инициализация autocomplete.destroy("'+selector+'")');
		}
		$(selector).autocomplete( "destroy" );
	},
	change: function(selector, function_){
		if(log_status){
			console.log('Bind autocomplete.change("'+selector+'")');
		}
		$(selector).on( "autocompletechange", function( event, ui ) {function_;});
	}
},
// +++++++++++++++++++ *jQuery UI AUTOCOMPLETE FUNCTIONS END* ++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++ TAG INPUTS FUNCTIONS +++++++++++++++++++++++++++++++
taginputs = {
	init: function(selector, maxTags, source){
		$(selector).tagsinput({
			maxTags: maxTags,
			typeahead: {
				source: source
			},
		});
	},
	focus: function(selector){
		$(selector).tagsinput('focus');
	},
	refresh: function(selector){
		$(selector).tagsinput('refresh');
	},
	destroy: function(selector){
		$(selector).tagsinput('destroy');
	},
	removeAll: function(selector){
		$(selector).tagsinput('removeAll');
	},
	value: function(selector){
		$(selector).tagsinput('items')
	}
},
// +++++++++++++++++++++++++ *TAG INPUTS FUNCTIONS END* ++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++ ADD POST PAGE FUNCTIONS +++++++++++++++++++++++++++++++
addPostPage = {
	init: function(){
		
		if(log_status){
			console.log('Инициализация addPostPage.init()');
		}

		var data = ['Статья', 'Научная статья', 'ученые', 'наука', 'тест'];

		editor.init('.text-reader');
		autocomplete.init('#tags-input input[type="text"]', data, 2, '#tags-input');

		$(document).on('focus', '#tags-input input[type="text"]', function(event) {
			if(log_status){
				console.log('focus #tags-input input[type="text"]');
			}
			$(this).parents('.bootstrap-tagsinput').addClass('focus');
			$(this).focusout(function(){
				$(this).parents('.bootstrap-tagsinput').removeClass('focus');
			});
		});
		$(document).on('focus', '.input-group.gray-label .form-control', function(event) {
			$(this).parents('.input-group.gray-label').addClass('focus');
			$(this).focusout(function(){
				$(this).parents('.input-group.gray-label').removeClass('focus');
			});
		});
		addPostPage.selected(
			['#science-1'], 
			['#science-theme-1']
		);
	},
	selected: function(selectors = [], selector_themes = []){
		if(log_status){ console.log('Инициализация addPostPage.selected("'+selectors+'")'); }

		if(selectors.length > 0){
			if(selectors.length == selector_themes.length){
				selectors.forEach( function(element, index) {
					$(document).on('changed.bs.select', element+' .bootstrap-select', function(e){
						if(log_status){ console.log('on change ("'+element+'")'); }
						select_science.init(element, selector_themes[index]);
					});
				});
			}else{
				console.log('Ошибка! addPostPage.selected() - Массивы объектов должны быть равны');
			}
		}else{
			console.log('Ошибка! addPostPage.selected() - Пустой массив');
		}
	},
	patent: function(parent){
		var tmp = '<div class="input-group"><input class="form-control" type="text" name="paten-new"></div>';
		application.print_result(parent, tmp, 'append');
		var new_ = $(parent).find('input[name="paten-new"]'),
			name_patent = 'patent-';
		for (var i = 1; i < 10 + 1; i++) {
			if(	$(parent).find('input[name="' + name_patent + i +'"]').length == 0 ) {
				for (var i_ = 0; i_ < new_.length; i_++) {
					$($(new_)[i_]).attr('name', name_patent + i);
					i++
				}
				break
			}
		}
	}
},
// ++++++++++++++++++++++++ *ADD POST PAGE FUNCTIONS END* ++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++ SELECT SCIENCE > THEME FUNCTIONS +++++++++++++++++++++++++
select_science = {
	init: function(scince_parent, themes_parent) {
		if(log_status){ console.log('Инициализация select_science.init()'); }
		var ss_parent_scince = $(scince_parent), // parent scince block
			ss_parent_themes = $(themes_parent), // parent scince block
				ss_select_scince = $('select.selectpicker', ss_parent_scince), // Select
				ss_select_themes = $('select.selectpicker', ss_parent_themes), // Select	
			ss_val_scince = ss_select_scince.val(), // Selected result
			ss_val_themes = ss_select_themes.val(); // Selected result

		// jAjax.set("URL", ajax_url).set("dataType", "json").set("type", "GET").load(function(success){
		// 	if(log_status){
		// 		console.log('Успешный запрос ajax (filter science)');
		// 		console.log(success);
		// 	}

		// 	// ------------ *success* ----------------
		// 	if($.trim(success.response_html) == 'Collection is empty' || success.response_html == ''){
		// 		if(log_status){ console.log(success.response_html);}
		// 		ss_select_themes.html('').attr('disabled', 'disabled').selectpicker('refresh');
		// 	}else{
		
		var success = ["first", "test", "aaa", "tsdst"];

				ss_select_themes.html('');
				$.each(success, function(key, value) {
					ss_select_themes.append('<option value="'+key+'" data-tokens="'+value+'">'+value+'</option>');
				});
				ss_select_themes.removeAttr('disabled').selectpicker('refresh');
		// }
			// }
			// ---------------------------------------
		// });
	},
	addNew: function(wrapper = false, htm = false){
		if(htm && wrapper){
			if(log_status){ console.log('Инициализация select_science.addNew()'); }	
			if(htm = 'Add Post Page'){
					// For add Post Page
					var index_select_addNew = 'science-',
						index_theme_select_addNew = 'science-theme-',
						data_selects_addNew = 'selected=';

					for (var i_ = 1; i_ < 6 ; i_++) {
						if($(document).find('#science-'+i_).length == 0){
							setTimeout(function(){
								for (var i = 1; i < i_; i++) {
									data_selects_addNew += (i) > 1 && $('select.selectpicker[name="'+index_select_addNew+i+'"]').val() !== '' ? ',' : '';
									data_selects_addNew += $(document).find('select.selectpicker[name="'+index_select_addNew+i+'"]').val();
									console.log(data_selects_addNew);
								}
							},500);

							// jAjax.set("URL", ajax_url).set("dataType", "json").set("type", "POST").load({} ,function(success){
								htm = '<div class="input-group select-parent new-select-science"><select class="selectpicker form-control" title="Выберите науку" name="science-1"><option value="physics">Физика</option><option value="mathematics"> Математика</option><option value="chemistry"> Химия</option><option value="biology"> Биология</option><option value="history"> История</option><option value="astronomy"> Астрономия</option><option value="geography"> География</option><option value="geology"> Геология</option><option value="botany"> Ботаника</option></select></div><div class="input-group select-parent new-select-science-theme"><select class="selectpicker form-control" data-live-search="true" title="Направление" name="science-theme-1" multiple="multiple" data-max-options="2" disabled="disabled"></select></div>';
								application.print_result(wrapper, htm, 'append');
								
								$('.new-select-science').attr('id', index_select_addNew+i_)
								.removeClass('new-select-science')
								.find('select.selectpicker').attr('name', index_select_addNew+i_);

								$('.new-select-science-theme').attr('id', index_theme_select_addNew+i_)
								.removeClass('new-select-science-theme')
								.find('select.selectpicker').attr('name', index_theme_select_addNew+i_);

								addPostPage.selected(
									['#'+index_select_addNew+i_], 
									['#'+index_theme_select_addNew+i_]
								);

								console.log(addPostPage.selected(
									['#'+index_select_addNew+i_], 
									['#'+index_theme_select_addNew+i_]
								));
							// });
							break
						}
					}
					$('select.selectpicker').selectpicker();

			}else{
				application.print_result(wrapper, htm, 'append');
			}
		}else{
			if(!htm){
				console.log('!ERROR select_science.addNew() - переменная htm пустая');
			}else{
				console.log('!ERROR select_science.addNew() - переменная wrapper пустая');
			}
		}
	}
},
// +++++++++++++++++++ *SELECT SCIENCE > THEME FUNCTIONS END* ++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
datepicker = {
	init: function(obj){
		var dp_local = $(obj).attr('datepicker-local') == '' || $(obj).attr('datepicker-local') == undefined ? 'en' : $(obj).attr('datepicker-local');
		if(log_status){ console.log('Инициализация datepicker.init()'); }	
		$(obj).datepicker({
			regional: ['ru'],
			dateFormat: "d MM yy",
			showOtherMonths: true,
			selectOtherMonths: true,
			minDate: "+ 1m"
		});
		// $.datepicker.setDefaults( $.datepicker.regional[ dp_local ] )
	},
	show: function(obj){
		$(obj).datepicker( "show" );
	},
	hide: function(obj){
		$(obj).datepicker('hide');
	},
	refresh: function(obj){
		$(obj).datepicker('refresh');
	},
	destroy: function(obj){
		$(obj).datepicker('destroy');
	}
},
datetimepicker = {
	init: function(obj){
		var dp_local = $(obj).attr('datetimepicker-local') == '' || $(obj).attr('datetimepicker-local') == undefined ? 'en' : $(obj).attr('datetimepicker-local');
		if(log_status){ console.log('Инициализация datetimepicker.init()'); }	
		$(obj).datetimepicker({
			format: 'yyyy-mm-dd hh:ii',
			autoclose: true,
			startDate: null,
			DaysOfWeekDisabled: [0,6],
		}
		);
	},
	show: function(obj) {
		$(obj).datetimepicker( "show" );
	}
}