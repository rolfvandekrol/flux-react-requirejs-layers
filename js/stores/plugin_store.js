
define(['fbemitter', 'assign'], function (fbemitter, assign) {
  var CHANGE_EVENT = 'change';

  return assign({}, fbemitter.EventEmitter.prototype, {
    emitChange: function() {
      this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },
  });
});