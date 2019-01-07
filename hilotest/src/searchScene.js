// 匹配场景
(function(ns){

var searchScene = ns.searchScene = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        searchScene.superclass.constructor.call(this, properties);
        this.width = ns.width;
        this.height = ns.height;
        this.timerNum = 59;
        this.scaleX = 0.9;
        this.scaleY = 0.9;
        this.pivotX =  this.width/2;
        this.pivotY = this.height/2;
        this.x = ns.width/2;
        this.y = ns.height/2;
        this.init(properties);
        
    },

    init: function(properties,par){
        var This = this;
        
        var searchbox = new Hilo.Graphics({
            id: 'searchbox',
            width: 720,
            height: 830,
            x: 15,
            y: 220,
        });
        searchbox.beginFill("#dfe0ff").drawRoundRect(0, 30, 720, 766, 20).endFill();

        var user = new Hilo.Graphics({
            id: 'user',
            width: 672,
            height: 334,
            x: 40,
            y: 670,
        });
        user.drawRect(0, 0, 672, 334).beginBitmapFill(properties.image.searchuser,'no-repeat').endFill();
        
        var whiteMask = this.whiteMask = new Hilo.Container({
            id: 'mask',
            width: 674,
            height: 350,
            x: 40 + 337,
            y: 280 + 175,
            pivotX: 337,
            pivotY: 175,
        });
        var loadingText = new Hilo.Text({
            font: "40px 微软雅黑",
            text: "匹配中...",
            color: '#fff',
            textAlign: 'center',
            textVAlign: 'middle',
            lineSpacing: 0,
            width: 672,
            height: 334,
            x: 0,
            y: 20,
            background: "#786bcf"
        }).addTo(this.whiteMask);
        this.loading = new game.loading({
            width: 480,
            height: 240,
            x: 100,
            y: 20,
            image: properties.image,
            clipChildren: true,
        }).addTo(this.whiteMask);

        var timerbg = new Hilo.Bitmap({
            id: 'raedybg',
            width: 180,
            height: 186,
            x: 250,
            y: -93,
            image: properties.image.searchtimer
        }).addTo(this.whiteMask);
        var searchtimer = this.searchtimer = new Hilo.Text({
            font: "40px 微软雅黑",
            text: "59",
            color: '#fff',
            textAlign: 'center',
            textVAlign: 'middle',
            lineSpacing: 0,
            width: 180,
            height: 186,
            x: 250,
            y: -93,
        }).addTo(this.whiteMask);
        
        var guy = this.guy = new Hilo.Graphics({
            id: 'user2',
            width: 672,
            height: 334,
            x: 40,
            y: -420,
        });
        guy.drawRect(0, 0, 672, 334).beginBitmapFill(properties.image.searchuser,'no-repeat').endFill();

        var vs_X = this.vs_X = new Hilo.Graphics({
            width: 113,
            height: 188,
            x: 320 + 56,
            y: 550 + 94,
            scaleX: 0,
            scaleY: 0,
            pivotX: 56,
            pivotY: 94,
        });
        vs_X.drawRect(0, 0, 113, 188).beginBitmapFill(properties.image.vsX,'no-repeat').endFill();

        var vs_V = this.vs_V = new Hilo.Graphics({
            width: 126,
            height: 128,
            x: 250,
            y: -200,
        });
        vs_V.drawRect(0, 0, 126, 128).beginBitmapFill(properties.image.vsV,'no-repeat').endFill();

        var vs_S = this.vs_S = new Hilo.Graphics({
            width: 102,
            height: 131,
            x: 390,
            y: this.height + 200,
        });
        vs_S.drawRect(0, 0, 102, 131).beginBitmapFill(properties.image.vsS,'no-repeat').endFill();
        this.addChild( searchbox, user, whiteMask, guy, vs_X, vs_V, vs_S);
    },
    timerRun: function(){
        var This = this;
        var time = setTimeout(function(){
            This.searchtimer.text = --This.timerNum;
            if (This.timerNum == 54){
                This.searchSucc();
                return false;
            }
            if (This.timerNum>0) {
                This.timerRun();
            }
        }, 1000);
        Hilo.Tween.to(this, {scaleX: 1, scaleY: 1}, {
            duration: 800,
            ease: Hilo.Ease.Bounce.EaseOut,
            onUpdate: function(){
            }
        });
    },
    searchSucc: function(){
        var This = this;
        Hilo.Tween.to(this.whiteMask, {scaleX: 0, scaleY: 0}, {
            duration: 100,
            onComplete: function(){
                Hilo.Tween.to(This.guy, {y: 300}, {
                    duration: 500,
                    ease: Hilo.Ease.Bounce.EaseOut,
                    onComplete: function(){
                        Hilo.Tween.to(This.vs_X, {scaleX: 1, scaleY: 1}, {
                            duration: 200,
                            onComplete: function(){
                                Hilo.Tween.to(This.vs_V, {y:540}, {
                                    duration: 150,
                                });
                                Hilo.Tween.to(This.vs_S, {y:610 }, {
                                    duration: 150,
                                });
                                setTimeout(function(){
                                    This.next();
                                }, 1000);
                            }
                        });
                    }
                });
            }
        });
    },
    next: function(){
        var This = this;
        This.visible =  false;
        ns.bgScene.changeBg('gamebg');
        ns.gameScene.visible = true;
        ns.gameScene.begin();
    }
});

})(window.game);