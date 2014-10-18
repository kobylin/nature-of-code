function World() {
    this.creatures = [];
}

World.prototype = {
    add: function(cre) {
        cre.world = this;
        this.creatures.push(cre);
    },
    remove: function(cre) {
        this.creatures.splice(this.creatures.indexOf(cre), 1);
    },
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
