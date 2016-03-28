

// configure the special accounts user interface
// by setting up some extra fields and specifying constraints
// see:https://github.com/ianmartorell/meteor-accounts-ui-bootstrap-3/    
Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'username',
        fieldLabel: 'Username',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Please write your username");
            return false;
          } else {
            return true;
          }
        }
    }]
});

