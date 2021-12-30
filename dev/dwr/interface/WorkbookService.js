if (typeof dwr == 'undefined' || dwr.engine == undefined) throw new Error('You must include DWR engine before including this file');

(function() {
if (dwr.engine._getObject("WorkbookService") == undefined) {
var p;

p = {};





p.resetData = function(p0, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'resetData', arguments);
};









p.setListBoxSelectedIndices = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'setListBoxSelectedIndices', arguments);
};








p.setActiveWorksheet = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'setActiveWorksheet', arguments);
};









p.resetData = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'resetData', arguments);
};









p.setCheckBoxChecked = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'setCheckBoxChecked', arguments);
};






p.setTitleDimensionElements = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'setTitleDimensionElements', arguments);
};









p.autoFitColumns = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'autoFitColumns', arguments);
};







p.getObjectId = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'getObjectId', arguments);
};











p.hold = function(p0, p1, p2, p3, p4, p5, p6, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'hold', arguments);
};









p.setTextBoxText = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'setTextBoxText', arguments);
};








p.getRange = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'getRange', arguments);
};









p.getActionButtonProcessConfirmation = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'getActionButtonProcessConfirmation', arguments);
};








p.resizeColumns = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'resizeColumns', arguments);
};







p.getCellAnnotations = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'getCellAnnotations', arguments);
};









p.getCellAnnotations = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'getCellAnnotations', arguments);
};









p.executeActionButton = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'executeActionButton', arguments);
};







p.getMetadata = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'getMetadata', arguments);
};







p.setSubsets = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'setSubsets', arguments);
};








p.getDrillView = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'getDrillView', arguments);
};










p.getDrillView = function(p0, p1, p2, p3, p4, p5, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'getDrillView', arguments);
};






p.setSettings = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'setSettings', arguments);
};









p.rebuildWorkbook = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'rebuildWorkbook', arguments);
};










p.deleteFromSelectedArea = function(p0, p1, p2, p3, p4, p5, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'deleteFromSelectedArea', arguments);
};









p.getValidationList = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'getValidationList', arguments);
};









p.getValidation = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'getValidation', arguments);
};









p.setControlScrollTop = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'setControlScrollTop', arguments);
};











p.paste = function(p0, p1, p2, p3, p4, p5, p6, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'paste', arguments);
};









p.setComboBoxSelectedValue = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'setComboBoxSelectedValue', arguments);
};









p.rebuildWorksheet = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'rebuildWorksheet', arguments);
};









p.setComboBoxSelectedIndex = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'setComboBoxSelectedIndex', arguments);
};












p.relativeSpread = function(p0, p1, p2, p3, p4, p5, p6, p7, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'relativeSpread', arguments);
};






p.getTitleDimensionInfo = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'getTitleDimensionInfo', arguments);
};








p.copy = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'copy', arguments);
};






p.close = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'close', arguments);
};









p.recalculate = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'recalculate', arguments);
};








p.getData = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'getData', arguments);
};









p.setRowHeight = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'setRowHeight', arguments);
};










p.getRefCellDimensionData = function(p0, p1, p2, p3, p4, p5, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'getRefCellDimensionData', arguments);
};





p.getWidgetSessionInfo = function(p0, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'getWidgetSessionInfo', arguments);
};









p.getPicklist = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'getPicklist', arguments);
};








p.refresh = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'refresh', arguments);
};













p.toggle = function(p0, p1, p2, p3, p4, p5, p6, p7, p8, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'toggle', arguments);
};








p.addCellAnnotation = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'addCellAnnotation', arguments);
};








p.executeChartDrill = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'executeChartDrill', arguments);
};












p.addCellAnnotation = function(p0, p1, p2, p3, p4, p5, p6, p7, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'addCellAnnotation', arguments);
};











p.spread = function(p0, p1, p2, p3, p4, p5, p6, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'spread', arguments);
};










p.getCubes = function(p0, p1, p2, p3, p4, p5, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'getCubes', arguments);
};





p.getState = function(p0, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'getState', arguments);
};












p.getRefCellValue = function(p0, p1, p2, p3, p4, p5, p6, p7, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'getRefCellValue', arguments);
};








p.setValue = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'setValue', arguments);
};








p.setOptionButtonChecked = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'setOptionButtonChecked', arguments);
};






p.open = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'WorkbookService', 'open', arguments);
};

dwr.engine._setObject("WorkbookService", p);
}
})();

