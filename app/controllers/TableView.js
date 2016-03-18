var args = arguments[0] || {};

// onOpen of Window get API data by calling refresh
function init() {
    $.ptr.refresh();
}

// onRefresh make API call using Alloy Model via Backbone fetch
function myRefresher(e) {
    Alloy.Collections.randomuserme.fetch({
        success: e.hide,
        error: e.hide
    });
}

// get Id of row clicked, open a new window passing in Id
function rowClicked(e) {
    var id = e.rowData.rowId;
    var winPerson = Alloy.createController("person", {modelId: id}).getView();
    Alloy.Globals.tabTableView.open(winPerson);         
}

// Clean up when window closes to avoid memory issues
function cleanup() {
    $.destroy();
}


