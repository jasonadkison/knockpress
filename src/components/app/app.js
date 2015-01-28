define(['knockout', 'text!./app.html'], function(ko, templateMarkup) {

	// the master view for our app
	function App(params) {
		var self = this;

		this.route = ko.observable();
		this.session = ko.observable();
		this.loadedOnce = ko.observable(false);
		this.isLoggedIn = ko.computed(function() {
			return (this.session() && this.session().email);
		}, this);

		// fires when the router's current route changes
		params.route.subscribe(function(route) {
			// sets the observable route to the current route from the router
			self.route(route);
		});

		// fires when the observable route changes
		this.route.subscribe(function(route) {
			// refresh session for current user from the server
			if (!self.loadedOnce() || self.isLoggedIn()) {
				self.loadSession();
			}

			self.loadedOnce(true);
		});

		// load the initial route
		this.route(params.route());
	}

	App.prototype.loadSession = function() {
		var self = this;
		return $.getJSON('/api/session')
			.done(function(session) {
				self.session(session);
			})
			.fail(function() {
				self.session({});
			});
	};

	// This runs when the component is torn down. Put here any logic necessary to clean up,
	// for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
	App.prototype.dispose = function() {};

	return {
		viewModel: App,
		template: templateMarkup
	};

});