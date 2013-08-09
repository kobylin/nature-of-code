var Observable = {
    on: function(eventName, callback) {
        if (!this.listeners) this.listeners = {};
        if (!this.listeners[eventName]) this.listeners[eventName] = [];

        this.listeners[eventName].push(callback);
    },
    off: function(eventName, callback) {

    },
    fireEvent: function() {
        var eventName = arguments[0],
            args = Array.prototype.slice.call(arguments, 1);
        if (!this.listeners || !this.listeners[eventName]) return;

        this.listeners[eventName].forEach(function(callback) {
            callback.apply(this, args);
        });
    }
};