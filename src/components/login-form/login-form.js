define(['knockout', 'text!./login-form.html'], function(ko, templateMarkup) {

	function LoginForm(params) {
		var self = this;

		this.route = ko.observable();
		this.errorMessage = ko.observable();

		// fires when the router's current route changes
		params.route.subscribe(function(route) {
			// sets the observable route to the current route from the router
			self.route(route);
		});

		// fires when the observable route changes
		this.route.subscribe(function(route) {
			// preserve the route in localStorage to restore it after successful login
			localStorage.setItem('preLoginRoute', ko.toJSON(route));
		});

		this.route(params.route());
	}

	LoginForm.prototype.submit = function(form) {
		var self = this;
		$.post('/login', $(form).serialize())
			.then(function(response) {
				window.location.reload();
			}, function(response) {
				self.errorMessage("Invalid login attempt.");
			});
	};

	// This runs when the component is torn down. Put here any logic necessary to clean up,
	// for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
	LoginForm.prototype.dispose = function() {};

	return {
		viewModel: LoginForm,
		template: templateMarkup
	};

});