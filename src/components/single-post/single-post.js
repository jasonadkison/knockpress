define(['knockout', 'text!./single-post.html'], function(ko, templateMarkup) {

	function SinglePost(params) {
		var self = this;
		this.title = ko.observable();
		this.content = ko.observable();
		this.status = ko.observable();

		this.refresh = function() {
			return $.getJSON('/api/posts/' + params.permalink, function(data) {
				self.title(data.title);
				self.content(data.content);
				self.status(data.status);
			});
		};

		this.refresh();
	}

	// This runs when the component is torn down. Put here any logic necessary to clean up,
	// for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
	SinglePost.prototype.dispose = function() {};

	return {
		viewModel: SinglePost,
		template: templateMarkup
	};

});