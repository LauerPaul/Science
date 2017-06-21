$(document).ready(function(){
	Auth.init();
	$("#test").on("click", function(){
		var url = $(this).attr("href");
		console.log("Test: url = " + url);
		//jAjax.URL = url;
		//jAjax.load({"a":"aaa","b":"bbb"}, Auth.ptest);
		//console.log(jAjax.set('URL22', url));
		jAjax.set("URL", url).set("dataType", "html").load("#testdata", ".www", Auth.ptest);
		return false;
	});
});
var Auth = {
	init : function(){
		var modal_sm = $('#modal-sm');	
		
		// SEND AUTH FORM 
		$(document).on("submit", "form.auth-form", function(event){
			event.preventDefault();
			event.stopPropagation();
			var url = $(this).attr("action");
			jAjax.URL = url;
			if($(this).hasClass('registration')){
				jAjax.load(".auth-form", "#modal-sm .modal-content");
			}else{
				jAjax.load(".auth-form", "#modal-sm .modal-content", Auth.auth_succsses);
			}
			return false;
		});
		
		// MODALS AUTH AND RECOVERY SHOW
		$(document).on('click', '.modal-show', function(event) {
			event.preventDefault();

			var url = $(this).attr("href");
			$('.modal-content', modal_sm).load(url, function(){
				modal_sm.modal('show');
			});
			return false;
		});
	
		this.init_events();
	},
	
	init_events : function(){
		
	},
	// AUTH SAUCCSSES
	auth_succsses: function(data){
		$('#modal-sm').modal('hide');
		location.reload();
	}, 
	
	ptest : function(data){
		console.log("Callback");
		console.log(data);
	},
	
	
};