if (typeof dwr == 'undefined' || dwr.engine == undefined) throw new Error('You must include DWR engine before including this file');

(function() {
if (dwr.engine._getObject("SubsetService") == undefined) {
var p;

p = {};







p.createCubeViewSubsetSession = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'createCubeViewSubsetSession', arguments);
};






p.loadSubset = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'loadSubset', arguments);
};






p.setNamedSubset = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'setNamedSubset', arguments);
};









p.createWebSheetSubsetSession = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'createWebSheetSubsetSession', arguments);
};









p.find = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'find', arguments);
};






p.setExpandAbove = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'setExpandAbove', arguments);
};






p.reloadSubset = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'reloadSubset', arguments);
};







p.filterByLevel = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'filterByLevel', arguments);
};






p.collapseSelectedConsolidations = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'collapseSelectedConsolidations', arguments);
};








p.setSelectedElements = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'setSelectedElements', arguments);
};






p.destroy = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'destroy', arguments);
};






p.insertParentsOfSelectedElements = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'insertParentsOfSelectedElements', arguments);
};







p.filterByExpression = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'filterByExpression', arguments);
};







p.sort = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'sort', arguments);
};








p.filterByAttribute = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'filterByAttribute', arguments);
};






p.expandAll = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'expandAll', arguments);
};






p.collapseAll = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'collapseAll', arguments);
};






p.expand = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'expand', arguments);
};






p.saveSubset = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'saveSubset', arguments);
};






p.getAttributeNames = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'getAttributeNames', arguments);
};






p.getElements = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'getElements', arguments);
};







p.collapseElement = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'collapseElement', arguments);
};







p.expandSelectedConsolidations = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'expandSelectedConsolidations', arguments);
};






p.setAlias = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'setAlias', arguments);
};









p.copyElements = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'copyElements', arguments);
};






p.cut = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'cut', arguments);
};





p.submit = function(p0, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'submit', arguments);
};







p.paste = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'paste', arguments);
};






p.deleteSelectedElements = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'deleteSelectedElements', arguments);
};







p.expandElement = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'expandElement', arguments);
};






p.filterElement = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'filterElement', arguments);
};








p.createSpreadSubsetSession = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'createSpreadSubsetSession', arguments);
};






p.subsetAll = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'subsetAll', arguments);
};









p.saveSubsetAs = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'saveSubsetAs', arguments);
};






p.copy = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'copy', arguments);
};






p.selectElement = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'selectElement', arguments);
};






p.createConsolidationFromSelectedElements = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'createConsolidationFromSelectedElements', arguments);
};






p.keepSelectedElements = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'keepSelectedElements', arguments);
};







p.setCurrentPage = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'setCurrentPage', arguments);
};









p.moveElements = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'moveElements', arguments);
};






p.disposeSubsetTreeBuilder = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'disposeSubsetTreeBuilder', arguments);
};






p.toggle = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'toggle', arguments);
};







p.pasteBelow = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'pasteBelow', arguments);
};







p.loadSubsetData = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'loadSubsetData', arguments);
};







p.pasteAbove = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'pasteAbove', arguments);
};







p.getAttributeValues = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'getAttributeValues', arguments);
};







p.createConsolidationFromSubset = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'SubsetService', 'createConsolidationFromSubset', arguments);
};

dwr.engine._setObject("SubsetService", p);
}
})();

