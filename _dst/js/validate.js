var validate = {
	registration: function(obj) {
		obj.validate(
			{
				debug: true,
				submitHandler: function() {

				},
				 invalidHandler: function(validator) {
					// 'this' refers to the form
					var errors = validator.numberOfInvalids();
					if (errors) {
						var message = errors == 1
						? 'You missed 1 field. It has been highlighted'
						: 'You missed ' + errors + ' fields. They have been highlighted';
						$("div.error span").html(message);
						$("div.error").show();
					} else {
						$("div.error").hide();
					}
				},
				rules: {
				    // simple rule, converted to {required:true}
				    name: "required",
				    // compound rule
				    email: {
				      required: true,
				      email: true
				    }
				  }
			}
		);
		console.log('test');
	}
}

$('#modal-sm-registration form button').click(validate.registration($(this)));
