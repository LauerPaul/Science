var click = {
	init: function(){
		// ARRAY Click
		var init_list = [
				// SCROLL STYLING BOOTSTRAP SELECT
				{'object': '.bootstrap-select .dropdown-toggle', 'key': 'scrollStylingSelect'},
				// Search show (Header section)
				{'object': '.header-button-search', 'key': 'headerSearchTopToggle'},
				// Search close (Header section)
				{'object': 'header .searsh-wrapper .close-serch', 'key': 'closeSearchTopToggle'},
			],
			// ARRAY FOCUS
			init_list_Focus = [
				// Input group with addons focus
				{'object': '.input-group.gray-label .form-control', 'key': 'InputGroupFOCUS'},
			];

		init_list.forEach(function(key) {
			app.developer('init', 'click.init()', 'Инициализация app.click("'+ key['object'] +'").');
			app.click(key['object'], key['key']);
		});

		init_list_Focus.forEach(function(key) {
			app.developer('init', 'click.init()', 'Инициализация app.focus("'+ key['object'] +'").');
			app.focus(key['object'], key['key']);
		});
	},
	// SCROLL STYLING BOOTSTRAP SELECT
	scrollStylingSelect: function(obj){
		var _this = $(obj),
			parent = _this.parent('.bootstrap-select');
		if(parent.hasClass('open')){
			$('div.dropdown-menu', parent).jScrollPane();
			app.developer('init', 'actions.scrollStylingSelect()', 'Инициализация scroll styling bootstrap.');
		}
	},
	// Search show (Header section)
	headerSearchTopToggle: function(){
		app.developer('init', 'actions.headerSearchTopToggle()', 'Инициализация show search panel (Header).');
		var parent = $('header'),
			search = $('.searsh-wrapper', parent),
			padding_size = $('.header-menu', parent).css('padding-left'),
			a = Number(padding_size.replace("px", ""));
			hide_elements = $('.header-menu, .header-section-search .header-button-search', parent),
			left_position = $('.header-menu', parent).offset().left + a,
			width_block = $('.header-menu', parent).outerWidth() + $('.header-section-search', parent).outerWidth() - a,
		hide_elements.animate({'opacity': 0}, 300, function() {
			search.width(width_block).show('slow').css('left', left_position);
			$('#search', search).focus();
		});

	},
	// Search close (Header section)
	closeSearchTopToggle: function(){
		app.developer('init', 'actions.closeSearchTopToggle()', 'Инициализация close search panel (Header).');
		var parent = $('header'),
			search = $('.searsh-wrapper', parent),
			hide_elements = $('.header-menu, .header-section-search .header-button-search', parent);
		search.hide('slow', function(){
			hide_elements.animate({'opacity': 1},200);
		});
	},
	// Добавление групы выпадающих меню
	addNewSelectGroupScience: function(obj){
		var wrapper = $('.science-select-wrapper'); // Wrapper for print result

		app.developer('init', 'click.addNewSelectGroupScience()', 'Добавление групы выпадающих меню.');
		// For add Post Page
		var index_select_addNew = 'science-',
			index_theme_select_addNew = 'science-theme-',
			last_empty_select,
			data_selects_addNew = { 'selected': '', 'selected_count': ''},
			addNew_ajax_url = '/ajax'+ window.location.pathname + '/directions_list';

		for (var i_ = 1; i_ < 6 ; i_++) {
			if($(document).find('#science-'+i_).length == 0){
				
				data_selects_addNew.selected_count = i_ - 1;
				last_empty_select = $(document).find('#science-'+(i_-1));

				setTimeout(function(){
					for (var i = 1; i < i_; i++) {
						data_selects_addNew.selected += (i) > 1 && $('select.selectpicker[name="'+index_select_addNew+i+'"]').val() !== '' ? ',' : '';
						data_selects_addNew.selected += $(document).find('select.selectpicker[name="'+index_select_addNew+i+'"]').val();
					}
				
					jAjax.set("URL", addNew_ajax_url).set("dataType", "json").set("type", "POST").load(
						data_selects_addNew,
						function(success){
							app.developer('!!! SUCCESS !!!', 'click.addNewSelectGroupScience()', 'Запрос ajax.');
							console.log(success);
							if(success.error == '') {
								htm = success.response_html;
								app.print_result(wrapper, htm, 'append');
								
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
								$('select.selectpicker').selectpicker();
							}else{
								$('.bootstrap-select > button' ,last_empty_select)
								.attr({"data-toggle": "tooltip", "data-placement": "right", "title": success.error})
								.tooltip('show');

								$(document).click(function(){
									$('.bootstrap-select > button' ,last_empty_select).tooltip('destroy');
									$('select.selectpicker').selectpicker();
								});
							}
						}
					);
				},500);
				break
			}
		}
	},
	addPostPagePatent: function(obj){
		var placeholder = $(obj).attr('data-placeholder'); 
			tmp = '<div class="input-group"><input class="form-control" type="text" name="paten-new" placeholder="'+placeholder+'"></div>',
			parent = '.patents-wrap';
		app.print_result(parent, tmp, 'append');
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

focus = {
	tagInputFocusClass: function(obj) {
		app.developer('init', 'focus.tagInputFocusClass()', 'Добавление класса focus.');
		$(obj).parents('.bootstrap-tagsinput').addClass('focus');
		app.focusOut(obj, 'tagInputRemoveFocusClass');
	},
	InputGroupFOCUS: function(obj){
		app.developer('init', 'focus.InputGroupFOCUS()', 'Добавление класса focus.');
		$(obj).parents('.input-group.gray-label').addClass('focus');
		app.focusOut(obj, 'InputGroupRemoveFOCUS');
	}
},

focusOut = {
	tagInputRemoveFocusClass: function(obj) {
		app.developer('init', 'focusOut.tagInputRemoveFocusClass()', 'Удаление класса focus.');
		$(obj).parents('.bootstrap-tagsinput').removeClass('focus');
	},
	InputGroupRemoveFOCUS: function(obj){
		app.developer('init', 'focusOut.InputGroupRemoveFOCUS()', 'Удаление класса focus.');
		$(obj).parents('.input-group.gray-label').removeClass('focus');
	}
},


// ++++++++++++++++++++++ SELECT SCIENCE > THEME FUNCTIONS +++++++++++++++++++++++++
select_science = {
	init: function(scince_parent, themes_parent) {
		app.developer('init', 'select_science.init()', 'Инициализация логики зависимостей выпадающих меню.');
		var ss_parent_scince = $(scince_parent), // parent scince block
			ss_parent_themes = $(themes_parent), // parent scince block
				ss_select_scince = $('select.selectpicker', ss_parent_scince), // Select
				ss_select_themes = $('select.selectpicker', ss_parent_themes), // Select	
			ss_val_scince = ss_select_scince.val(), // Selected result

			// ajax url
			ss_post_data = { flow: ss_val_scince } ,
			select_science_AJAX_URL = '/ajax'+ window.location.pathname + '/directions_list';

		jAjax.set("URL", select_science_AJAX_URL).set("dataType", "json").set("type", "POST").load(
			ss_post_data,
			function(success){
				app.developer('!!! SUCCESS !!!', 'select_science.init()', 'Запрос ajax.');
				console.log(success);
				// ------------ *success* ----------------
				if($.trim(success.response_html) == 'Collection is empty' || success.response_html == '' || success.hubs.length == 0){
					ss_select_themes.html('').attr('disabled', 'disabled').selectpicker('refresh');
				}else{
					ss_select_themes.html('');
					$.each(success.hubs, function(key, value) {
						ss_select_themes.append('<option value="'+key+'" data-tokens="'+value+'">'+value+'</option>');
					});
					ss_select_themes.removeAttr('disabled').selectpicker('refresh');
				}
				// ---------------------------------------
			}
		);
	}
}
// +++++++++++++++++++ *SELECT SCIENCE > THEME FUNCTIONS END* ++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++