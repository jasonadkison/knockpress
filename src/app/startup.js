define(['jquery', 'knockout', './router', 'bootstrap', 'knockout-projections'], function($, ko, router) {

  ko.components.register('app', { require: 'components/app/app' });
  ko.components.register('nav-bar', { require: 'components/nav-bar/nav-bar' });
  ko.components.register('home-page', { require: 'components/home-page/home' });

  // ... or for template-only components, you can just point to a .html file directly:
  ko.components.register('about-page', {
    template: { require: 'text!components/about-page/about.html' }
  });

  ko.components.register('posts-list', { require: 'components/posts-list/posts-list' });

  ko.components.register('single-post', { require: 'components/single-post/single-post' });

  ko.components.register('login-form', { require: 'components/login-form/login-form' });

  // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

  // Start the application
  ko.applyBindings({ route: router.currentRoute });
});
