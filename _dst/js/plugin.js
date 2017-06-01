var plugin = {
	calendarWidget: function(obj){
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

		calendar_events.init(obj, 'ru', dates);
		app.developer('init', 'plugin.calendarWidget()', 'Запрос массива дат.');
	},
},
// +++++++++++++++++++++++ CALENDAR EVENTS WIDGET FUNCTIONS ++++++++++++++++++++++++
calendar_events = {
	// http://zabuto.com
	init: function(obj, lang, date){
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
            action_nav: function () {
                return calendar_events.myNavFunction(this.id);
            },
			nav_icon: {
		        prev: '<i class="fa fa-chevron-circle-left"></i>',
		        next: '<i class="fa fa-chevron-circle-right"></i>'},
	    });
		app.developer('init', 'calendar_events.init()', 'Инициализация виджета календаря событий.');
	},
	myDateFunction: function(id) {
		// Событие при выборе дня
		var date = $("#" + id).data("date"),
			hasEvent = $("#" + id).data("hasEvent");
		app.developer('init', 'calendar_events.myDateFunction()', 'Событие выбора дня.');
	},
	myNavFunction: function(id) {
		// Событие при перелистывании месяца
		var nav = $("#" + id).data("navigation"),
			to = $("#" + id).data("to");
		app.developer('init', 'calendar_events.myNavFunction()', 'Событие перелистывания месяца.');
	}
},
// ++++++++++++++++++++ *CALENDAR EVENTS WIDGET FUNCTIONS END* +++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++ TINYMCE EDITOR FUNCTION INIT ++++++++++++++++++++++++++++
editor = { 
	init: function(
				selector,
				url_save,
				height = 325, 
				toolbar = 'bold italic underline | alignleft aligncenter alignright alignjustify | undo redo | link image ',
				css,
				menubar = false,
				plugins = 'image imagetools'
			){
		tinymce.init({
			selector: selector,
			height: height,
			menubar: menubar,
			plugins: [plugins],
			toolbar: toolbar,
			image_dimensions: false,
			relative_urls : false,
			remove_script_host : false,
			convert_urls : false,

			file_picker_types: 'image',
			images_upload_url: url_save,
			automatic_uploads: true,
			file_picker_callback: function(callback, value, meta) {
				
				document.getElementById('upload').click(callback);			
				if (meta.filetype == 'image') {
					$('#upload').on('change', function() {
						var file = this.files[0];
						var reader = new FileReader();

						console.log(file);
						console.log();
						
						// callback(file.name, {alt: file.type});

						reader.onload = function(e) {
							callback(e.target.result, {
								alt: ''
							});
						};
						reader.readAsDataURL(file);
					});	
				}
			},
			content_css: css
		});
		app.developer('init', 'editor.init()', 'Инициализация TINYMCE editor.');
	}
},
// ++++++++++++++++++++ *TINYMCE EDITOR FUNCTION INIT END* +++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++ jQuery UI AUTOCOMPLETE FUNCTIONS +++++++++++++++++++++++++
autocomplete = {
	init: function(selector, data, minLength = 2, appendTo){
		app.developer('init', 'autocomplete.init()', 'Инициализация jQuery autocomplete for $('+selector+').');
		$(selector).autocomplete({
	      source: data,
	      minLength: minLength,
	      appendTo: appendTo,
	    });
	},
	destroy: function(selector){
		app.developer('init', 'autocomplete.destroy()', 'Destroy jQuery autocomplete for $('+selector+').');
		$(selector).autocomplete( "destroy" );
	},
	change: function(selector, function_){
		app.developer('init', 'autocomplete.change()', 'Change jQuery autocomplete in $('+selector+').');
		$(selector).on( "autocompletechange", function( event, ui ) {function_;});
	}
},
// +++++++++++++++++++ *jQuery UI AUTOCOMPLETE FUNCTIONS END* ++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++ TAG INPUTS FUNCTIONS +++++++++++++++++++++++++++++++
taginputs = {
	init: function(selector, maxTags, source){
		app.developer('init', 'taginputs.init()', 'Инициализация Bootstrap taginputs.');
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
 datepicker = {
	init: function(obj){
		app.developer('init', 'datepicker.init()', 'Инициализация jQueray Datepiker.');
		var dp_local = $(obj).attr('datepicker-local') == '' || $(obj).attr('datepicker-local') == undefined ? 'en' : $(obj).attr('datepicker-local');
			format = $(obj).attr('datepicker-format') == '' || $(obj).attr('datepicker-format') == undefined ? "d MM yy" : $(obj).attr('datepicker-format'),
			value = $(obj).attr('datepicker-value') == '' || $(obj).attr('datepicker-value') == undefined ? false : $(obj).attr('datepicker-value');
		console.log(value);
		if(value !== '' && value !== undefined && value){
			value_result = value.split('.');
			value = new Date(value_result[1]+'.'+value_result[0]+'.'+value_result[2]);
		}

		$(obj).datepicker({
			regional: dp_local,
			dateFormat: format,
			showOtherMonths: true,
			selectOtherMonths: true,
			// minDate: "+ 1m",
		});
		if(value){ 
			$(obj).datepicker("setDate", value);
		}
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
		app.developer('init', 'datetimepicker.init()', 'Инициализация jQueray Date and time piker.');
		var dp_local = $(obj).attr('datetimepicker-local') == '' || $(obj).attr('datetimepicker-local') == undefined ? 'en' : $(obj).attr('datetimepicker-local'),
			format = $(obj).attr('datetimepicker-format') == '' || $(obj).attr('datetimepicker-format') == undefined ? 'yyyy M dd в hh:ii' : $(obj).attr('datetimepicker-format'),
			value = $(obj).val(),
			initDate = value == '' || value == undefined ? '' : new Date(value);
			
			if(initDate !== ''){
				value = value.split('-');
				month = $.fn.datetimepicker.dates[dp_local]['monthsShort'][parseInt(value[1])];
				var result_value = '';
				for (var i = 0; i < value.length; i++) {
					result_value += i !== 0 ? ' ' : '';
					result_value += i !== 1 ? (i == 2 ? value[i].replace(' ', ' в ') : value[i]) : month;
				}
				$(obj).val(result_value);
			}

		$.fn.datetimepicker.dates;
		$(obj).datetimepicker({
			initialDate: initDate,
			format: format,
			autoclose: true,
			startDate: null,
			DaysOfWeekDisabled: [0,6],
			language: dp_local,
		}
		);
	},
	show: function(obj) {
		$(obj).datetimepicker( "show" );
	}
},
googleMap = {
	init(obj, uluru) {
		app.developer('init', 'googleMap.init()', 'Инициализация GoogleMap.');
        var	id = $(obj).attr('id');

        var map = new google.maps.Map(document.getElementById(id), {
          zoom: 16,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
    },
    codeAddress: function(id, value){
		app.developer('init', 'googleMap.codeAddress()', 'Инициализация GoogleMap по адресу.');
    	var map,
    		geocoder = new google.maps.Geocoder(),
    		address = value;

    	var myOptions = {
                zoom: 16,
                center: latlng
            }

    	var latlng = new google.maps.LatLng(0, 0);
    	map = new google.maps.Map(document.getElementById(id), myOptions);

    	if (geocoder) {
            geocoder.geocode({
                'address': address
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
        			if (status == google.maps.GeocoderStatus.OK) {
                        if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                            map.setCenter(results[0].geometry.location);
 
                            var infowindow = new google.maps.InfoWindow({
                                content: '<b>' + address + '</b>',
                                size: new google.maps.Size(150, 50)
                            });
                            var marker = new google.maps.Marker({
                                position: results[0].geometry.location,
                                map: map,
                                title: address
                            });
                            google.maps.event.addListener(marker, 'click', function() {
                                infowindow.open(map, marker);
                            });
                        } else {
                            alert("No results found");
                        }
                    } else {
                        alert("Geocode was not successful for the following reason: " + status);
                    }
                }
            });
        }
 	}

}