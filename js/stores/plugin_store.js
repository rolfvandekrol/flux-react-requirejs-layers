
define(['fbemitter'], function (fbemitter) {
  var LOAD_EVENT = 'change';

  var _plugins = [];

  var events = new fbemitter.EventEmitter();

  return {
    emitLoad: function() {
      events.emit(LOAD_EVENT);
    },
    addLoadListener: function(callback) {
      events.addListener(LOAD_EVENT, callback);
    },
    removeLoadListener: function(callback) {
      events.removeListener(LOAD_EVENT, callback);
    },

    loaded: function(name) {
      return (_plugins.indexOf(name) !== -1);
    },

    setLoaded: function(name) {
      _plugins.push(name);
      this.emitLoad();
    }
  };
});