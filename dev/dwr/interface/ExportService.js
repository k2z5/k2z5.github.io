if (typeof dwr == 'undefined' || dwr.engine == undefined) throw new Error('You must include DWR engine before including this file');

(function() {
if (dwr.engine._getObject("ExportService") == undefined) {
var p;

p = {};





p.getCubeViewExportInfo = function(p0, callback) {
return dwr.engine._execute(p._path, 'ExportService', 'getCubeViewExportInfo', arguments);
};









p.doWebSheetExport = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'ExportService', 'doWebSheetExport', arguments);
};





p.getExportStatus = function(p0, callback) {
return dwr.engine._execute(p._path, 'ExportService', 'getExportStatus', arguments);
};





p.cancelExport = function(p0, callback) {
return dwr.engine._execute(p._path, 'ExportService', 'cancelExport', arguments);
};





p.getWebSheetExportInfo = function(p0, callback) {
return dwr.engine._execute(p._path, 'ExportService', 'getWebSheetExportInfo', arguments);
};








p.doCubeViewExport = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'ExportService', 'doCubeViewExport', arguments);
};







p.doRelationalExport = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'ExportService', 'doRelationalExport', arguments);
};

dwr.engine._setObject("ExportService", p);
}
})();

