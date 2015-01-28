define(['knockout', 'text!./login-form.html'], function(ko, templateMarkup) {

  function LoginForm(params) {
    
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  LoginForm.prototype.dispose = function() { };
  
  return { viewModel: LoginForm, template: templateMarkup };

});
