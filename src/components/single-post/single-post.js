define(['knockout', 'knockout-mapping', 'text!./single-post.html'], function(ko, kom, templateMarkup) {

	function SinglePost(params) {
		var self = this;
		this.permalink = ko.observable();
		this.title = ko.observable();
		this.content = ko.observable();
		this.status = ko.observable();
		this.isEditing = ko.observable(false);

		this.refresh = function() {
			return $.getJSON('/api/posts/' + params.permalink, function(data) {
				kom.fromJS(data, {}, self);
			});
		};

		this.toggleEditMode = function() {
			this.isEditing(!this.isEditing());
		};

		this.saveEditor = function(el) {
			$.ajax({
				url: '/api/posts/' + self.permalink(),
				data: kom.toJS(self),
				method: 'PUT'
			})
				.then(function(res) {
					self.isEditing(false);
				}, function(res) {
					debugger;
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