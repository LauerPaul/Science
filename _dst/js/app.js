$(document).ready(function(){app.init()});

var dropzone;
// APP JS
var app = {
	init: function(){
		// INIT APPLICATION
		app.developer('load', 'app.init()', 'Инициализация основной функции.');
		app.data();
		click.init();
		// Filters home page
		// if( $('.filter-section').length > 0 ){ filters.init(); }
		
		// Calendar widget
		var calendarWidgetWrapper = $("#events-calendar"); // Zabuto calendar - wrapper widget
		if(calendarWidgetWrapper.length > 0){
			plugin.calendarWidget(calendarWidgetWrapper);
		}

		// Checkbox styling
		app.developer('init', 'app.init()', 'Инициализация плагина iCheck для стилизации checkbox.');
		$('input[type="checkbox"], input[type="radio"]').iCheck();

		// Bootstrap select
		if($('.selectpicker').length > 0){
			app.developer('init', 'app.init()', 'Инициализация плагина Bootstrap select для стилизации input select.');
			$('.selectpicker').selectpicker();
		}

		if($('.dropzone-science').length > 0){
			app.developer('init', 'app.init()', 'Инициализация плагина Dropzone - photo uploader.');
			// var name = $('.dropzone-science').attr('data-input-name');
			dropzone = $('.dropzone-science').dropzone({
				maxFiles: 1,
				thumbnailMethod: 'contain',
				parallelUploads: 1,
				// paramName: name,
				success: function(data){
					window.location.reload();
				}
			});
		}
	},
	developer: function(action, func, text, log_status = true){
		// LOG DEVELOPER MODE
		// If log_status = true - console log all actions
		if(log_status){
			console.log(action + ' - ' + func + ' - ' + text);
		}
	},
	data: function(){
		// data-* init()
		app.developer('init', 'app.data()', 'Инициализация data-action-*.');
		// Click init
		if($(document).find('[data-action-click]').length > 0){
			app.developer('init', 'app.data()', 'Инициализация data-action-click.');
			var data_action_click = $('[data-action-click]');

			$(document).on('click', '[data-action-click]', function(){
				var parentElementClassName = ($(this)[0].parentElement.className).replace(' ', '.'),
					thisClassName = ($(this)[0].className).replace(' ', '.');

				app.developer('Click', 'app.data()', 'объект - $("' + $(this)[0].parentElement.localName + '.' + parentElementClassName + ' ' + $(this)[0].localName + '.' + thisClassName + '").');
				app.developer('init', 'click.'+$(this).attr('data-action-click')+'()', 'Запуск из события Click - $("' + $(this)[0].parentElement.localName + '.' + parentElementClassName + ' ' + $(this)[0].localName + '.' + thisClassName + '").click().');
				if (typeof(eval('click.' + $(this).attr('data-action-click'))) !== 'undefined') {
					eval('click.' + $(this).attr('data-action-click') + '($(this))');
				}else{
					
					app.developer('!!! ERROR !!!', 'app.data()', 'Событие $("' + $(this)[0].parentElement.localName + '.' + parentElementClassName + ' ' + $(this)[0].localName + '.' + thisClassName + '").click() не инициализировано - функция click.' + $(this).attr("data-action-click") + '() не найдена.');
				}
			});
		}
		// Focusout init
		if($(document).find('[data-action-focusout]').length > 0){
			app.developer('init', 'app.data()', 'Инициализация data-action-focusout.');
			var data_action_focusout = $('[data-action-focusout]');

			$('[data-action-focusout]').focusout(function(){
				var parentElementClassName = ($(this)[0].parentElement.className).replace(' ', '.'),
					thisClassName = ($(this)[0].className).replace(' ', '.');

				app.developer('focusout', 'app.data()', 'объект - $("' + $(this)[0].parentElement.localName + '.' + parentElementClassName + ' ' + $(this)[0].localName + '.' + thisClassName + '").');
				app.developer('init', 'focusout.'+$(this).attr('data-action-focusout')+'()', 'Запуск из события focusout - $("' + $(this)[0].parentElement.localName + '.' + parentElementClassName + ' ' + $(this)[0].localName + '.' + thisClassName + '").focusout().');
				if (typeof(eval('focusOut.' + $(this).attr('data-action-focusout'))) !== 'undefined') {
					eval('focusOut.' + $(this).attr('data-action-focusout') + '($(this))');
				}else{
					
					app.developer('!!! ERROR !!!', 'app.data()', 'Событие $("' + $(this)[0].parentElement.localName + '.' + parentElementClassName + ' ' + $(this)[0].localName + '.' + thisClassName + '").focusout() не инициализировано - функция focusout.' + $(this).attr("data-action-click") + '() не найдена.');
				}
			});
		}

		// Data init js
		if($(document).find('[data-js-init]').length > 0){
			app.developer('init', 'app.data()', 'Инициализация data-js-init.');
			for (var i = 0; i < $(document).find('[data-js-init]').length; i++) {
				if (typeof(eval($($('[data-js-init]')[i]).attr('data-js-init')+'.init')) !== 'undefined') {
					var this_ = $($('[data-js-init]')[i]);
					eval($($('[data-js-init]')[i]).attr('data-js-init')).init(this_);
					app.developer('init', 'app.data()', 'Инициализация data-js-init - '+$($('[data-js-init]')[i]).attr('data-js-init')+'.init()');
				}else{
					app.developer('!!! ERROR !!!', 'app.data()', 'Инициализация - функция '+$($('[data-js-init]')[i]).attr('data-js-init')+'.init() не найдена.');
				}
			}
		}

		// Tooltips init
		if($('[data-toggle="tooltip"]').length > 0){
			app.developer('init', 'app.data()', 'Инициализация Bootstrap Tooltips.');
			$('[data-toggle="tooltip"]').tooltip();
		}
	},
	click: function(obj, func){
		$(document).on('click', obj, function(){
			var parentElementClassName = ($(this)[0].parentElement.className).replace(' ', '.'),
				thisClassName = ($(this)[0].className).replace(' ', '.'),
				this_ = $(this);

			app.developer('Click', 'app.click()', 'объект - $("' + $(this)[0].parentElement.localName + '.' + parentElementClassName + ' ' + $(this)[0].localName + '.' + thisClassName + '").');
			app.developer('init', 'click.'+func+'()', 'Запуск из события Click - $("' + $(this)[0].parentElement.localName + '.' + parentElementClassName + ' ' + $(this)[0].localName + '.' + thisClassName + '").click().');
			if (typeof(eval('click.' + func)) !== 'undefined') {
				eval('click.' + func + '(this_)');
			}else{
				app.developer('!!! ERROR !!!', 'app.data()', 'Событие $("' + $(this)[0].parentElement.localName + '.' + parentElementClassName + ' ' + $(this)[0].localName + '.' + thisClassName + '").click() не инициализировано - функция click.' + func + '() не найдена.');
			}
		});
	},
	focus: function(obj, func){
		$(document).on('focus', obj, function(){
			var parentElementClassName = ($(this)[0].parentElement.className).replace(' ', '.'),
				thisClassName = ($(this)[0].className).replace(' ', '.'),
				this_ = $(this);

			app.developer('focus', 'app.focus()', 'объект - $("' + $(this)[0].parentElement.localName + '.' + parentElementClassName + ' ' + $(this)[0].localName + '.' + thisClassName + '").');
			app.developer('init', 'focus.'+func+'()', 'Запуск из события focus - $("' + $(this)[0].parentElement.localName + '.' + parentElementClassName + ' ' + $(this)[0].localName + '.' + thisClassName + '").focus().');
			if (typeof(eval('focus.' + func)) !== 'undefined') {
				eval('focus.' + func + '(this_)');
			}else{
				app.developer('!!! ERROR !!!', 'app.data()', 'Событие $("' + $(this)[0].parentElement.localName + '.' + parentElementClassName + ' ' + $(this)[0].localName + '.' + thisClassName + '").focus() не инициализировано - функция click.' + func + '() не найдена.');
			}
		});
	},
	focusOut: function(obj, func){
		$(obj).focusout(function(){
			var parentElementClassName = ($(this)[0].parentElement.className).replace(' ', '.'),
				thisClassName = ($(this)[0].className).replace(' ', '.'),
				this_ = $(this);

			app.developer('focusout', 'app.focusout()', 'объект - $("' + $(this)[0].parentElement.localName + '.' + parentElementClassName + ' ' + $(this)[0].localName + '.' + thisClassName + '").');
			app.developer('init', 'focusOut.'+func+'()', 'Запуск из события focusout - $("' + $(this)[0].parentElement.localName + '.' + parentElementClassName + ' ' + $(this)[0].localName + '.' + thisClassName + '").focusout().');
			if (typeof(eval('focusOut.' + func)) !== 'undefined') {
				eval('focusOut.' + func + '(this_)');
			}else{
				app.developer('!!! ERROR !!!', 'app.data()', 'Событие $("' + $(this)[0].parentElement.localName + '.' + parentElementClassName + ' ' + $(this)[0].localName + '.' + thisClassName + '").focusout() не инициализировано - функция click.' + func + '() не найдена.');
			}
		});
	},
	setLocation: function(curLoc){
		if(curLoc != window.location){
			app.developer('init', 'app.setLocation()', 'Установка url в адресной строке.');
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
		app.developer('init', 'app.print_result()', 'Вывод результата в $('+wrapper+') методом '+method+'.');
	}
},

// +++++++++++++++++++++++++ ADD POST PAGE FUNCTIONS +++++++++++++++++++++++++++++++
addPostPage = {
	init: function(){
		app.developer('init', 'addPostPage.init()', 'Инициализация скрипта.');
		var url_save = window.location.pathname + '/upload_file/ajax/';
			url_save = url_save.replace('//', '/'),
			parent_types = '#addPostType';
		editor.init('.text-reader', url_save);
		AddPageSectionTypeLoad.init(parent_types);
		app.developer('value', 'addPostPage.init()', ' url_save = ' + url_save + '.');

		var data_autocomplete = ['Статья', 'Научная статья', 'ученые', 'наука', 'тест']; // Autocomplete array
		app.focus('#tags-input input[type="text"]', 'tagInputFocusClass');
		addPostPage.selected( ['#science-1'], ['#hubs-1'] );
		autocomplete.init('#tags-input input[type="text"]', data_autocomplete, 2, '#tags-input');

		if($('#addPostType').length > 0){
			$(document).on('changed.bs.select', parent_types+' .bootstrap-select', function(e){
				app.developer('Change', 'addPostPage.init() - changed.bs.select', 'Выбор типа публикации.');
				setTimeout(function(){
					AddPageSectionTypeLoad.init(parent_types);
				},500);
			});
		}
	},
	selected: function(selectors = [], selector_themes = []){
		app.developer('init', 'addPostPage.selected()', 'Инициализация зависимости выпадающих меню.');

		if(selectors.length > 0){
			if(selectors.length == selector_themes.length){
				selectors.forEach( function(element, index) {
					$(document).on('changed.bs.select', element+' .bootstrap-select', function(e){
						app.developer('Change', 'addPostPage.selected()', 'on change ("'+element+'").');
						select_science.init(element, selector_themes[index]);
					});
				});
			}else{
				console.log('Ошибка! addPostPage.selected() - Массивы объектов должны быть равны');
			}
		}else{
			console.log('Ошибка! addPostPage.selected() - Пустой массив');
		}
	}
}
// ++++++++++++++++++++++++ *ADD POST PAGE FUNCTIONS END* ++++++++++++++++++++++++++
