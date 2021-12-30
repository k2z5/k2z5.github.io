if (typeof dwr == 'undefined' || dwr.engine == undefined) throw new Error('You must include DWR engine before including this file');

(function() {
if (dwr.engine._getObject("CubeViewService") == undefined) {
var p;

p = {};





p.resetData = function(p0, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'resetData', arguments);
};







p.ChartTypeChanged = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'ChartTypeChanged', arguments);
};





p.LoadData = function(p0, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'LoadData', arguments);
};







p.ExpandToLevel = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'ExpandToLevel', arguments);
};





p.getDimensionNames = function(p0, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'getDimensionNames', arguments);
};






p.setTitleDimensionElements = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'setTitleDimensionElements', arguments);
};










p.hold = function(p0, p1, p2, p3, p4, p5, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'hold', arguments);
};







p.getPickList = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'getPickList', arguments);
};







p.GetRaveChart = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'GetRaveChart', arguments);
};









p.Sort = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'Sort', arguments);
};






p.ChangeDisplayMode = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'ChangeDisplayMode', arguments);
};







p.getCubeNames = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'getCubeNames', arguments);
};







p.getCellAnnotations = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'getCellAnnotations', arguments);
};





p.SuppressZerosBoth = function(p0, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'SuppressZerosBoth', arguments);
};









p.SortTopBottom = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'SortTopBottom', arguments);
};







p.SaveViewAs = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'SaveViewAs', arguments);
};









p.dataSpread2 = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'dataSpread2', arguments);
};










p.dataSpread1 = function(p0, p1, p2, p3, p4, p5, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'dataSpread1', arguments);
};







p.setSubsets = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'setSubsets', arguments);
};





p.saveData = function(p0, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'saveData', arguments);
};








p.getDrillView = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'getDrillView', arguments);
};





p.GetViewListByCubeID = function(p0, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'GetViewListByCubeID', arguments);
};









p.deleteRange = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'deleteRange', arguments);
};






p.setSettings = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'setSettings', arguments);
};





p.SuppressZerosCols = function(p0, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'SuppressZerosCols', arguments);
};









p.getCellsMetadata = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'getCellsMetadata', arguments);
};





p.resetView = function(p0, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'resetView', arguments);
};





p.saveView = function(p0, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'saveView', arguments);
};






p.getCellPositions = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'getCellPositions', arguments);
};





p.refreshMetadata = function(p0, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'refreshMetadata', arguments);
};





p.dispose = function(p0, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'dispose', arguments);
};







p.Pivot = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'Pivot', arguments);
};






p.Navigate = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'Navigate', arguments);
};







p.Hide = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'Hide', arguments);
};







p.NavigateToPage = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'NavigateToPage', arguments);
};






p.ShowAllHidden = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'ShowAllHidden', arguments);
};





p.LoadCubeViewDimensions = function(p0, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'LoadCubeViewDimensions', arguments);
};






p.changeCellValues = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'changeCellValues', arguments);
};





p.SuppressZerosRows = function(p0, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'SuppressZerosRows', arguments);
};





p.saveDataAndClearHistory = function(p0, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'saveDataAndClearHistory', arguments);
};





p.SwapRowsAndColumns = function(p0, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'SwapRowsAndColumns', arguments);
};








p.Toggle = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'Toggle', arguments);
};





p.GetPageLayoutInfo = function(p0, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'GetPageLayoutInfo', arguments);
};






p.getTitleDimensionInfo = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'getTitleDimensionInfo', arguments);
};





p.recalculate = function(p0, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'recalculate', arguments);
};








p.changeCellValue = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'changeCellValue', arguments);
};





p.discardChanges = function(p0, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'discardChanges', arguments);
};








p.getRefCellDimensionData = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'getRefCellDimensionData', arguments);
};





p.getWidgetSessionInfo = function(p0, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'getWidgetSessionInfo', arguments);
};







p.getCellMetadata = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'getCellMetadata', arguments);
};










p.Paste = function(p0, p1, p2, p3, p4, p5, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'Paste', arguments);
};





p.hasUnsavedData = function(p0, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'hasUnsavedData', arguments);
};








p.addCellAnnotation = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'addCellAnnotation', arguments);
};








p.getRefCellValue = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'getRefCellValue', arguments);
};





p.getState = function(p0, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'getState', arguments);
};






p.setAutomaticRecalculationEnabled = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'setAutomaticRecalculationEnabled', arguments);
};





p.getAdminAccess = function(p0, callback) {
return dwr.engine._execute(p._path, 'CubeViewService', 'getAdminAccess', arguments);
};

dwr.engine._setObject("CubeViewService", p);
}
})();

