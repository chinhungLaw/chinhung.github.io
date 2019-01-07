// 控制背景图
(function(ns){

var bgScene = ns.bgScene = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        bgScene.superclass.constructor.call(this, properties);
        this.width = ns.width;
        this.height = ns.height;
        this.pivotX = 0;
        this.pivotY = 0;
        this.init(properties);
    },

    init: function(properties){
        var This = this;
        var bg = new Hilo.Bitmap({
            id: 'raedybg',
            width: this.width,
            height: this.height,
            x: 0,
            y: 0,
            // visible: false,
            image: properties.image.raedybg
        });
        var bg2 = new Hilo.Graphics({
            id: 'searchbg',
            width: this.width,
            height: this.height,
            x: 0,
            y: 0,
            visible: false,
        });
        bg2.drawRect(0, 0, this.width, this.height).beginBitmapFill(properties.image.searchbg,'repeat').endFill();

        var bg3 = new Hilo.Bitmap({
            id: 'gamebg',
            width: this.width,
            height: this.height,
            x: 0,
            y: 0,
            visible: false,
            image: properties.image.gamebg
        });

        this.addChild( bg, bg2, bg3);
    },
    changeBg: function (bg){
        for ( var i = 0;i<this.children.length;i++){
            if (this.children[i].id == bg) {
                this.children[i].visible = true;
            } else {
                this.children[i].visible = false;
            }
        }
    }
});

})(window.game);