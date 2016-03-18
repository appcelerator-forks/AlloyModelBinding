## Appcelerator Titanium Alloy Model Databinding Sample Project

This ReadMe and sample app are from a presentation on Alloy Model Binding with Appcelerator Titanium

* http://appcelerator.com
* http://github.com/appcelerator/alloy

App to demo Alloy Model Validation & Binding
* Using RandomUserMe API http://randomuser.me 
* Login Form + Validation
* TableView Collection Binding
* ListView Collection Binding
* ScrollableView Collection Binding
* Filter collection to single user with details view

### Alloy Model + Binding

#### Why Alloy Model Data Binding?
* Consistent approach to data across projects
* Allows for Separation of Concerns
* Less code 
* Light Controllers
* Light Views
* Keep styling in TSS stylesheets
* Easier for ‘front-end’ designers to collaborate with developers to build out UI
* Alloy Model + Binding

Alloy relies on the Backbone API to sync model data to persistent storage
Alloy Models inherit from the Backbone.Model class

_Backbone  gives_:

* Structure to apps by providing Models with key-value binding and custom events
* Collections with a rich API of enumerable functions
* Connects it all to your existing API over a RESTful JSON interface.

_Titanium Alloy Backbone Support_:

Alloy been stuck on 0.9.2 for a LONG time which been an issue for some advanced scenarios when needed full Backbone API

Alloy 1.6.0 (Ti SDK 4.0.0) introduced support for Backbone 1.1.2
However, due to breaking changes 0.9.2 is still default, need to change config.json to usehttp://docs.appcelerator.com/platform/latest/#!/guide/Alloy_Backbone_Migration 


#### Models need a Sync Adapter
A sync adapter allows you to store and load your models to a persistent storage device, such as an on-device database or remote server

Alloy has two in-build adapters:

* sql for a SQLite database on the Android and iOS platform
* properties for storing data locally in the Titanium SDK context

You can also write your own adapter:
* Rest API Adapter by Mads Møller - https://github.com/viezel/napp.alloy.adapter.restapi 
* Rest SQL Adapter by Mads Møller - https://github.com/viezel/napp.alloy.adapter.restsql
* ACS Adapter by Aaron Saunders - https://github.com/aaronksaunders/Appcelerator-Cloud-Services-Sync-Adapter 

For more information on adapters see:
http://docs.appcelerator.com/platform/latest/#!/guide/Alloy_Sync_Adapters_and_Migrations

#### Alloy Model
Model file has three objects: 
* Config -  defines table schema and adapter info
  e.g. database columns, API endpoint, set headers
  Two functions can extend / override 
* extendModel e.g. for local validation
* extendCollectione.g. for sorting

##### Model Definition File

```javascript
exports.definition ={  
   config:{  
      // table schema and adapter information
   },
   extendModel:function (Model)   {  
      _.extend(Model.prototype,
      {  
         // Extended,
         override or implement Backbone.Model
      }      );        return Model;
   },
   extendCollection:function (Collection)   {  
      _.extend(Collection.prototype,
      {  
         // Extended,
         override or implement Backbone.Collection
      }      );        return Collection;
   }   
};
```

##### controller.js File
Create model file for local validation

```javascript
var model = Alloy.createModel("loginValidation");
When login button pressed use Backbone Events
   model.set({  
   email:$.txtEmail.value,
   password:$.txtPassword.value
});

   model.on("error",
function(model,
error){  
   alert(error);
});
   model.on("change",
function(model){  
   loginUser();
});
```

##### Using a Model for Local Validation
Use Alloy model files to Validate things such as:
* empty form values
* valid email address
* password length / complexity

loginValidation.js Model File (simplified)


```javascript
exports.definition = {
  extendModel: function (Model) {
    _.extend(Model.prototype, {
      // extended functions and properties go here            
      validate: function (attributes,
        options) {
        for (var key in attributes) {
          var value = attributes[
            key
          ];
          if (key === "email") {
            if (value.length > 0) {
              if (!validateEmail(value)) {
                return "Invalid email";
              }
            } else {
              return "No email address entered";
            }
          }
        }
        return; // return nothing for success
      }
    });
    return Model;
  }
};
```

randomuserme.js Model File (sqlrest adapter)
```javascript
config: {
  "columns": {
    "id": "TEXT PRIMARY KEY",
    "Title": "text",
    "Firstname": "text",
    "Lastname": "text",
    "ProfilePhoto": "text",
    "Email": "text",
    "Password": "text"
  },
  "URL": "http://api.randomuser.me/?results=20",
  "adapter": {
    "type": "sqlrest",
    "collection_name": "randomuserme",
    "idAttribute": "id"
  }
}
```


randomuserme.js Model File (sqlrest adapter)		

```javascript
parentNode: function (data) {
  var persons = [];
  _.each(data.results, function (_entry) {
    var entry = {};
    entry.id = _entry.user.registered;
    entry.Title = _entry.user.name.title;
    entry.Firstname = _entry.user.name.first;
    entry.Lastname = _entry.user.name.last;
    entry.fullName = entry.Firstname + ”“ +entry.Lastname;
    entry.ProfilePhoto = _entry.user.picture.large;
    entry.Email = _entry.user.email;
    entry.Password = _entry.user.password;
    persons.push(entry);
  });
  return persons;
}
```

randomuserme.json
```javascript
results: [{
  user: {
    gender: "female",
    name: {
      title: "ms",
      first: "andrea",
      last: "moore"
    },
    location: {
      street: "2394 park lane",
      city: "coventry",
      state: "durham",
      postcode: "YQ2 5WY"
    },
    email: "andrea.moore21@example.com",
    username: "tinycat608",
    password: "nimbus",
    salt: "0Obk9i1e",
    md5: "3bcfe5d97cf834b0e8fd99bdea5070a1",
    sha1: "ab006d402cecc426015edc06547a51b6def14ba5",
    sha256: "73bbcc45cc71be415811f5a5ca41e7f2eaac51459d0507d802b38929f8d6c5d5",
    registered: "1276110521",
    dob: "481999452",
    phone: "013873 47234",
    cell: "0701-904-609",
    NINO: "SA 16 70 18 G",
    picture: {
      large: "http://api.randomuser.me/portraits/women/44.jpg",
      medium: "http://api.randomuser.me/portraits/med/women/44.jpg",
      thumbnail: "http://api.randomuser.me/portraits/thumb/women/44.jpg"
    },
    version: "0.6",
    nationality: "GB"
  },
  seed: "applification"
}]
```

##### View
```xml
<Collection src="randomuserme" />

<TableView dataCollection="randomuserme">

<TableViewRow onClick="rowClicked" rowId="{id}">     
  <View layout="horizontal">                             
    <ImageView image="{ProfilePhoto}"/>           
    <Label text="{Firstname} {Lastname}"/>                     
  </View>
</TableViewRow>
```


##### Controller
```javascript
// Backbone fetch on Model
  Alloy.Collections.randomuserme.fetch();

// Clean up when window closes to avoid memory issuesfunction cleanup() {    $.destroy();}
```

#### Filter a Collection
TableView View XML
Add Id to row via binding
```xml
<TableViewRow onClick="rowClicked" rowId="{id}">
```

TableView ControllerPass Id to new Window
```javascript
// get Id of row clicked, open a new window passing in Id
function rowClicked(e) {
  var id = e.rowData.rowId;
  var winPerson = Alloy.createController("person", {
    modelId: id
  }).getView();
  Alloy.Globals.tabTableView.open(winPerson);
}
Person Controller
Filter collection by Id
// Filter collection by Id passed over using Backbone         
var person = Alloy.Collections.randomuserme.where({
  id: args.modelId
});
```

#### Bonus Feature - Pull to Refresh
_Add Refresh Widget_
```xml
<Widget id="ptr" src="nl.fokkezb.pullToRefresh" onRelease="myRefresher">
```

_TableView Controller_
Make onRelease function do Backbone Fetch
```javascript
// onRefresh make API call using Alloy Model via Backbone fetch
function myRefresher(e) {
  Alloy.Collections.randomuserme.fetch({
    success: e.hide,
    error: e.hide
  });
}
```

onOpen of Window refresh Widget to set intial set of data
```javascript
// onOpen of Window get API data by calling refresh
function init() {
  $.ptr.refresh();
}
```

#### Migrations
Migration are a description of incremental changes to a database, which takes your database from version 1 to version x. 
e.g. offline cache, do need to take this into account

#### Resources
https://bitbucket.org/applification/alloymodelbinding 
http://docs.appcelerator.com/platform/latest/#!/guide/Alloy_Models 
https://github.com/appcelerator/alloy/tree/master/test/apps/models
