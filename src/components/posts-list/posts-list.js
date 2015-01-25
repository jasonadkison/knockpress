define(['knockout', 'text!./posts-list.html'], function(ko, templateMarkup) {

	function PostsList(params) {
		this.posts = ko.observableArray();

		this.refresh = function() {
			return $.getJSON('/api/posts', this.posts);
		};

		this.refresh();
	}

	// This runs when the component is torn down. Put here any logic necessary to clean up,
	// for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
	PostsList.prototype.dispose = function() {};

	return {
		viewModel: PostsList,
		template: templateMarkup
	};

});