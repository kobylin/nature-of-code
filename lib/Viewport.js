function Viewport(canvas) {
    var me = this;
    me.canvas = canvas;
    me.mouse = {x: 0, y: 0};
    me.width = canvas.width;
    me.height = canvas.height;


    canvas.addEventListener('mousemove', function(e) {
        me.mouse.x = e.clientX;
        me.mouse.y = e.clientY;
    });
}

Viewport.prototype.getCtx = function() {
    return this.ctx || (this.ctx = this.canvas.getContext('2d'));
};