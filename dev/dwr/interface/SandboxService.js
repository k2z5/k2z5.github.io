if (typeof dwr == 'undefined' || dwr.engine == undefined) throw new Error('You must include DWR engine before including this file');

(function() {
if (dwr.engine._getObject("SandboxService") == undefined) {
var p;

p = {};







p.copySandbox = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'SandboxService', 'copySandbox', arguments);
};






p.setActiveSandbox = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SandboxService', 'setActiveSandbox', arguments);
};





p.commitSandbox = function(p0, callback) {
return dwr.engine._execute(p._path, 'SandboxService', 'commitSandbox', arguments);
};





p.getRedoUndoStatus = function(p0, callback) {
return dwr.engine._execute(p._path, 'SandboxService', 'getRedoUndoStatus', arguments);
};





p.redo = function(p0, callback) {
return dwr.engine._execute(p._path, 'SandboxService', 'redo', arguments);
};






p.deleteSandboxes = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SandboxService', 'deleteSandboxes', arguments);
};





p.undo = function(p0, callback) {
return dwr.engine._execute(p._path, 'SandboxService', 'undo', arguments);
};





p.getSandboxes = function(p0, callback) {
return dwr.engine._execute(p._path, 'SandboxService', 'getSandboxes', arguments);
};





p.resetSandbox = function(p0, callback) {
return dwr.engine._execute(p._path, 'SandboxService', 'resetSandbox', arguments);
};






p.createSandbox = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'SandboxService', 'createSandbox', arguments);
};

dwr.engine._setObject("SandboxService", p);
}
})();

