var args = arguments[0] || {};

// Put Tabs in Global namespace so we can add sub windows to each tab group
Alloy.Globals.tabTableView = $.tabTableView;
Alloy.Globals.tabListView = $.tabListView;
Alloy.Globals.tabScrollableView = $.tabScrollableView;