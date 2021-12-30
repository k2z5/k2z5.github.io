if (typeof dwr == 'undefined' || dwr.engine == undefined) throw new Error('You must include DWR engine before including this file');

(function() {
if (dwr.engine._getObject("WebSheetService") == undefined) {
var p;

p = {};





p.resetData = function(p0, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'resetData', arguments);
};







p.setListBoxSelectedIndices = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'setListBoxSelectedIndices', arguments);
};







p.getCellInfo = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'getCellInfo', arguments);
};







p.setCheckBoxChecked = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'setCheckBoxChecked', arguments);
};





p.getDimensionNames = function(p0, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'getDimensionNames', arguments);
};







p.selectAllToCorner = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'selectAllToCorner', arguments);
};






p.setTitleDimensionElements = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'setTitleDimensionElements', arguments);
};







p.setCellsDynamicallyMerged = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'setCellsDynamicallyMerged', arguments);
};






p.hold = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'hold', arguments);
};







p.getGridSize = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'getGridSize', arguments);
};







p.setTextBoxText = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'setTextBoxText', arguments);
};







p.getPickList = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'getPickList', arguments);
};







p.startDragSelect = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'startDragSelect', arguments);
};







p.getSelectArea = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'getSelectArea', arguments);
};








p.scrollWebSheet = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'scrollWebSheet', arguments);
};








p.getCubeNames = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'getCubeNames', arguments);
};







p.getCellAnnotations = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'getCellAnnotations', arguments);
};






p.executeActionButton = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'executeActionButton', arguments);
};







p.dataSpread2 = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'dataSpread2', arguments);
};








p.dataSpread1 = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'dataSpread1', arguments);
};





p.rebuildCurrentSheet = function(p0, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'rebuildCurrentSheet', arguments);
};








p.getEdgeCell = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'getEdgeCell', arguments);
};





p.saveData = function(p0, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'saveData', arguments);
};








p.getDrillView = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'getDrillView', arguments);
};





p.getCssFilePath = function(p0, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'getCssFilePath', arguments);
};






p.setSettings = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'setSettings', arguments);
};





p.deleteFromSelectedArea = function(p0, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'deleteFromSelectedArea', arguments);
};






p.setSelection = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'setSelection', arguments);
};






p.switchSheet = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'switchSheet', arguments);
};






p.selectRange = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'selectRange', arguments);
};





p.dispose = function(p0, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'dispose', arguments);
};





p.getSheetNames = function(p0, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'getSheetNames', arguments);
};







p.sendPageSize = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'sendPageSize', arguments);
};






p.pasteIntoSelectedArea = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'pasteIntoSelectedArea', arguments);
};







p.getHyperlinkWorkbookObjectId = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'getHyperlinkWorkbookObjectId', arguments);
};







p.getValidationList = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'getValidationList', arguments);
};







p.getValidation = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'getValidation', arguments);
};





p.rebuildCurrentWorkbook = function(p0, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'rebuildCurrentWorkbook', arguments);
};







p.setColumnWidth = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'setColumnWidth', arguments);
};







p.setComboBoxSelectedValue = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'setComboBoxSelectedValue', arguments);
};







p.setComboBoxSelectedIndex = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'setComboBoxSelectedIndex', arguments);
};






p.getActionButtonConfirmMessage = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'getActionButtonConfirmMessage', arguments);
};





p.saveDataAndClearHistory = function(p0, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'saveDataAndClearHistory', arguments);
};








p.getNextCell = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'getNextCell', arguments);
};






p.getTitleDimensionInfo = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'getTitleDimensionInfo', arguments);
};





p.recalculate = function(p0, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'recalculate', arguments);
};








p.changeCellValue = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'changeCellValue', arguments);
};





p.discardChanges = function(p0, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'discardChanges', arguments);
};








p.getRefCellDimensionData = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'getRefCellDimensionData', arguments);
};





p.getWidgetSessionInfo = function(p0, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'getWidgetSessionInfo', arguments);
};







p.getCellMetadata = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'getCellMetadata', arguments);
};







p.setControlScrollPosition = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'setControlScrollPosition', arguments);
};





p.copyFromSelectedArea = function(p0, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'copyFromSelectedArea', arguments);
};








p.getCellValue = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'getCellValue', arguments);
};





p.hasUnsavedData = function(p0, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'hasUnsavedData', arguments);
};









p.toggle = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'toggle', arguments);
};








p.addCellAnnotation = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'addCellAnnotation', arguments);
};







p.backgroundRecalculate = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'backgroundRecalculate', arguments);
};







p.loadWebSheet = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'loadWebSheet', arguments);
};










p.getRefCellValue = function(p0, p1, p2, p3, p4, p5, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'getRefCellValue', arguments);
};





p.getSelection = function(p0, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'getSelection', arguments);
};





p.getState = function(p0, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'getState', arguments);
};






p.setOptionButtonChecked = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'setOptionButtonChecked', arguments);
};






p.getNextEdge = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'WebSheetService', 'getNextEdge', arguments);
};

dwr.engine._setObject("WebSheetService", p);
}
})();

