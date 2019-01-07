// 开头准备场景
(function(ns){

var girlScene = ns.girlScene = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        girlScene.superclass.constructor.call(this, properties);
        this.width = ns.width;
        this.height = ns.height;
        this.pivotX = 0;
        this.pivotY = 0;
        this.mustStop = false;
        this.timer = null;
        this.init(properties);
    },

    init: function(properties){
        var girlImg = properties.image.girl;
        var girlup = this.girlup = new Hilo.Bitmap({
            width: 401,
            height: 341,
            x: 150,
            y: 850,
            image: girlImg,
            visible: false,
            rect:[0, 340, 401, 341],
        });
        var girldown = this.girldown = new Hilo.Bitmap({
            width: 312,
            height: 345,
            x: 230,
            y: 940,
            image: girlImg,
            rect:[386, 680, 312, 345],
        });
        
        var stop = this.stop = new Hilo.Bitmap({
            width: 192,
            height: 200,
            x: 300,
            y: 650,
            image: properties.image.stop,
            visible: false,
        });

        this.addChild( girldown, girlup, stop);

    },
    initGirl: function(){
        Hilo.Tween.to(this.girldown, {y: this.girldown.y + 100},{duration:1000,loop: true});
        this.girlWatch();
        
    },
    girlWatch: function(){
        var num = Math.floor(Math.random()*10+1);
        console.log(num);
        var This = this;
        this.timer = setTimeout(function(){
            This.setGirlUp();
            clearTimeout(This.timer);
            setTimeout(function(){
                This.girlWatch();
                This.setGirlDown();
            }, 2000)
        }, num * 1000);
    },
    setGirlUp: function(){

        this.girlup.visible = true;
        this.stop.visible = true;
        this.mustStop = true;
        this.girldown.visible = false;
    },
    setGirlDown: function(){
        this.girlup.visible = false;
        this.stop.visible = false;
        this.mustStop = false;
        this.girldown.visible = true;
    },
    attackAnti: function(){
    }
});

})(window.game);