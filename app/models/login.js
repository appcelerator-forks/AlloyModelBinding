
exports.definition = {
    config : {
        "columns": {
            "id":"TEXT PRIMARY KEY",
			"Email": "text",
			"Password": "text"
        },
        "URL": "http://api.randomuser.me/0.6/?seed=foobar", // always returns same user an randomuserme so we can use it for auth
        "debug": 1, //debug mode enabled
        "useStrictValidation":0, // validates each item if all columns are present
        "adapter" : {
            "type" : "sqlrest",
            "collection_name" : "login",
            "idAttribute" : "id",
            "db_name": "modelbinding"

            // optimise the amount of data transfer from remote server to app
            //"addModifedToUrl": true,
            //"lastModifiedColumn": "modified"
        },

        //optional
        "headers": { //your custom headers
        },

        // delete all models on fetch
        "deleteAllOnFetch": true,

        parentNode: function(data) {
          // Function to convert names to Title Case
          String.prototype.toProperCase = function () {
              return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
          };

          var persons = [];

          _.each(data.results, function(_entry) {
            var entry = {};

            entry.id = _entry.user.salt;

            entry.Email = _entry.user.email;
            entry.Password = _entry.user.password;

            persons.push(entry);
          });

          Ti.API.log("PERSON: " +JSON.stringify(persons));
          return persons;
        },

    },
    extendModel : function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection : function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
}
