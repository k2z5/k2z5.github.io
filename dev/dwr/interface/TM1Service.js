if (typeof dwr == 'undefined' || dwr.engine == undefined) throw new Error('You must include DWR engine before including this file');

(function() {
if (dwr.engine._getObject("TM1Service") == undefined) {
var p;

p = {};








p.loginServer = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'loginServer', arguments);
};





p.getNavigationTree = function(p0, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'getNavigationTree', arguments);
};







p.collapseNavigationTreeNode = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'collapseNavigationTreeNode', arguments);
};







p.loginWithTM1SessionId = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'loginWithTM1SessionId', arguments);
};






p.loginServerIntegrated = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'loginServerIntegrated', arguments);
};







p.deleteNavigationTreeNode = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'deleteNavigationTreeNode', arguments);
};





p.logout = function(p0, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'logout', arguments);
};






p.getServerSecurityMode = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'getServerSecurityMode', arguments);
};







p.loginServerWithSessionID = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'loginServerWithSessionID', arguments);
};






p.getTM1ServerInfo = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'getTM1ServerInfo', arguments);
};




p.getDateTimeFormats = function(callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'getDateTimeFormats', arguments);
};





p.listCubes = function(p0, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'listCubes', arguments);
};








p.newCubeViewWidget = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'newCubeViewWidget', arguments);
};






p.newCubeViewWidget = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'newCubeViewWidget', arguments);
};





p.getClientConfigSettings = function(p0, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'getClientConfigSettings', arguments);
};




p.getTM1WebConfigSettings = function(callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'getTM1WebConfigSettings', arguments);
};







p.loginServerCAM = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'loginServerCAM', arguments);
};





p.getServers = function(p0, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'getServers', arguments);
};








p.login = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'login', arguments);
};







p.login = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'login', arguments);
};










p.loginCubeViewWidgetTM1SessionId = function(p0, p1, p2, p3, p4, p5, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'loginCubeViewWidgetTM1SessionId', arguments);
};








p.loginCubeViewWidgetTM1SessionId = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'loginCubeViewWidgetTM1SessionId', arguments);
};




p.getDataSourceApiType = function(callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'getDataSourceApiType', arguments);
};




p.initializeHttpSession = function(callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'initializeHttpSession', arguments);
};





p.getSessionInfo = function(p0, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'getSessionInfo', arguments);
};








p.loginWebSheetWidgetCam = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'loginWebSheetWidgetCam', arguments);
};






p.listCubeViews = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'listCubeViews', arguments);
};





p.getTM1Servers = function(p0, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'getTM1Servers', arguments);
};






p.getServerCAMURLS = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'getServerCAMURLS', arguments);
};











p.loginCubeViewWidget = function(p0, p1, p2, p3, p4, p5, p6, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'loginCubeViewWidget', arguments);
};









p.loginCubeViewWidget = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'loginCubeViewWidget', arguments);
};









p.loginWebSheetWidget = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'loginWebSheetWidget', arguments);
};






p.newWebSheetWidget = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'newWebSheetWidget', arguments);
};







p.getUrlApiSessionInfo = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'getUrlApiSessionInfo', arguments);
};






p.getCubeViewObjectId = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'getCubeViewObjectId', arguments);
};






p.changePassword = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'changePassword', arguments);
};










p.loginCubeViewWidgetCam = function(p0, p1, p2, p3, p4, p5, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'loginCubeViewWidgetCam', arguments);
};








p.loginCubeViewWidgetCam = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'loginCubeViewWidgetCam', arguments);
};






p.refreshNavigationTree = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'refreshNavigationTree', arguments);
};







p.expandNavigationTreeNode = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'expandNavigationTreeNode', arguments);
};









p.loginWebSheetWidgetTM1SessionId = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'loginWebSheetWidgetTM1SessionId', arguments);
};







p.getTM1ObjectId = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'getTM1ObjectId', arguments);
};





p.getSessionInfoByObjectId = function(p0, callback) {
return dwr.engine._execute(p._path, 'TM1Service', 'getSessionInfoByObjectId', arguments);
};

dwr.engine._setObject("TM1Service", p);
}
})();

