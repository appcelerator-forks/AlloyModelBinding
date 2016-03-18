exports.definition = {
    config: {
        columns: {
            "email": "TEXT",
            "password": "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "loginvalidation",
            "db_name": "modelbinding"
        }
    },
    extendModel: function (Model) {
        _.extend(Model.prototype, {
            // extended functions and properties go here
            validate: function (attributes, options) {
                // shamelessly stolen from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
                function validateEmail(email) {
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(email);
                }

                for (var key in attributes) {
                    var value = attributes[key];

                    if (key === "email") {
                        if (value.length > 0) {
                            if (!validateEmail(value)) {
                                return "Invalid email";
                            }
                        } else {
                            return "No email address entered";
                        }
                    }

                    if (key === "password") {
                        if (value.length <= 0) {
                            return "No password entered";
                        }

                        if (value.length <= 5) {
                            return "Password too short, must be greater than 5 characters";
                        }
                    }
                }

                return; // return nothing for success
            }
        });

        return Model;
    },
    extendCollection: function (Collection) {
        _.extend(Collection.prototype, {
            // extended functions and properties go here
        });

        return Collection;
    }
};
