function Viewport(canvas, options) {
    options = options || {};
    var me = this;
    me.canvas = canvas;
    me.mouse = {x: 0, y: 0};
    me.keyboard = {
        keypressed: {}
    };
    me.scale = options.scale || 1;

    canvas.addEventListener('mousemove', function(e) {
        me.mouse.x = e.clientX;
        me.mouse.y = e.clientY;
    });

    document.addEventListener('keydown', function(e) {
        e = e || window.event;
        me.keyboard.keypressed[KEYMAP[e.keyCode]] = true;
    });
    document.addEventListener('keyup', function(e) {
        e = e || window.event;
        me.keyboard.keypressed[KEYMAP[e.keyCode]] = false;
    });
}

Viewport.prototype = {
    getWidth: function() {
        return this.canvas.width;
    },
    getHeight: function() {
        return this.canvas.height;
    },
    pointToGlobal: function(point) {
        return {
            x: point.x / this.scale,
            y: point.y / this.scale
        };
    },
    getCtx: function() {
        return this.ctx || (this.ctx = this.canvas.getContext('2d'));
    }
};

var KEYMAP = {
    38: 'UP',
    40: 'DOWN'
};