function World() {
    this.creatures = [];
}

World.prototype = {
    update: function(e, viewport) {
        this.creatures.forEach(function(cre) {
            cre.update(e, viewport);
        });
    },
    draw: function(e, viewport) {
        this.creatures.forEach(function(cre) {
            cre.draw(e, viewport);
        });
    },
    getCreaturesOfType: function(type) {
        var cres = [];
        _u.each(this.creatures, function(cre) {
            if (cre.__proto__ === type.prototype) {
                cres.push(cre);
            }
        });
        return cres;
    }
};
