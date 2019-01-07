// 搜索波浪动画
(function(ns){

var loading = ns.loading = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        loading.superclass.constructor.call(this, properties);
        this.pivotX = 0;
        this.pivotY = 0;
        this.init(properties);
    },

    init: function(properties){
        console.log(this);
        var This = this;
        var cir = 4; // 定义多少个半圆
        var distant = 500; // 定义最终半圆放大后最大半径
        for (var i = 0;i<cir;i++){
            var loadingAnt = new Hilo.Bitmap({
                width:  10,
                height:  5,
                x: 237,
                y: 0,
                pivotX :  5,
                pivotY : 0,
                scaleX: 1,
                scaleY: 1,
                alpha: 0.3,
                image: properties.image.loading
            });
            Hilo.Tween.to(loadingAnt, {scaleX: distant/loadingAnt.width, scaleY: distant/loadingAnt.width, alpha:0}, {
                duration: 1000 * cir,
                delay: 1000 * i,
                loop:true,
                onUpdate: function(){
                }
            });
            loadingAnt.addTo(This);
        }
    }
});

})(window.game);