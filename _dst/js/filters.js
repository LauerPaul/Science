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

	// if(log_status){
	// 	console.log('on change событие - #science filter');
	// }

	jAjax.set("URL", ajax_url).set("dataType", "json").set("type", "GET").load(function(success){
		// if(log_status){
		// 	console.log('Успешный запрос ajax (filter science)');
		// 	console.log(success);
		// }
		// ------------ *success* ----------------
		if($.trim(success.response_html) == 'Collection is empty' || success.response_html == ''){
			// if(log_status){ console.log(success.response_html);}
			themes_select.html('');
			$('#science-themes select.selectpicker').attr('disabled', 'disabled').selectpicker('refresh');
		}else{
			themes_select.html('');
			$.each(success.hubs, function(key, value) {
				themes_select.append('<option value="'+key+'" data-tokens="'+value+'">'+value+'</option>');
			});
			$('#science-themes select.selectpicker').removeAttr('disabled').selectpicker('refresh');
		}
		app.print_result(wrapper_result, success.response_html);
		app.setLocation(ajax_url);
		// ---------------------------------------
	});
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

		// if(log_status){
		// 	console.log('on change событие - #science-themes filter');
		// 	console.log(ajax_url);
		// }

		jAjax.set("URL", ajax_url).set("dataType", "json").set("type", "GET").load(function(success){
			// if(log_status){
			// 	console.log('Успешный запрос ajax (filter science-themes)');
			// 	console.log(success);
			// }
			// ------------ *success* ----------------
			app.print_result(wrapper_result, success.response_html);
			app.setLocation(ajax_url);
			// ---------------------------------------
		});
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

		// if(log_status){
		// 	console.log('on change событие - #types filter');
		// }

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
		// if(log_status){
		// 	console.log(ajax_url);
		// }
	
	jAjax.set("URL", ajax_url).set("dataType", "json").set("type", "GET").load(function(success){
		// if(log_status){
		// 	console.log('Успешный запрос ajax (filter types)');
		// 	console.log(success);
		// }
		// ------------ *success* ----------------
		app.print_result(wrapper_result, success.response_html);
		app.setLocation(ajax_url);
		// ---------------------------------------
	});
});
// open dropdown menu of types action
$(document).on('show.bs.select', '.select-parent#types .bootstrap-select', function(e){
	var parent = $('.select-parent#types'), // parent block
		select = $('select.selectpicker', parent); // $('select')

		// if(log_status){
		// 	console.log('on show событие - #types filter');
		// }

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
var filters = {
	init: function(){
		var id_science = $('#science'),
			id_science_themes = $('#science-theme'),
			id_type_publication = $('#types');

		// if(log_status){
		// 	console.log('filters refresh by url (_filters.init()_)');
		// }

		if(window.location.pathname !== '' && window.location.pathname !== '/' && id_science.length > 0){
			var links_url_split = window.location.pathname.split('/'),
				array_filters = {flows: false, hub: false, type: false},
				tmp_array;
			
			links_url_split.forEach( function(element, index) {
				if(element == 'flows' || element == 'hub' || element == 'type' || element == 'types'){
					tmp_array = (links_url_split[index + 1]).split(',');
					if(element == 'flows'){
						array_filters.flows = tmp_array;
					}else if(element == 'hub'){
						array_filters.hub = tmp_array;
					}else if(element == 'type' || element == 'types'){
						array_filters.type = tmp_array;
					}
				}
			});
			filters.refresh(array_filters);
		}
	},
	refresh: function(array_filters){
		var parent_s_types = $('.select-parent#types'),
			parent_s_themes = $('.select-parent#sciencet-hemes'),
			parent_s_science = $('.select-parent#science'),
			select_,
			aj_url;

		// if(array_filters.flows){
		// 	select_ = $('select.selectpicker', parent_s_science);

		// 	if(log_status){
		// 		console.log('Поиск выбранного элемента фильтрации в science');
		// 	}

		// 	array_filters.flows.forEach( function(element) {
		// 		if(select_.find('option[value="'+element+'"]')){

		// 			if(log_status){
		// 				console.log('Выбранный элемент фильтрации в science найден!');
		// 			}

		// 			$('option', select_).removeAttr('selected');
		// 			select_.find('option[value="'+element+'"]').attr('selected', 'selected');
		// 			select_.selectpicker('refresh');
		// 			console.log(window.location.pathname);

		// 			aj_url = select_.attr('data-url')+element;
		// 			console.log(aj_url);

		// 			jAjax.set("URL", aj_url).set("dataType", "json").set("type", "GET").load(function(success){
		// 				if(log_status){
		// 					console.log('Успешный запрос ajax (filter science)');
		// 					console.log(success);
		// 				}
		// 				// ------------ *success* ----------------
		// 				select_.html('');
		// 				$.each(success.hubs, function(key, value) {
		// 					$('select.selectpicker', select_).append(
		// 						'<option value="'+key+'" data-tokens="'+value+'">'+value+'</option>'
		// 					);
		// 				});
		// 				$('#science-themes select.selectpicker').removeAttr('disabled').selectpicker('refresh');
		// 				if(log_status){
		// 					console.log('Список тем загружен в фильтр science-themes');
		// 				}
		// 				// ---------------------------------------
		// 			});
		// 			return false
		// 		}
		// 	});
		// }
		if(array_filters.hub){
			select_ = $('select.selectpicker', parent_s_themes);

			// if(log_status){
			// 	console.log('Поиск выбранного элемента фильтрации в science-themes');
			// }

			select_.removeAttr('disabled').selectpicker('refresh');
		}
		if(array_filters.type){
			select_ = $('select.selectpicker', parent_s_types);

			if(array_filters.type.length == 1 && array_filters.type[0] == 'all'){
				console.log('test');
			}
		}
	}
}