if (typeof dwr == 'undefined' || dwr.engine == undefined) throw new Error('You must include DWR engine before including this file');

(function() {
if (dwr.engine._getObject("TM1PlanningService") == undefined) {
var p;

p = {};








p.DeleteSandboxes = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'TM1PlanningService', 'DeleteSandboxes', arguments);
};







p.CommitSandbox = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'TM1PlanningService', 'CommitSandbox', arguments);
};







p.GetCubeViewTabGroup = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'TM1PlanningService', 'GetCubeViewTabGroup', arguments);
};









p.CopySandbox = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'TM1PlanningService', 'CopySandbox', arguments);
};







p.GetRedoUndoStatus = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'TM1PlanningService', 'GetRedoUndoStatus', arguments);
};








p.saveViewDataChanges = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'TM1PlanningService', 'saveViewDataChanges', arguments);
};






p.GetWorkflowStatus = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'TM1PlanningService', 'GetWorkflowStatus', arguments);
};







p.logonServer = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'TM1PlanningService', 'logonServer', arguments);
};







p.ResetSandbox = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'TM1PlanningService', 'ResetSandbox', arguments);
};







p.ResetViews = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'TM1PlanningService', 'ResetViews', arguments);
};








p.SubmitNode = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'TM1PlanningService', 'SubmitNode', arguments);
};










p.getCellAnnotations = function(p0, p1, p2, p3, p4, p5, callback) {
return dwr.engine._execute(p._path, 'TM1PlanningService', 'getCellAnnotations', arguments);
};








p.DisposeNodeView = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'TM1PlanningService', 'DisposeNodeView', arguments);
};









p.TakeOwnership = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'TM1PlanningService', 'TakeOwnership', arguments);
};





p.GetPlanAppPreferenceSetting = function(p0, callback) {
return dwr.engine._execute(p._path, 'TM1PlanningService', 'GetPlanAppPreferenceSetting', arguments);
};








p.ResetView = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'TM1PlanningService', 'ResetView', arguments);
};











p.addCellAnnotation = function(p0, p1, p2, p3, p4, p5, p6, callback) {
return dwr.engine._execute(p._path, 'TM1PlanningService', 'addCellAnnotation', arguments);
};







p.submitLeafChildren = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'TM1PlanningService', 'submitLeafChildren', arguments);
};







p.GetSandboxes = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'TM1PlanningService', 'GetSandboxes', arguments);
};







p.Undo = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'TM1PlanningService', 'Undo', arguments);
};









p.RejectNode = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'TM1PlanningService', 'RejectNode', arguments);
};








p.SwitchSandbox = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'TM1PlanningService', 'SwitchSandbox', arguments);
};








p.isSubsetEditorEnabled = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'TM1PlanningService', 'isSubsetEditorEnabled', arguments);
};







p.Redo = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'TM1PlanningService', 'Redo', arguments);
};








p.CreateSandbox = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'TM1PlanningService', 'CreateSandbox', arguments);
};

dwr.engine._setObject("TM1PlanningService", p);
}
})();

