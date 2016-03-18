var args = arguments[0] || {};

// onOpen of Window get API data by calling backbone fetch
function init() {
    Alloy.Collections.randomuserme.fetch();    
}

// get Id of row clicked, open a new window passing in Id
function rowClicked(e) {
    var id = e.source.rowId;
           
    var winPerson = Alloy.createController("person", {modelId: id}).getView();
    Alloy.Globals.tabScrollableView.open(winPerson);   
}

// Clean up when window closes to avoid memory issues 
function cleanup() {
    $.destroy();
}