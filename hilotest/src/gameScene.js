// 开头准备场景
(function(ns){

var gameScene = ns.gameScene = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        gameScene.superclass.constructor.call(this, properties);
        this.width = ns.width;
        this.height = ns.height;
        this.pivotX = 0;
        this.pivotY = 0;
        this.runLength = 50;
        this.role1Length = 0;
        this.role2Length = 0;
        this.imgList = properties.image;
        this.winImgNum = 1;
        this.init(properties);
        this.timer2 = null;
        this.ending = false;
    },

    init: function(properties){
        var This = this;
        var ready = this.ready = new Hilo.Bitmap({
            id: 'ready',
            width: 343,
            height: 146,
            x: 200,
            y: 600,
            visible: false,
            image: properties.image.ready
        });
        var go = this.go = new Hilo.Bitmap({
            id: 'go',
            width: 282,
            height: 163,
            x: 220,
            y: 600,
            visible: false,
            image: properties.image.go
        });

        var btnbg = this.btnbg = new Hilo.Bitmap({
            id: 'btnbg',
            width: this.width,
            height: 200,
            x: 0,
            y: this.height - 200,
            image: properties.image.btnbg
        });

        var girlScene = this.girlScene = new ns.girlScene({
            width: this.width,
            height: this.height,
            image: properties.image,
        });

        var overline = this.overline = new Hilo.Bitmap({
            id: 'overline',
            width: this.width,
            height: 56,
            x: 0,
            y: this.height - 200 -130,
            image: properties.image.overline
        });

        var win = this.win = new Hilo.Bitmap({
            id: 'win',
            width: 231,
            height: 73,
            x: 270,
            y: 500,
            visible: false,
            image: properties.image.win
        });

        var lost = this.lost = new Hilo.Bitmap({
            width: 231,
            height: 73,
            x: 270,
            y: 500,
            visible: false,
            image: properties.image.lost
        });

        var runBtn = this.runBtn = new Hilo.Button({
            id: 'runbtn',
            image: properties.image.runbtn,
            width: 268,
            height: 146,
            upState: {rect:[0, 0, 268, 146]},
            downState: {rect:[0, 146, 268, 146]},
            x: 250,
            y: this.height - 160,
            visible: false,
        });

        runBtn.on(Hilo.event.POINTER_END, function(e){
            if (This.role1Length>This.runLength) {
                return false;
            }
            if (This.girlScene.mustStop) {
                This.boyBack();
                return false;
            }
            This.role1Length += 1;
            This.stepStat('role1',This.role1Length);
        });

        var role1 = this.role1 = new Hilo.Bitmap({
            id: 'role1',
            width: 97,
            height: 140,
            x: 305,
            y: 300,
            image: properties.image.role1_1,
        });
        
        var role2 = this.role2 = new Hilo.Bitmap({
            id: 'role2',
            width: 97,
            height: 140,
            x: 365,
            y: 300,
            image: properties.image.role2_1
        });
        

        this.addChild( overline, ready, go,  role1, role2, girlScene, btnbg, runBtn, win, lost);
        this.roleData = {
            'role1': {
                orgWidth: 97,
                orgHeight: 140,
                orgX: 305,
                orgY: 300,
                tarWidth: 389,
                tarHeight: 556,
                tarX: 40,
                tarY: 450,
            },
            'role2': {
                orgWidth: 97,
                orgHeight: 140,
                orgX: 365,
                orgY: 300,
                tarWidth: 409,
                tarHeight: 556,
                tarX: 340,
                tarY: 450,
            }
            
        }
    },
    next: function(){
        
    },
    begin: function(){
        var This = this;
        Hilo.Tween.to(This.ready, {visible: true}, {
            delay: 1000,
            duration: 1000,
            onComplete: function(){
                This.ready.visible = false;
                Hilo.Tween.to(This.go, {visible: true}, {
                    duration: 1000,
                    delay: 300,
                    onComplete: function(){
                        This.go.visible = false;
                        This.startGame();
                    }
                });
            }
        });
    },
    startGame: function(){
        this.runBtn.visible = true;
        this.girlScene.initGirl();
        this.role2Auto();
    },
    stepStat: function(obj,step){
        if (this.ending) {
            return false;
        }
        var target = this[obj];
        var date = this.roleData[obj];
        if (step>this.runLength) {
            this.endGame(obj);
            return false;
        }
        var percent = step/this.runLength;
        var towidth = date.orgWidth + parseInt((date.tarWidth - date.orgWidth) * percent);
        var toheight = date.orgHeight + parseInt((date.tarHeight - date.orgHeight) * percent);
        var tox = date.orgX + parseInt((date.tarX - date.orgX) * percent);
        var toy = date.orgY + parseInt((date.tarY - date.orgY) * percent);

        Hilo.Tween.to(target, {x: tox,y: toy,width: towidth,height: toheight},{duration:100});
        var imgNum = step%2 + 1;
        var img = obj + '_' + imgNum;
        target.setImage(this.imgList[img]);
    },
    endGame: function(obj){
        
        var This = this;
        this.ending = true;
        this.girlScene.visible = false;
        this.runBtn.visible = false;
        if (obj == 'role2') {
            console.log('lost');
            this.lost.visible = true;
        } else {
            console.log('win');
            this.win.visible = true;
            Hilo.Tween.to(this.role1, {},{
            loop:true,
            onUpdate: function(){
                This.winImgNum = This.winImgNum % 2 +1;
                var img = 'role1_win' + This.winImgNum;
                This.role1.setImage(This.imgList[img]);
            }
        });
        }
        
        
    },
    boyBack: function(){
        this.role1Length -= 5;
        if (this.role1Length < 0) this.role1Length = 0;
        this.stepStat('role1',this.role1Length);
        this.role1.setImage(this.imgList.role1_3);
        this.girlScene.attackAnti();
    },
    role2Auto: function(){
        var This = this;
        this.timer2 = setInterval(function(){
            if (This.ending) {
                clearInterval(This.timer2);
            }
            if (This.role2Length>This.runLength) {
                return false;
            }
            if (This.girlScene.mustStop) {
                return false;
            }
            This.role2Length += 1;
            This.stepStat('role2',This.role2Length);
        }, 300)
    }
});

})(window.game);