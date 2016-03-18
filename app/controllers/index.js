// Local validation of login form data using Alloy Model
function validateLogin(e) {
	var model = Alloy.createModel("loginvalidation");

	// If validation errors, display to user
	model.on("error", function(model, error) {
		alert(error);
	});

	// If validation success, login user
	model.on("change", function(model) // on success
	{
		loginUser(); // Attempt to login the user with validated credentials
	});

	// Set model data based on form values
	model.set({
		email : $.txtEmail.value,
		password : $.txtPassword.value
	});

}

// login User function
function loginUser() {
	var user = Alloy.Collections.login.fetch({
		urlparams: {
			// could pass in seed here if preferred e.g.
			// seed: 'applification'
		},
		success: function(collection) {
			var usr = JSON.stringify(collection);
			usr = JSON.parse(usr);
			usr = usr[0];
			Ti.API.log('user: ' +usr);
			if(usr.Email === $.txtEmail.value && usr.Password === $.txtPassword.value) {
				openTabGroup();
			} else {
        // NB: bypassed as seed stopped working on RandomUser API
        // https://randomuser.me/documentation
				//alert('Invalid credentials');
        openTabGroup();
			}
		},
		error: function() {
			alert('error');
		}
	});

}

// open Tab Group function
function openTabGroup() {
	var tabGroup = Alloy.createController("tabgroup").getView();
	tabGroup.open();
}

$.index.open();
