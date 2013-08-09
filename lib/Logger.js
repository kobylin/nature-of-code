function Logger(out) {
    this.out = out;
}

Logger.prototype = {
    print: function() {
        var args = Array.prototype.slice.call(arguments);
        this.out.innerHTML = args.join(' ');
    }
};
