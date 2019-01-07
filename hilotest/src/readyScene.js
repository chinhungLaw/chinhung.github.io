// 开头准备场景
(function(ns){

var readyScene = ns.readyScene = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        readyScene.superclass.constructor.call(this, properties);
        this.width = ns.width;
        this.height = ns.height;
        this.pivotX = 0;
        this.pivotY = 0;
        this.init(properties);
    },

    init: function(properties){
        var This = this;
        var btn = new Hilo.Graphics({
            id: 'btn',
            width: 440,
            height: 100,
            x: 160,
            y: 880,
        });
        btn.lineStyle(0, "#fff").drawRect(0, 0, 440, 100).endFill();
        btn.on(Hilo.event.POINTER_START, function(e){
            This.next();
        });
        this.addChild( btn);
    },
    next: function(){
        var This = this;
        This.visible =  false;
        ns.bgScene.changeBg('searchbg');
        ns.searchScene.visible = true;
        ns.searchScene.timerRun();
    }
});

})(window.game);